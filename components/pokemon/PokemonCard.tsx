import { FC } from 'react'
import { useRouter } from 'next/router'

import { Card, Grid, Row, Text } from '@nextui-org/react'
import { SmallPokemon } from '../../interfaces'

interface Props {
  pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { img, name, id } = pokemon

  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  }



  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable onClick={ onClick }>
        <Card.Body >
          <Card.Image
            src={img}
            width='100%'
            height={140}
          />
          <Card.Footer>
            <Row justify='space-between'>
              <Text transform='capitalize'>{name}</Text>
              <Text>#{id}</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  )
}