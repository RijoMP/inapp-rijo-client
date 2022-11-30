import React from 'react'
import Files from './Files'
import '../index.css'
import Header from './Header'
import Grid from '@mui/material/Grid';



export default function App() {
  return (
    <div className='app'>
      <Header></Header>




      <h1 className='title'>Gallery</h1>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: '20px' }}>

        <Files />

      </Grid>

    </div>
  )
}
