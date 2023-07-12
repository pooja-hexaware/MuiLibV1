import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import  Card  from './Card';

function renderCard(props: any = {}) {
    return render(<Card
        data-testid="card"
        {...props} />
    );
};

describe("<Card />", () => {
    test("renders the Card component", async () => {
        const { getByRole } = renderCard();
        expect(await screen.queryByTestId('card')).toBeDefined();
    })
}) 