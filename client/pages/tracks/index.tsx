import { Button, Card, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import TrackList from '../../components/TrackList'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/track'

const Index = () => {
  const router = useRouter()
  const tracks: ITrack[] = [
    {
      id: 2,
      name: 'Track',
      artist: 'Artist',
      audio:
        'http://localhost:5000/audio/3fc45cbc-83a7-49a9-9b59-ac2ea295d839.mp3',
      picture:
        'http://localhost:5000/image/e90ed981-73c5-4b97-8056-13b35a8fc9a2.jpg',
      listens: 1,
      text: 'lalalal',
      comments: [],
    },
  ]

  return (
    <MainLayout>
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
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default memo(Index)
