import { Button, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/track'

const TrackPage = () => {
  const router = useRouter()

  const track: ITrack = {
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
  }

  return (
    <MainLayout>
      <>
        <Button
          variant={'outlined'}
          style={{ fontSize: 32 }}
          onClick={() => router.push('/tracks')}
        >
          К списку
        </Button>
        <Grid container style={{ margin: '20px 0' }}>
          <img src={track.picture} alt="" width={200} height={200} />
          <div style={{ marginLeft: 30 }}>
            <h1>Название трека - {track.name}</h1>
            <h1>Исполнитель - {track.artist}</h1>
            <h1>Прослушиваний - {track.listens}</h1>
          </div>
        </Grid>
        <h1>Слова в треке</h1>
        <p>{track.text}</p>
        <h1>Комментарии</h1>
        <Grid container>
          <TextField
            label="Ваше имя"
            fullWidth
            // {...username}
          />
          <TextField
            label="Комментарий"
            // {...text}
            fullWidth
            multiline
            rows={4}
          />
          <Button
          // onClick={addComment}
          >
            Отправить
          </Button>
        </Grid>
        <div>
          {track.comments.map((comment) => (
            <div>
              <div>Автор - {comment.username}</div>
              <div>Комментарий - {comment.text}</div>
            </div>
          ))}
        </div>
      </>
    </MainLayout>
  )
}

export default TrackPage
