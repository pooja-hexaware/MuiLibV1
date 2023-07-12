import React from 'react'
import { CardContent, Typography } from '@mui/material'

const CardContentComponent = (props: any) =>{

    return(
        <CardContent>
        <Typography 
            variant= {props.titleVariant !== undefined ? props.titleVariant: "h5"}
            color= {props.color !== undefined ? props.color: "text.primary"}
            component="div" >
                   {props.title}
        </Typography>

            {props.children}

        </CardContent>
    )
}

export default CardContentComponent