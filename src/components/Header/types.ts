export type HeaderProps = {
    navItems: NavItem[];
    bgcolor?: string;
    title: string;
};

export type NavItem = {
    label: string;
    keys: string[];
    items: string[];
}

export type DropdownProps = {
    label: string;
    items: string[];
    index: number;
    active: number;
    openMenu: (label: string, index: number) => void;
    closeMenu: () => void;
    anchorEl: HTMLElement | null;
};

export type Shortcut = {
    keys: string[]
    onEvent: (event: ShortcutEvent) => void
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