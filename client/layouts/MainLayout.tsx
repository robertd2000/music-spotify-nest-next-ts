import { Container } from '@mui/system'
import React, { FC, ReactElement } from 'react'
import Navbar from '../components/Navbar'

interface IProps {
  children: ReactElement<any>
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container style={{ margin: '90px 0' }}>{children}</Container>
    </>
  )
}

export default MainLayout
