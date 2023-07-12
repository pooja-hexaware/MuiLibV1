import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, MenuItem } from '@mui/material';
import Dropdown from '../../svgIcons/Dropdown';
import { DropdownProps } from "./types";

export default function DropdownMenu({ label, index, items, active, openMenu, anchorEl, closeMenu }: DropdownProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(active === index);
    }, [active])

    return (
        <>
            <Button
                id={`${label}-button`}
                aria-controls={open ? `menu-${index}` : undefined}
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                size='small'
                disableElevation
                onClick={() => openMenu(label, index)}
                sx={{
                    height: '60px', ml: '20px', textTransform: "none", color: 'inherit'
                }}
                endIcon={<Dropdown />}
            >
                <Typography><u>{label.slice(0, 1).toUpperCase()}</u>{label.slice(1).toLowerCase()}</Typography>
            </Button >
            {(anchorEl && anchorEl.id === `${label}-button`) &&
                <Menu
                    PaperProps={{
                        style: {
                            width: 'max-content',
                        },
                    }}
                    id={`menu-${index}`}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {
                        items.map((item, id) => (
                            <MenuItem key={`${item}-${id}`} onClick={closeMenu} disableRipple>
                                {item}
                            </MenuItem>
                        ))
                    }
                </Menu>
            }
        </>
    )
}
