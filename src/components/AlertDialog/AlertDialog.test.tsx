import React from "react"
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import AlertDialog from "./AlertDialog";


function renderAlertDialog(props: any = {}) {
    const isOpen = true;

    return render(
        <AlertDialog
            {...props}
            title="sample"
            description="sample alert dialog"
            option1="continue"
            color="error"
            isOpen={isOpen}
        />
    )
}

describe("<AlertDialog />", () => {
    test("AlertDialog is rendered", async () => {
        const { getByText, getByRole } = renderAlertDialog();
        expect(await screen.getByText('sample')).toBeInTheDocument();
        expect(await screen.getByText('sample alert dialog')).toBeInTheDocument();
        expect(await screen.getByRole('dialog')).toBeInTheDocument();

    })
})