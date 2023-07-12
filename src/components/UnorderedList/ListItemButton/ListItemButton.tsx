import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircleOutline from '../../../svgIcons/CircleOutline';

const ReactListItemButton = (props: any) =>{

  let displayIcon 
  if(props.icon !== undefined){
    ( React.isValidElement(props.icon) !== false)
      ? displayIcon = <ListItemIcon>{props.icon}</ListItemIcon>
      :displayIcon =<ListItemIcon><CircleOutline /></ListItemIcon>
  }
    return(
        <ListItemButton {...props}>
                {props.children}
                    {displayIcon}
                <ListItemText primary={props.primary} />
        </ListItemButton>
    )
}

export default ReactListItemButton