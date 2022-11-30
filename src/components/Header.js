import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import config from '../config';
import { useEffect } from 'react';
import { io } from 'socket.io-client'

let Header = props => {
  const [open, setOpen] = React.useState(false);
  const [totalSize,setTotalSize] = React.useState(10000)
  const [uploadedSize, setUploadedSize] = React.useState(1)
  const [percentage,setPercentage] = React.useState(1);
  const [upload, setUpload] = React.useState(false);
  const uploadVideo= async (file) => {
    return new Promise(async(resolve, reject) => {
      try{
        console.log("test upload");
        const { data, headers } = await axios({
          url:config.server+'/file',
          method: 'POST',
          data: {
            url:file.value,
            name:file.value.substring(file.value.lastIndexOf('/')+1),
            uid:"test_user"
          }
        })
        resolve(data)
      }
      
      catch(error){
        reject(error)
      }
    })
    
  
  } 
  useEffect(() => {
    const socket = io('ws://localhost:5000')

    socket.on('connnection', () => {
      console.log('connected to server');
    })
    socket.on('progress-started', (data) => {
      setTotalSize(data)
      console.log(data)
     })
    socket.on('progress-update', (current) => {
     //console.log(test)
     setUploadedSize(uploadedSize+ +current)
     setPercentage((uploadedSize/totalSize * 100))
     //console.log((uploadedSize/totalSize * 100))
    })

    socket.on('message', (message) => {
      console.log(message);
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnecting');
    })

  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = async() => {
    let file = document.getElementById("fileurl")
    if (!file.value) {
      console.error("No file")
      setUpload(false)
      
    }
    else{
      setUpload(true)
      let response =await uploadVideo(file)
    }
   
  };

    return (<>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TempHost
            </Typography>
            <Button sx={{ color: 'white', backgroundColor: 'green', borderColor: 'green' }}  onClick={handleClickOpen}>Import Video </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Save to cloud</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the file url
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fileurl"
            label="example.com/file"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
              </>
      
    )
}
export default Header
