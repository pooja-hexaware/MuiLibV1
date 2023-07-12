import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import MenuItem from './MenuItem'

function renderMenuItem(props: any={}){

    return render(<MenuItem 
    value='female'
    />)
}

describe("<MenuItem />",()=>{

    test("renders the MenuItem component", async () => {
        const { getByTestId, getByRole } = renderMenuItem();
        expect(await screen.getByRole('menuitem')).toBeInTheDocument()   
    })

   
})
