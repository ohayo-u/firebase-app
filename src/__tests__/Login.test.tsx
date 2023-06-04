import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Login } from "../components/Login";
import { onAuthStateChanged } from "firebase/auth";

jest.mock("../firebase", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));

describe("Login", () => {
  it("renders loading state initially", () => {
    const { queryByTestId } = render(<Login />);

    expect(queryByTestId("login-image")).toBeNull();
  });

  it("renders Login screen if no user is authenticated", async () => {
    (onAuthStateChanged as jest.Mock).mockImplementationOnce((auth, callback) =>
      callback(null)
    );

    const { getByTestId } = render(<Login />);

    await waitFor(() => {
      expect(getByTestId("login-image")).toBeInTheDocument();
    });
  });
});
