import React from 'react'
import { CardActions } from '@mui/material'

const ReactCardActions = (props: any) =>{

    return(
        <CardActions {...props}>
            {props.children}
        </CardActions>
    )
}

export default ReactCardActions;