import { BaseQueryFn, FetchArgs, createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_PATH } from '@shared/constants/constants';
import { LoginProps, LoginResponse } from '@shared/types/auth';
import { CustomResponseError } from '@shared/types/common';
import { CreateFBQ } from '@shared/utils';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: CreateFBQ(AUTH_PATH) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CustomResponseError
    >,

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
        checkEmail: builder.mutation<LoginResponse, { email: string }>({
            query: (credentials) => ({
                url: 'check-email',
                method: 'POST',
                body: credentials,
            }),
        }),

        confirmEmail: builder.mutation<LoginResponse, { email: string; code: string }>({
            query: (credentials) => ({
                url: 'confirm-email',
                method: 'POST',
                body: credentials,
            }),
        }),
        changePassword: builder.mutation<
            LoginResponse,
            { password: string; confirmPassword: string }
        >({
            query: (credentials) => ({
                url: 'change-password',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
