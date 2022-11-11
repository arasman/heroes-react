import { render, screen } from "@testing-library/react"
import { MemoryRouter, Router, Route } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router"

describe('AppRouter tests', () => {
    test('should display the login when the user is not authenticated', () => {
        const contextValue = {
            logged: false
        }
      const container = render(
        <MemoryRouter initialEntries={['/marvel']}>
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        </MemoryRouter>
      );      
      expect(container).toMatchSnapshot();
      expect(screen.getAllByText('Login').length).toBe(2);
      screen.debug();
    })
    
    test('should display the marvel component if the user is authenticated', () => {
        const user = {
            id: "ABC",
            name: "ARAS",
          };
          const contextValue = {
            logged: true,
            user: user,
          };
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect( screen.getByText('ARAS')).toBeTruthy();
        expect( screen.getByText('Marvel Comics')).toBeTruthy();
        screen.debug();
    })
    
  
})
