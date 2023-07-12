import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SystemMsgTakeover from "./SystemMessageTakeover";

function RenderSmt(props: any={} ){
    return render(<SystemMsgTakeover 
        data-testid="messageTakeover"
        message="The system is down"
        title="Maintenance"
    />)
}

describe("<SystemMsgTakeover />",()=>{
    test("renders the SystemMsgTakeover component", async () => {
        const { getByTestId, getByRole } = RenderSmt();
        expect(await screen.queryByTestId('messageTakeover')).toBeDefined()   
    })

})