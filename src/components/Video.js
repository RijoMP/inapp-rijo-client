import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Video(props) {
  const {video} = props
  return (
    // <div className='video'>
    //     <p>{video.name}</p>
    //     <p>{video.localUrl}</p>
    //     <p>{video.size}</p>
    // </div>
    <Card sx={{ maxWidth: 400 }}>
    <CardMedia
      component="img"
      height="140"
      image="https://dummyimage.com/600x400/000/fff&text=..."
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {video.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {/* {video.description} */}
      Size:{video.size}kb
            </Typography>
    </CardContent>
    <CardActions><a href={ video.localUrl}>
      <Button size="small">Open</Button> </a>
    </CardActions>
  </Card>






  )
}
