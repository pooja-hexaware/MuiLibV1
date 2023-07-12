import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    IconButton, Tooltip
} from '@mui/material';
import CheckCircle from "../../svgIcons/CheckCircle"
import Error from "../../svgIcons/Error"
import Warning from "../../svgIcons/Warning"
import CloseIcon from "../../svgIcons/Close"
import InfoIcon from "../../svgIcons/Info"



const AlertDialog = (props: any) => {

    const { color, type, option1, option2, position, top, bottom, left, right, width } = props;
    const alertConstants: any = {
        error: "#f8d7da",
        warning: "#fff3cd",
        info: "#E5F6FD",
        success: "#d4edda"
    }
    const Icons = () => {
        if (type == "error") {
            return <Error style={{ marginTop: "10px" }} />
        }
        else if (type == "warning") {
            return <Warning style={{ marginTop: "10px" }} />
        }
        else if (type == "success") {
            return <CheckCircle style={{ marginTop: "10px" }} />
        }
        else if (type == "info") {
            return <InfoIcon style={{ marginTop: "10px" }} />
        }
        else {
            return <img src=' ' />
        }
    }
    return (

        <div>
            < Dialog
                open={props.isOpen}
                PaperProps={{
                    style: {
                        backgroundColor: color ? color : alertConstants[type],
                        alignItems: 'center',
                        textAlign: 'center',
                        position: position ? position : 'absolute',
                        top,
                        bottom,
                        left,
                        right,
                        width,
                    },
                }}>
                <Icons />
                <Tooltip title="Close">
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
                        <CloseIcon width={15} height={15}/>
                    </IconButton>
                </Tooltip>
                <DialogTitle>
                    {props.title}
                </DialogTitle >
                <DialogContent>
                    <DialogContentText >
                        <b>{props.description}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {option1 !== undefined ? <Button variant="contained" sx={{ marginBottom: '10px' }} onClick={props.onContinue}>
                        {props.option1}
                    </Button> : ' '}
                    {option2 !== undefined ? <Button variant="contained" sx={{ marginBottom: '10px' }} onClick={props.onCancel}>
                        {props.option2}
                    </Button> : ' '}
                </DialogActions>
            </Dialog>

        </div >
    );
};

export default AlertDialog;