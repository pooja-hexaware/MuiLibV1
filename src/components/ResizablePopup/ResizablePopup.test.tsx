import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ResizablePopup from "./ResizablePopup";

function RenderSmt(props: any={} ){
   
   
    return render(     <ResizablePopup data-testid="ResizablePopup" title = "Test"  />   )
}

describe("<ResizablePopup />",()=>{
    test("renders the Title component", async () => {
        const { getByTestId, getByRole } = RenderSmt();
        expect(await screen.queryByTestId('ResizablePopup')).toBeDefined()   
    })

})