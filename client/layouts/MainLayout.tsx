import { Container } from '@mui/system'
import Head from 'next/head'
import React, { FC, ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

interface IProps {
  children: ReactElement<any>
  title?: string
  description?: string
  keywords?: string
}

const MainLayout: FC<IProps> = ({ children, title, keywords, description }) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
        <meta
          name="description"
          content={
            `Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` +
            description
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'Музыка, треки, артисты'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{ margin: '90px auto' }}>{children}</Container>
      <Player />
    </>
  )
}

export default MainLayout
