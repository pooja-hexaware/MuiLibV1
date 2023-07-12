import React, { useState } from 'react';
import { AppBar, Button } from '@mui/material';
import DropdownMenu from "./DropdownMenu";
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { HeaderProps } from "./types";

const Header = ({ navItems, bgcolor, title }: HeaderProps) => {

    const [active, setActive] = useState(-1);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openMenu = (label: string, index: number) => {
        setAnchorEl(null);
        setActive(() => index);
        setAnchorEl(() => document.getElementById(`${label}-button`));
    }

    const closeMenu = () => {
        setAnchorEl(null);
        setActive(-1);
    }

    const keyboardShortcutParams = navItems.map((item, index) => ({
        keys: item.keys,
        onEvent: () => openMenu(item.label, index),
    }));

    useKeyboardShortcuts(keyboardShortcutParams);

    return (
        <AppBar style={{ background: bgcolor ? bgcolor : '#2E3B55' }}>
            <div>
                <Button variant="text" sx={{ color: 'inherit' }}>
                    <b>{title}</b>
                </Button>
                {navItems.map((item, index) =>
                    <DropdownMenu
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        closeMenu={closeMenu}
                        label={item.label}
                        items={item.items}
                        key={index}
                        index={index}
                        active={active}
                    />)}
            </div>
        </AppBar >
    );
}

export default Header;