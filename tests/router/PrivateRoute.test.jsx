import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router";

describe('PrivateRoute tests', () => { 
    test("should display children when the user is logged", () => {
        Storage.prototype.setItem = jest.fn();
        const user = {
            id: "ABC",
            name: "ARAS",
          };
          const contextValue = {
            logged: true,
            user
          };
        render(
          <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/marvel']}>
                <PrivateRoute>
                <h1>This a private route</h1>
                </PrivateRoute>
            </MemoryRouter>
          </AuthContext.Provider>
        );
        expect(screen.getByText("This a private route")).toBeTruthy();
        expect( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
        screen.debug();
      });
})