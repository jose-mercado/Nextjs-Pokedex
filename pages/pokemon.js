import Link from 'next/link';
import React from 'react'
import Layout from "../components/Layout"

export default function pokemon({pokemon, results}) {
    console.log(results);
    return <Layout title={pokemon.name}>
        <h1 className='text-4xl mb-2 text-center capitalize'> {pokemon.name}</h1>
        <img className='mx-auto' src={pokemon.image} alt={pokemon.name} />
        <p>
            <span className='font-bold mr-2'>
                Weight:
            </span>
            {pokemon.weight}
        </p>

        <p>
            <span className='font-bold mr-2'>
                Height:
            </span>
            {pokemon.height}
        </p>

        <h2 className='text-2xl mt-6 mb-2'>Types</h2>
        {pokemon.types.map((type, index) => 
        <p key={index}>
            {type.type.name}
        </p>)}

        {/* <h2 className='text-2xl mt-6 mb-2'>Description</h2>
        {pokemonSpecies.flavor_text_entries.map((flavor_text_entries, index) => 
        <p key={index}>
            {flavor_text_entries.flavor_text.name}
        </p>)} */}

        <p className='mt-10 text-center'>
            <Link href="/">
                <a className='text-2xl underline'>
                    Home
                </a>
            </Link>
        </p>
    </Layout>
}

export async function getServerSideProps({query}) {
    const id = query.id;
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json("");
        const paddedId = ('00' + (id)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        pokemon.image = image
        return {
            props: {pokemon},
        };
    } catch (err) {
        console.error(err)
    }

    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const { results } = await res.json();
        return {
            results
        }
    } catch (err) {
        console.error(err)
    }
}