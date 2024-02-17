import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_PATH } from '@shared/constants/constants';
import { LoginProps, LoginResponse } from '@shared/types/auth';
import { CreateFBQ } from '@shared/utils';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: CreateFBQ(AUTH_PATH),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginProps>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<LoginResponse, LoginProps>({
            query: (credentials) => ({
                url: 'registration',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
