export type MainMenuProps = {
    menuItems: MenuItem[];
    bgcolor?: string;
};

export type MenuItem = {
    menuName: string;
    path?: string;
    keys?: string[];
    items?: Items[];
    disabled?: boolean;
}
export type DropdownProps = {
    menuName: string;
    path?: string;
    items?: Items[];
    index: number;
    active: number;
    openMenu: (menuName: string, index: number) => void;
    closeMenu: () => void;
    anchorEl: HTMLElement | null;
    disabled?: boolean;
};
export type Items = {
    label: string;
    path?: string;
}


export type Shortcut = {
    keys: string[] | undefined,
    onEvent: (event: ShortcutEvent) => void,
    disabled?: boolean
}

export enum EventType {
    keydown = "keydown",
    wheel = "wheel",
}

export enum ComboKey {
    ctrl = "ctrl",
    shift = "shift",
    alt = "alt",
}

export type ShortcutEvent = KeyboardEvent | WheelEvent