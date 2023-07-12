import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import DataTransfer from '../../svgIcons/DataTransfer'

const CopyContent = (props: any) => {
    const { handleCopybutton, txtarea1Value, txtarea2Value, handleTxtarea1, txtareaClass, iconClass } = props

    return (
        <Box>

            {/* Scriptarea  */}
            <TextField
                {...props}
                multiline
                className={txtareaClass}
                inputProps={{ readonly: 'true' }}
                value={txtarea1Value}
                onChange={handleTxtarea1} />

            {/* Copy button */}
            <Button className={iconClass} onClick={handleCopybutton}>
                <DataTransfer />
            </Button>

            {/* Pastearea */}
            <TextField
                {...props}
                multiline
                className={txtareaClass}
                value={txtarea2Value} />
        </Box>
    )
}

export default CopyContent
