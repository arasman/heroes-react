import { authReducer, types } from "../../../src/auth";

describe('authReducer tests', () => { 
    const initialState = {
        logged: false,
        user: {
            id: '',
            name: '',
          }
    }
    test('should return the initial state', () => {
      const newState = authReducer(initialState, {});
      expect(newState).toBe(initialState);
    })

    test('should perform the login and establish the user and logged as true', () => {
        const user = {
            id: 'ABC',
            name: "ARAS",
        };
        const action = {
            type: types.login,
            payload: user,
        };
        const newState = authReducer(initialState, action);
        // console.log(newState);
        // console.log(JSON.stringify(newState));
        // expect(JSON.stringify(newState)).toContain(JSON.stringify(action.payload));
        // expect(JSON.stringify(newState)).toContain("true");
        expect( newState).toEqual({
            logged: true,
            user: action.payload
        });
    })

    test('should perform the logout and remove the user-name and logged as false', () => {
        const user = {
            id: 'ABC',
            name: "ARAS",
        };
        const action = {
            type: types.logout
        };
        const newState = authReducer(initialState, action);
        // console.log(newState);
        // console.log(JSON.stringify(newState));
        // expect(JSON.stringify(newState)).toContain("false");
        expect( newState).toEqual({
            logged: false
        })
    })
    
})