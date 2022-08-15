import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/track'
import TrackProgress from './TrackProgress'

let audio: HTMLAudioElement

const Player = () => {
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
  const { active, pause, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setActiveTrack,
    setDuration,
    setCurrentTime,
  } = useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active?.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value
    setCurrentTime(+e.target.value)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target.value / 100
    setVolume(+e.target.value)
  }

  if (!active) return <div></div>

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
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  )
}

export default Player
