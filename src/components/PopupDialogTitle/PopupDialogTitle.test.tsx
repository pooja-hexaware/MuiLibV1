import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import PopupDialogTitle from './PopupDialogTitle';

function renderPopupDialogTitle(props: any = {}) {
    return render(<PopupDialogTitle {...props} />);
}

describe("<PopupDialogTitle />", () => {
    test("renders the PopupDialogTitle component", async () => {
        const { getByRole } = renderPopupDialogTitle();
        expect(await screen.getByRole('heading')).toBeInTheDocument();
    })
})