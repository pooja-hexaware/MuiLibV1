import { Dialog, DialogTitle } from '@mui/material';
import React from 'react'

const PopupDialogTitle = (props: any) => {
    const { open, handleClose, Title } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                {...props}
            >
                <DialogTitle>
                    {Title}
                </DialogTitle>
            </Dialog>
        </>
    )
}

export default PopupDialogTitle