import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import  FileDrop  from './FileDrop';

function renderCard(props: any = {}) {
    return render(<FileDrop
        data-testid="fileDrop"
        {...props} />
    );
};

describe("<FileDrop />", () => {
    test("renders the Card component", async () => {
        const { getByRole } = renderCard();
        expect(await screen.queryByTestId('fileDrop')).toBeDefined();
    })
}) 