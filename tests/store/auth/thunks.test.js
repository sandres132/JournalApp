import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlices";
import { checkingAuthentication, startGoolgleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Test in authThunks', () => {
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('should invoke checkingCredentials', async() => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });

    test('startGoogleSignIn should call checkingCredentials and login - Success', async () => {

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoolgleSignIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });

    test('startGoogleSignIn should call checkingCredentials and logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Google error' };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoolgleSignIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );
    })

    test('startLoginWithEmailPassword should call chekingCredentials and login - Success',async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = {email: demoUser.email, password: '123455456'};
        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });

    test('startLoginWithEmailPassword should call chekingCredentials and login - Error',async () => {

        const loginData = { ok: false, ...demoUser, errorMessage: 'Signin error' };
        const formData = {email: demoUser.email, password: '123455456'};
        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage:loginData.errorMessage}) );
    });

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    })
})