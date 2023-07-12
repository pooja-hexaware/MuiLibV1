import React from 'react'
import { AppBar, Button, Dialog, IconButton, TextField, Typography } from '@mui/material';
import { ReactComponent as CloseIcon } from "../icons/close.svg"


const Profile = (props: any) => {
    const { color, position, top, bottom, left, right } = props;

    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClick={props.onCancel}
                PaperProps={{
                    style: {
                        backgroundColor: color ? color : '#0047BA',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: position ? position : 'absolute',
                        top,
                        bottom,
                        left,
                        right,
                        // top: 10,
                        // left: 10,
                        width: '100px',
                    },
                }}>
                <AppBar>
                    <Typography>Profile</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={props.onCancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </AppBar>
                <Typography>First Name</Typography>
                <TextField required variant="outlined" />
                <Typography>Last Name</Typography>
                <TextField required variant="outlined" />
                <Typography>Title</Typography>
                <TextField disabled defaultValue="Person that works here" variant="outlined" />
                <Button>OK</Button>

            </Dialog>

        </div>
    )
}

export default Profile