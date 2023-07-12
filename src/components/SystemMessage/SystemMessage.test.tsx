import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SystemMessage from './SystemMessage'

function renderSystemMessage(props: any={}){
    return render(<SystemMessage 
        heading="Warning" 
        message="this is a warning system message"
        data-testid="systemMsg" 
    />)
}

    describe("<SystemMessage />",()=>{
    test("renders the System Message component", async () => {
        const { getByTestId, getByRole } = renderSystemMessage();
        expect(await screen.queryByTestId('systemMsg')).toBeDefined()   
    })

})