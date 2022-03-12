import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { NextPage, GetServerSideProps } from 'next'
// import { Fragment } from 'react'
import { Layout } from '../components/layouts'
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon/PokemonCard';


interface Props {
  pokemons: SmallPokemon[]
}


const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Home'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map( pokemon => (
            <PokemonCard pokemon={ pokemon } key={pokemon.id} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await  pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map( (pokemon, index) => ({
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
