import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CustomPopUp from './CustomPopUp';

function renderCustomPopUp(props: any = {}) {
    return render(<CustomPopUp
        title="CustomPopUp"
        firstBtn='Continue'
        secondBtn='Cancel'
    />);
}

describe("<CustomPopUp />", () => {
    test("renders the CustomPopUp component", async () => {
        const { getByRole } = renderCustomPopUp();
        expect(await screen.getByRole('heading')).toBeInTheDocument();
        expect(await screen.getByRole('button')).toBeInTheDocument();
    })
})


