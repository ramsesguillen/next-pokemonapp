import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui"
import { localFavorites } from "../../utils";
import { Grid, Card } from '@nextui-org/react';
import { FavoritePokemons } from "../../components/pokemon/FavoritePokemons";


const FavoritePage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons );
  }, [])

  return (
    <Layout title="Pokémon - Favoritos">
      {
        favoritePokemons.length === 0
          ? ( <NoFavorites /> )
          : (
            <FavoritePokemons  pokemons={ favoritePokemons }/>
          )
      }
    </Layout>
  )
}
export default FavoritePage