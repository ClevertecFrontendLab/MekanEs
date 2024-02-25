import { RootState } from '@app/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL } from '@shared/constants/constants';

export const CreateFBQ = (additinal: string) =>
    fetchBaseQuery({
        baseUrl: BASE_URL + additinal,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    });
