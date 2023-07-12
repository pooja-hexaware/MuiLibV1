import React from 'react'
import {Box, Card} from '@mui/material';

const ReactCard = (props: any) => {
    return (
      <Box sx={props.sx}>
        <Card variant= {props.variant !== undefined ? props.variant: "outlined"}>
          {props.children}
        </Card>
      </Box>
    );
}
  
export default ReactCard;