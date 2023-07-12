import React from 'react';
import Button from '@mui/material/Button';
import CircleOutline from '../../svgIcons/CircleOutline';

const ButtonComponent = (props: any) => {
  
  let displayStartIcon, displayEndIcon 
  if(props.startIcon !== undefined){
    ( React.isValidElement(props.startIcon) !== false)
      ? displayStartIcon = props.startIcon
      :displayStartIcon =<CircleOutline />
  }

  if(props.endIcon !== undefined){
    ( React.isValidElement(props.endIcon) !== false)
      ? displayEndIcon = props.endIcon
      :displayEndIcon = <CircleOutline />
  }

  return <Button {...props} 
  startIcon={displayStartIcon} endIcon={displayEndIcon}
  >
            {props.label}
            {props.children}
        </Button>;
};

export default ButtonComponent;
