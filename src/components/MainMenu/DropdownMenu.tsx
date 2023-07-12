import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, MenuItem, Box, AppBar } from '@mui/material';
import Dropdown from '../../svgIcons/Dropdown';
import { DropdownProps } from "./types";

export default function DropdownMenu({ menuName, index, items, active, openMenu, anchorEl, closeMenu, path, disabled }: DropdownProps) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(active === index);
    }, [active])

    return (
        <>
            {(items) ? (
                <Button
                    id={`${menuName}-button`}
                    aria-controls={open ? `menu-${index}` : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    size='small'
                    onClick={() => openMenu(menuName, index)}
                    sx={{
                        height: '60px', ml: '20px', textTransform: "none", color: 'inherit'
                    }}
                    endIcon={<Dropdown />}
                >
                    <Typography><u>{menuName.slice(0, 1).toUpperCase()}</u>{menuName.slice(1).toLowerCase()}</Typography>
                </Button >
            ) : (
                <Button
                    id={`${menuName}-button`}
                    aria-controls={open ? `menu-${index}` : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    size='small'
                    sx={{
                        height: '60px', ml: '20px', textTransform: "none", color: 'inherit'
                    }}
                    href={path}
                >
                    <Typography>{menuName.slice(0, 1).toUpperCase()}{menuName.slice(1).toLowerCase()}</Typography>
                </Button >
            )}
            {(anchorEl && anchorEl.id === `${menuName}-button`) &&
                <Menu
                    PaperProps={{
                        style: {
                            width: 'max-content',
                            minWidth: '100px'
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
                        items?.map((item, id) => (
                            <MenuItem key={`${item.label}-${id}`} component='a' href={item.path} disabled={disabled} disableRipple >
                                {item.label}
                            </MenuItem>
                        ))
                    }
                </Menu >
            }
        </>

    );
}
