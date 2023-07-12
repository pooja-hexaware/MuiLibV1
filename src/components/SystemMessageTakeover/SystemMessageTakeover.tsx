import * as React from 'react';
import {AppBar, Toolbar, Typography } from '@mui/material';
import Exclamation from '../../svgIcons/Exclamation'
const SystemMsgTakeover = (props: any) => {

  return (
   
        <div style={{display: "block"}}>
    <AppBar position="static">
    <Toolbar sx = {{ background: "#c92500" }}>
         <div style={{marginRight : "13px"}}>
        <Exclamation />
        </div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, color:"#000000" }}>
      {props.title}
      </Typography>
      
    </Toolbar>
  </AppBar>
  <Typography m={2} >
        {props.message}
      </Typography>
      </div>

  );
}

export default SystemMsgTakeover;
