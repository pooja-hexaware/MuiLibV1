import * as React from 'react';
import {AppBar, Box, Toolbar,Typography,Tooltip, IconButton, BottomNavigation} from '@mui/material';
import Exclamation from '../../svgIcons/Exclamation'
import Close from "../../svgIcons/Close"
import Slide from '@mui/material/Slide';


const ReactSystemMsg = ( props: any)=>{
  const [open, setOpen] = React.useState(true);
  const message=  props.message
    const handleClose = () => {
      setOpen(false);
      localStorage.setItem("systemMessage",message);
    };
    return(
        <div style={{display: "block"}}>
           <Slide direction="down" in={open} mountOnEnter unmountOnExit>
           <div style={{display: "block"}} >
    <Box sx={{ flexGrow: 1, height:"255"}}>
    <AppBar position="static">
    <Toolbar sx = {{ "background":  props.theme !== undefined ? props.theme: "#ffcc00" }}>
         <div style={{ marginRight : "13px", 
  "backgroundColor":  props.iconBackground !== undefined ? props.iconBackground: "#ff8700" 
         }}>
        <Exclamation />
        </div>
      <Typography variant="h5" component="div"  
      sx={{ flexGrow: 1, color:"#000000" }}>
    {props.heading}
      </Typography>
      <Tooltip title='Close Message'>
      <IconButton
            size="large"
            edge="end"
            sx={{ "&:hover": 
            props.closecolor !== undefined ?
            { backgroundColor:  props.closecolor}: {backgroundColor: "red"}  
              }} 
            onClick={handleClose}>
             <Close width={22} height={22}/>
      </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
  <Typography m={2} minHeight="75px">
      {props.message}
      </Typography>
    </Box>
    <BottomNavigation  
        sx={{"background":  props.theme !== undefined ? props.theme: "#ffcc00" , height:"15px"}}
      >
      </BottomNavigation>
      </div>
      </Slide>
     
    </div>
    )
}

export default ReactSystemMsg