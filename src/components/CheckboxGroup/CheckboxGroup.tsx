import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

const CheckboxGroupComponent = (props: any) => {
  let tempRow = false
  if(props.row !== undefined){
    tempRow = true
  }
  return (
    <FormControl {...props}>
      <FormLabel sx = {props.labelSx}>
        {props.grouplabel}
      </FormLabel>

      <FormGroup row={tempRow}>
        {props.children}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroupComponent;
