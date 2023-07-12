import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import AvatarMenu from './AvatarMenu';
import { getByRole } from '@testing-library/react';

function renderAvatarMenu(props: any = {}) {
    function onMenuClick() {
        console.log("menuoption");
    }
    return render(<AvatarMenu {...props}
        const Items={[{ label: "System message", render: onMenuClick },
        { label: "Takeover Message", render: onMenuClick },
        { label: "System message", render: onMenuClick }]}
    />
    );
}

describe("<AvatarMenu />", () => {
    test("renders the AvatarMenu component", async () => {
        const { getByRole } = renderAvatarMenu();
        expect(await screen.getByRole('generic')).toBeInTheDocument();
        expect(await screen.getByRole('button')).toBeInTheDocument();
        expect(await screen.getByRole('img')).toBeInTheDocument();
        expect(await screen.getByRole('separator')).toBeInTheDocument();
        expect(await screen.getByRole('menu')).toBeInTheDocument();
        expect(await screen.getByRole('menuitem')).toBeInTheDocument();
    })
})


