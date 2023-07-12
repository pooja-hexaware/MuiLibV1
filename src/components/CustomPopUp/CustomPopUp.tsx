import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import CloseIcon from '../../svgIcons/Close'

const CustomPopUp = (props: any) => {
    const { open, handleClose, PopUpTitle, children, firstBtn, secondBtn, handleFirstBtn, handleSecondBtn,
        onCancel, bgcolor, height } = props;
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                className="DialogBox"
                {...props}
            >
                <DialogTitle {...props}
                    sx={{
                        bgcolor: bgcolor ? { bgcolor } : 'blue',
                        height: '30px'
                    }}>
                    {PopUpTitle}
                    <Tooltip title="Close">
                        <IconButton
                            onClick={onCancel}
                            aria-label="close"
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        {children}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFirstBtn}>
                        {firstBtn}
                    </Button>
                    <Button onClick={handleSecondBtn}>
                        {secondBtn}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CustomPopUp