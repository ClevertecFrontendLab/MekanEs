import { RootState } from '@app/store';

export const getAuth = (state: RootState) => state.auth.token;
export const getAuthValues = (state: RootState) => state.auth.authValues;
export const getRegValues = (state: RootState) => state.auth.regValues;
export const getChangeValues = (state: RootState) => state.auth.changePasswordValues;
