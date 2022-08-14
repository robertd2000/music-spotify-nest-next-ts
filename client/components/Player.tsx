import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React from 'react'
import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/track'
import TrackProgress from './TrackProgress'

const Player = () => {
  const pause = ''
  const active: ITrack = {
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

  const play = () => {}

  const changeCurrentTime = () => {}

  const changeVolume = () => {}

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: '0 20px' }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={0} right={100} onChange={changeVolume} />
    </div>
  )
}

export default Player
