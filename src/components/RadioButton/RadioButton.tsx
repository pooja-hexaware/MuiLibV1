import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


const RadioButtonComponent = (props: any) => {
let tempDisable = false
  
    const controlsData = props.items.map((data: any) => ({
        label: data[props.itemLabel],
        value: data[props.itemValue],
        ...data,
      }));
    return (

   <FormControl sx={props.sx}>
        <FormLabel >{props.groupLabel}
            <RadioGroup  
            value={props.value}  defaultValue={props.defaultValue}
            onChange={props.onChange}  name={props.name} {...props}>
    {controlsData.map((x: any, index: number)=>{
          return  <FormControlLabel 
          disabled={(x.disabled ) ? x.disabled : tempDisable } 
          value={x.value}
          checked={x.checked} 
                control={<Radio size={props.size} color={props.color}/>}
          label={x.label} 
          labelPlacement={x.labelPlacement}
          key={index}/> 
    })}
            </RadioGroup>
        </FormLabel>
    </FormControl>)}

export default RadioButtonComponent;
