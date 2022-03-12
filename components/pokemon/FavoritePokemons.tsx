import { FavoriteCardPokemon } from './FavoriteCardPokemon';
import { FC } from 'react';
import { Grid } from '@nextui-org/react';

export const FavoritePokemons: FC<{ pokemons: number[]}> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map( id => (
        <FavoriteCardPokemon key={id} pokemonId={id}/>
      ))}
  </Grid.Container>
  )
}