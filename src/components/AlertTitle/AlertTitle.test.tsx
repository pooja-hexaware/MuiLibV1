import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import  AlertTitle  from './AlertTitle';

function renderAlertTitle(props: any = {}) {
    return render(<AlertTitle data-testid="alertTitle"/>);
};

describe("<AlertTitle />", () => {
    test("renders the AlertTitle component", async () => {
        const AlertTitle = renderAlertTitle();
        expect(await screen.getAllByTestId('alertTitle')).toBeInTheDocument();
    })
}) 