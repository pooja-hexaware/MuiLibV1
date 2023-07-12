import React from 'react';
const { render, screen } = require('@testing-library/react');
import '@testing-library/jest-dom/extend-expect';
const { AgGridReact } = require('ag-grid-react');
jest.mock('ag-grid-react', () => ({
  AgGridReact: jest.fn(),
}));
function RenderSmt() {
    
    return render(<AgGridReact 
        data-testid="AgGrid" />)
}

describe("<AgGridReact />", () => {
    test("renders the AgGrid component", async () => {
        const { getByTestId, getByRole } = RenderSmt();
        expect(await screen.queryByTestId('AgGrid')).toBeDefined()
    })

})