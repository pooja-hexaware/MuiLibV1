import React, { useState } from 'react'
import { AppBar } from '@mui/material'
import DropdownMenu from './DropdownMenu';
import { MainMenuProps } from './types';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

const MainMenu = ({ menuItems, bgcolor }: MainMenuProps) => {
    const [active, setActive] = useState(-1);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = (menuName: string, index: number) => {
        setAnchorEl(null);
        setActive(() => index);
        setAnchorEl(() => document.getElementById(`${menuName}-button`));
    }

    const closeMenu = () => {
        setAnchorEl(null);
        setActive(-1);
    }
    const filterMenu = menuItems.filter((item) => item.keys !== undefined)
    console.log(filterMenu);
    const keyboardShortcutParams = filterMenu.map((item, index) => ({
        // if (item.keys) {
        keys: item.keys,
        onEvent: () => openMenu(item.menuName, index)
        // }
    }));
    console.log(keyboardShortcutParams);
    useKeyboardShortcuts(keyboardShortcutParams);

    return (
        <AppBar style={{ background: bgcolor ? bgcolor : '#2E3B55' }}>
            <div>
                {menuItems?.map((item, index) =>
                    <DropdownMenu
                        anchorEl={anchorEl}
                        openMenu={openMenu}
                        closeMenu={closeMenu}
                        menuName={item.menuName}
                        items={item.items}
                        path={item.path}
                        key={index}
                        index={index}
                        active={active}
                    />)
                }
            </div>
        </AppBar >
    );
}

export default MainMenu