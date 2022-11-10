import { types } from "../types/types";


const initialState = {
    logged: false,
    name: 'ARAS',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                nam: action.payload
            };
        case types.logout:
            return {
                logged: false
            };
        default:
            return state;
    }
}