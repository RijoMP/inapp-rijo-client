import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Video from './Video'
import Grid from '@mui/joy/Grid';

export default function Files() {
  const [videos, setVideos] = useState([])
  const [percentage, setPercentage] = useState([])


  
  useEffect(() => {
    const getVideos= async () => {
      const response = await axios.get('http://localhost:5000/file')
      const vdoData = response.data.data.videos;
      setVideos(vdoData)
    } 

    getVideos()
  }, [])

  return (
    <div className=''>
      {videos && videos.map(video => {
        return (<Grid item key={video._id} ><Video video={video}/></Grid>)
      })}
    </div>
  )
}
