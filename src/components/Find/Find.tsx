import React from "react";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Binoculars from '../../svgIcons/Binoculars';

const ReactFind = (props: any) => {
    const renderIcon = (props:any) => {
        return <>
        <IconButton onClick={ props.onIconClick}>
            <InputAdornment position="start">
                {props.icon ? props.icon : <Binoculars />}
            </InputAdornment>
        </IconButton>
        </>
    }
    return (
        <TextField
            {...props}
            InputProps={
                props.position ? {
                    startAdornment: 
                        renderIcon(props)
                    ,
                } : {
                    endAdornment: 
                        renderIcon(props)
                    ,
                }}
        />
    );
}
export default ReactFind
