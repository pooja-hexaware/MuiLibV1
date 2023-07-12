import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Select from './Select'

function renderRadioButton(props: any={}){
    return render(<Select 
        required
        value={0}
        label="Number"
    />)
}

    describe("<Select />",()=>{
    test("renders the Select component", async () => {
        const { getByTestId, getByRole } = renderRadioButton();
        expect(await screen.getByRole('button')).toBeInTheDocument()   
    })

})