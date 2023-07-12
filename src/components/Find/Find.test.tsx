import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Find from "./Find";

function RenderSmt(props: any={} ){
    const handleLabelClick = (title:string) =>{
        alert(title+" clicked")
      }
   
    return render(     <Find data-testid="Find" label = "Group"  />   )
}

describe("<Find />",()=>{
    test("renders the Title component", async () => {
        const { getByTestId, getByRole } = RenderSmt();
        expect(await screen.queryByTestId('Find')).toBeDefined()   
    })

})