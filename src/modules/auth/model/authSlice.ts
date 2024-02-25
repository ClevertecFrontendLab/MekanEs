import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LS_AuthKey } from '@shared/constants/constants';
import { AuthFormValues, AuthSlice } from '../types';
import { LoginProps } from '@shared/types/auth';

const initialState: AuthSlice = {
    token: localStorage.getItem(LS_AuthKey),
    authValues: null,
    regValues: null,
    changePasswordValues: null,
};
export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setAuthValues: (state, action: PayloadAction<AuthFormValues | null>) => {
            state.authValues = action.payload;
        },
        setRegValues: (state, action: PayloadAction<LoginProps | null>) => {
            state.regValues = action.payload;
        },
        setChangeValues: (state, action: PayloadAction<{ password: string } | null>) => {
            state.changePasswordValues = action.payload;
        },
    },
});
export const { reducer: authReducer, actions: authActions } = authSlice;
