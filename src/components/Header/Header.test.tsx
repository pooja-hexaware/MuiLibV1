import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

function renderHeader(props: any = {}) {
    return render(<Header {...props}
        title="App"
        const menuItems={[
            { label: 'Products', keys: ['alt', 'p'], items: ['pro1', 'pro2', 'pro3'] },
            { label: 'Claims', keys: ['alt', 'c'], items: ['claim1', 'claim2', 'claim3'] },
            { label: 'Enrollment', keys: ['alt', 'e'], items: ['enrol1', 'enrol2', 'enrol3'] }
        ]}
    />
    );
}

describe("<Header />", () => {
    test("renders the Header component", async () => {
        const { getByRole } = renderHeader();
        expect(await screen.getByRole('generic')).toBeInTheDocument();
        expect(await screen.getByRole('paragraph')).toBeInTheDocument();
    })
})


