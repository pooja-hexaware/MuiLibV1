import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = (props: any) => {

    return (
   <FormControl sx={props.sx} 
                required={props.required}
                error={props.error}
                disabled={props.disabled}
    >
        <InputLabel >{props.inputLabel}</InputLabel>
        <Select {...props}>
            {props.children}
        </Select>

    </FormControl>
    )}

export default SelectComponent;
