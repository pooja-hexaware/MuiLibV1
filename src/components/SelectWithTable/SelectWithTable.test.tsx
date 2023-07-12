import React,{useState} from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SelectWithTable from './SelectWithTable'

function renderSelectWithTable(props: any={}){
    const CATEGORY_SELECT_HEADER = [
        { name: 'categoryName', label: 'Name' },
        { name: 'categoryCode', label: 'Code' },
      ];
    const attachmentCategoryComboData=[
        {categoryId:0,categoryName:"NameOne",categoryCode:" 012"},
        {categoryId:1,categoryName: "NameTwo", categoryCode:" 013"},
        {categoryId:2,categoryName: "ThirdName", categoryCode:" 014"}
    ]
    
    return render(<SelectWithTable
        defaultText={''}
    tableHeader={CATEGORY_SELECT_HEADER} tableRows={attachmentCategoryComboData}
    name='categoryId' title={"Category"}
    id='categoryId'
    value={attachmentCategoryComboData[0]}     
    />)
}

describe("<SelectWithTable />", () => {
    test("renders the SelectWithTable component", async () => {
        const { getByTestId, getByRole } = renderSelectWithTable();
        expect(await screen.getByRole('button', {
            name: /dropdown icon/i
          })).toBeInTheDocument()   
    });
  });