import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClientFeedback, FeedbackSlice, ServerFeedback } from '@shared/types/feedback';

const initialState: FeedbackSlice = {
    feedbacks: [],
    newFeedback: undefined,
};
export const feedbackSlice = createSlice({
    name: 'feedbackSlice',
    initialState,
    reducers: {
        setFeedbacks: (state, action: PayloadAction<ServerFeedback[]>) => {
            state.feedbacks = action.payload;
        },
        setNewFeedBack: (state, action: PayloadAction<ClientFeedback>) => {
            state.newFeedback = action.payload;
        },
        removeNewFeedback: (state) => {
            state.newFeedback = undefined;
        },
    },
});
export const { reducer: feedbackReducer, actions: feedbackActions } = feedbackSlice;
