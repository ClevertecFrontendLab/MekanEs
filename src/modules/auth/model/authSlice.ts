import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LS_AuthKey } from '@shared/constants/constants';
import { AuthSlice } from '../types';

const initialState: AuthSlice = {
    token: localStorage.getItem(LS_AuthKey) || sessionStorage.getItem(LS_AuthKey),
};
export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
    },
});
export const { reducer: authReducer, actions: authActions } = authSlice;
