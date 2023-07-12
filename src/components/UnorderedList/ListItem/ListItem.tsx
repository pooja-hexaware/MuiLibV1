import * as React from 'react';
import ListItem from '@mui/material/ListItem';

const ReactListItem = (props: any) =>{

    return(
        <ListItem {...props}>
            {props.children}
        </ListItem>
    )
}

export default ReactListItem