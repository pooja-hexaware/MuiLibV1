import React from 'react';
import { Alert } from '@mui/material';

const ReactAlert = (props: any) => {
    return (
            <Alert {...props} >
                {props.children}
            </Alert >
    );
};

export default ReactAlert;