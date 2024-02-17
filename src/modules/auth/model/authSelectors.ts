import { RootState } from '@app/store';

export const getAuth = (state: RootState) => state.auth.token;
