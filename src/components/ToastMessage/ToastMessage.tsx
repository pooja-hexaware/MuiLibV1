import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

const CustomSnackbar = (props: any ) => {
  const [open, setOpen] = React.useState(true);

return (
    <Snackbar 
    sx={{marginTop: "65px"}}
        {...props}
        open={open}
        onClose={(event, reason) => {
          setOpen(false);
        }}
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'center' 
        }}
        autoHideDuration={props.autoHideDuration}
       
    >
        <Alert severity={props.type}  sx={props.sx} >
            <AlertTitle>{props.title}</AlertTitle>
                {props.message}
        </Alert>
      </Snackbar>
        );
};

export default CustomSnackbar