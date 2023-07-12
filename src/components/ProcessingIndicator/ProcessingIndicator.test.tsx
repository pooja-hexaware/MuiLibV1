import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProcessingIndicator from "./ProcessingIndicator";

function renderProgressBar(props: any = {}) {
  return render(
    <div>
      <ProcessingIndicator variant="determinate" value={80} />
    </div>
  );
}

describe("<LinearProgress />", () => {
  test("renders the progress bar component", async () => {
    const { getByRole } = renderProgressBar();
    expect(await screen.getByRole("progressbar")).toBeDefined();
  });
});
