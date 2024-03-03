import { feedbackApi, useGetFeedbackQuery } from './api/feedbackApi';
import { feedbackActions, feedbackReducer } from './model/feedbackSlice';
import { FeedbackCard } from './ui/FeedbackCard/FeedbackCard';

export { useGetFeedbackQuery, feedbackActions, feedbackReducer, feedbackApi, FeedbackCard };
