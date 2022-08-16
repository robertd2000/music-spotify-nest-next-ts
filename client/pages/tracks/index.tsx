import { Button, Card, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import TrackList from '../../components/TrackList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { FetchTracks, searchTracks } from '../../store/actions/track'
import { ITrack } from '../../types/track'

const Index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector((state) => state.track)
  const [query, setQuery] = useState<string>('')
  const [timer, setTimer] = useState(null)

  const dispatch = useDispatch() as NextThunkDispatch

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 500)
    )
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Список треков: музыкальная платформа">
      <Grid container justifyContent="center">
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid container justifyContent={'space-between'}>
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Загрузить{' '}
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default memo(Index)

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await FetchTracks())
  }
)
