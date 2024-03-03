import { BaseQueryFn, FetchArgs, createApi } from '@reduxjs/toolkit/query/react';
import { CustomResponseError } from '@shared/types/common';
import { ClientFeedback, ServerFeedback } from '@shared/types/feedback';
import { CreateFBQ } from '@shared/utils';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: CreateFBQ('') as BaseQueryFn<
        string | FetchArgs,
        ServerFeedback[],
        CustomResponseError
    >,

    endpoints: (builder) => ({
        getFeedback: builder.query<ServerFeedback[], void>({
            query: () => ({
                url: 'feedback',
            }),
            keepUnusedDataFor: 0,
            transformResponse: (data) => {
                return data.sort((a, b) => {
                    const firstDate = new Date(a.createdAt);
                    const secondDate = new Date(b.createdAt);
                    return secondDate.getTime() - firstDate.getTime();
                });
            },
        }),
        postFeedback: builder.mutation<object, ClientFeedback>({
            query: (credentials) => ({
                url: 'feedback',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useGetFeedbackQuery, usePostFeedbackMutation } = feedbackApi;
