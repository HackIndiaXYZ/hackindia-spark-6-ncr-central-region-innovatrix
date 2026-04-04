import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders AI dashboard heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/AI Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
