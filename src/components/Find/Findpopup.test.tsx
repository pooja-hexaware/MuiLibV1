import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Findpopup from "./Findpopup";

function RenderSmt(props: any={} ){
    const handleLabelClick = (title:string) =>{
        alert(title+" clicked")
      }
   
    return render(     <Findpopup data-testid="Findpopup" title = "Find Group"  />   )
}

describe("<Findpopup />",()=>{
    test("renders the Title component", async () => {
        const { getByTestId, getByRole } = RenderSmt();
        expect(await screen.queryByTestId('Findpopup')).toBeDefined()   
    })

})