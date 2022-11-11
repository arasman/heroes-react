import { types } from "../../../src/auth"

describe('types tests', () => { 
    test('should return types', () => {
      expect(types).toEqual( {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    })
    })
    
})