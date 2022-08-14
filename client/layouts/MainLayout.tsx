import { Container } from '@mui/system'
import React, { FC, ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

interface IProps {
  children: ReactElement<any>
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container style={{ margin: '90px auto' }}>{children}</Container>
      <Player />
    </>
  )
}

export default MainLayout
