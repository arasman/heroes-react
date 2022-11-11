import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router";

describe("PublicRoute tests", () => {
  test("should display children when the user is not logged", () => {
    const contextValue = { logged: false };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>This a public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("This a public route")).toBeTruthy();
    screen.debug();
  });
  test("should navigate when the user is logged", () => {
    const user = {
      id: "ABC",
      name: "ARAS",
    };
    const contextValue = {
      logged: true,
      user: user,
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>This a public route</h1>
                </PublicRoute>
              }
            />
            <Route path="/marvel" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Marvel Page")).toBeTruthy();
    screen.debug();
  });
});
