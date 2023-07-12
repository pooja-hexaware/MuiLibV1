import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import List,{ListItem, ListItemButton} from '.'

function renderList(props: any={}){
    return render( <List>
        <ListItem disablePadding>
          <ListItemButton primary="Trash"/>
        </ListItem></List>)
}

    describe("<List />",()=>{
    test("renders the List component", async () => {
        const { getByTestId, getByRole } = renderList();
        expect(await screen.getByRole('list')).toBeInTheDocument()   
    })

})