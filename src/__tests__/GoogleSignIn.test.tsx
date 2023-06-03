import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { GoogleSignIn } from "../components/GoogleSignIn";

describe("rendering", () => {
  it("Should render Googleでサインイン text", () => {
    render(<GoogleSignIn />);
    expect(screen.getByText("Googleでサインイン")).toBeInTheDocument();
  });
});
