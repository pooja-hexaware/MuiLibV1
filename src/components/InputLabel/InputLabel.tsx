import React from 'react'
import { InputLabel } from '@mui/material'

const ReactInputLabel = (props: any) =>{

    return(
        <InputLabel {...props}>
            {props.children}
        </InputLabel>
    )
}

export default ReactInputLabel