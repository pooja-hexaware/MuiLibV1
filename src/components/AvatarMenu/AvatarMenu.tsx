import React, { useState, useEffect } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Divider } from '@mui/material'
import Profile from './Profile'


const AvatarMenu = (props: any) => {
    const { src, anchorEl, onClick, onClose, open, onLogout, onProfileClick } = props;

    const [Items, setItems] = useState<string[]>([]);
    useEffect(() => {
        if (props.Items !== undefined && props.Items.length > 0) {
            setItems(props.Items);

        }
    }, [])

    return (
        <>
            <Box sx={{ float: 'right' }}>
                <IconButton
                    aria-haspopup="true"
                    onClick={onClick}
                >
                    <Avatar {...props} />
                </IconButton>
                <Menu
                    PaperProps={{
                        style: {
                            width: 'max-content',
                            minWidth: '100px'
                        },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={onClose}
                >
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                    <MenuItem onClick={onProfileClick}>Profile</MenuItem>
                    <Divider />
                    {Items.map((item: any) => (
                        <MenuItem onClick={item.render} key={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Box >
            {/* <>{cc}</> */}
        </>
    )
}

export default AvatarMenu