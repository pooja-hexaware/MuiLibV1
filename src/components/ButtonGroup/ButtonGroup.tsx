import React from "react";
import { ButtonGroup } from "@mui/material";

const ButtonGroupComponent = (props: any) => {
  return (
    <ButtonGroup {...props}>
      {props.children}
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
