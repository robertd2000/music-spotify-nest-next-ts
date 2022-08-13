import { Box, Grid } from '@mui/material'
import React, { FC, memo } from 'react'
import { ITrack } from '../types/track'
import TrackItem from './TrackItem'

interface IProps {
  tracks: ITrack[]
}

const TrackList: FC<IProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem track={track} key={track.id} />
        ))}
      </Box>
    </Grid>
  )
}

export default memo(TrackList)
