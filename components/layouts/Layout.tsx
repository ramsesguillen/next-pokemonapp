import { Fragment } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Navbar } from '../ui/Navbar';

interface Props {
  title: string
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin;



export const Layout: NextPage<Props> = ({ children, title }) => {
  return (
    <Fragment>
      <Head>
        <title>{ title || 'PokemonApp' }</title>
        <meta name='author' content='Guillen Ramses'/>
        <meta name="description" content="Información sobre el pokémon xxxx" />
        <meta name="keywords" content={`${title}, pokemon, pokemonx`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
        <meta property="og:image" content={`${origin}/banner.png`} />
      </Head>

      <Navbar />
      <main style={{
        padding: '0 20px'
      }}>
        { children }
      </main>
    </Fragment>
  )
}