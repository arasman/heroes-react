import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import { useContext } from "react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth";
import { PrivateRoute } from "../../../src/router";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}) )

describe('NavBar tests', () => { 
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('should display the logged username', () => {
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
                    <PrivateRoute>
                        <Navbar/>
                    </PrivateRoute>
                </AuthContext.Provider>
            </MemoryRouter>
          ); 
          expect( screen.getByText(user.name)).toBeTruthy();
          screen.debug();
    })

    test('should call the functions of logout and navigate', () => {
        const mockLogout = jest.fn();        
        const userInfo = {
            id: "ABC",
            name: "ARAS",
          };
          const contextValue = {
            logged: true,
            user: userInfo,
            logout : mockLogout,
          };
          render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <PrivateRoute>
                        <Navbar/>
                    </PrivateRoute>
                </AuthContext.Provider>
            </MemoryRouter>
          ); 
          const btn = screen.getByRole('button');
          console.log(btn);
          fireEvent.click(btn);
          expect( mockLogout ).toHaveBeenCalled();
          expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {replace: true});
          screen.debug();
    })
    
    
})