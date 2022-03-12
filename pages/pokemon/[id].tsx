import { useEffect, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Grid, Card, Text, Container, Image, Button } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';



interface Props {
  pokemon: Pokemon;
}




const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState<boolean>();

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites( pokemon.id ));
  }, [])

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites );

    // if ( isInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }




  return (
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card.Body>
            <Card.Image
              src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
              alt={ pokemon.name }
              width='100%'
              height={200}
            />
          </Card.Body>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1>{ pokemon.name }</Text>

              <Button
                color="gradient"
                ghost={ !isInFavorites }
                onClick={ onToggleFavorite }
              >
                { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container direction='row' display='flex' gap={ 0 }>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index+1}`);

  return {
    paths: pokemons151.map( id => ({
      params: { id }
    })),
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }

  return {
    props: {
      pokemon: await getPokemonInfo( id )
    }
  }
}


export default PokemonPage