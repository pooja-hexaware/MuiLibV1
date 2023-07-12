import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import CopyContent from './CopyContent';

function renderCopyContent(props: any = {}) {
    return render(<CopyContent {...props} />);
}

describe("<CopyContent />", () => {
    test("renders the CopyContent component", async () => {
        const { getByRole } = renderCopyContent();
        expect(await screen.getByRole('generic')).toBeInTheDocument();
        expect(await screen.getByRole('textbox')).toBeInTheDocument();
        expect(await screen.getByRole('button')).toBeInTheDocument();
        expect(await screen.getByRole('graphics-symbol')).toBeInTheDocument();
    })
})


