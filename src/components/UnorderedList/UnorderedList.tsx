import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const ReactList = (props: any) => {

    return (
        <List {...props}>
            {props.children}
        </List>
    );
};

export default ReactList
