import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import MainMenu from './MainMenu';

function renderMainMenu(props: any = {}) {
    return render(<MainMenu {...props}
        title="App"
        const menuItems={[
            { menuName: 'Products', keys: ['alt', 'p'], items: [{ label: 'pro1', path: '/' }, { label: 'pro2', path: '/' }, { label: 'pro3', path: '/' }] },
            { menuName: 'Claims', keys: ['alt', 'c'], items: [{ label: 'claim1', path: '/' }, { label: 'claim2', path: '/' }, { label: 'claim3', path: '/' }] },
            { menuName: 'Enrollment', keys: ['alt', 'e'], items: [{ label: 'enroll1', path: '/' }, { label: 'enroll2', path: '/' }, { label: 'enroll3', path: '/' }] },
            { menuName: 'Workflow', path: '/' }
        ]}
    />
    );
}

describe("<MainMenu />", () => {
    test("renders the MainMenu component", async () => {
        const { getByRole } = renderMainMenu();
        expect(await screen.getByRole('generic')).toBeInTheDocument();
        expect(await screen.getByRole('paragraph')).toBeInTheDocument();
        expect(await screen.getByRole('button')).toBeInTheDocument();
        expect(await screen.getByRole('menu')).toBeInTheDocument();
        expect(await screen.getByRole('menuitem')).toBeInTheDocument();
    })
})


