import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ToastMessage from './ToastMessage'

function renderToastMessage(props: any={}){

    return render(<ToastMessage 
        autoHideDuration={6000} 
        message="This is a Toast Message"
        />)
}

describe("<ToastMessage />",()=>{

    test("renders the toast message component", async () => {
        const { getByTestId, getByRole } = renderToastMessage();
        expect(await screen.getByRole('alert')).toBeInTheDocument()   
    }) 
})