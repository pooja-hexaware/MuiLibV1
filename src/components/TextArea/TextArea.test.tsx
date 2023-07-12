import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Textarea from './TextArea'

function renderRadioButton(props: any={}){
    return render(<Textarea name="Solid" 
        placeholder="Type in here…" value="TextArea Value" />)
}

describe("<Textarea />",()=>{
    test("renders the Text Area component", async () => {
        const { getByTestId, getByRole } = renderRadioButton();
        expect(await screen.getByDisplayValue('TextArea Value')).toBeInTheDocument();
    })

})

