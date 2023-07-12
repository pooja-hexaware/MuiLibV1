import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ButtonGroup from "./ButtonGroup";
// import Button from "../Button";

function renderButtonGroup(props: any = {}) {
  return render(
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {props.children}
      </ButtonGroup>
  );
}

describe("<ButtonGroup />", () => {
  test("renders the ButtonGroup component", async () => {
    const { getByRole } = renderButtonGroup();
    expect(await screen.getByRole("group")).toBeInTheDocument();
  });
});
