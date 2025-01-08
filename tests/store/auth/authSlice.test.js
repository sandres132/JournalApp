import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlices"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Tests in authSlices', () => {
    test('should return initialState and be named auth', () => {

        const state = authSlice.reducer( initialState, {});
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');

    });

    test('should authenticate', () => {

        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual(authenticatedState);
    });

    test('should logout without arguments', () => {
        
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            "displayName": null,
            "email": null,
            "errorMessage": undefined,
            "photoURL": null,
            "status": "not-authenticated",
            "uid": null,
        });
    });

    test('should logout with arguments and show the error message', () => {
        const errorMessage = 'Incorrect credentials';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            "displayName": null,
            "email": null,
            "errorMessage": errorMessage,
            "photoURL": null,
            "status": "not-authenticated",
            "uid": null,
        });
    });

    test('should change state to checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking')
    })
})