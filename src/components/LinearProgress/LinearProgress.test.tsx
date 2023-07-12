import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LinearProgress from "./LinearProgress";
import Typography from "./Typography";

function renderProgressBar(props: any = {}) {
  return render(
    <div>
      <LinearProgress variant="determinate" value={80} />
      <Typography variant="body2" color="text.secondary">
        {80}%
      </Typography>
    </div>
  );
}

describe("<LinearProgress />", () => {
  test("renders the progress bar component", async () => {
    const { getByRole } = renderProgressBar();
    expect(await screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
