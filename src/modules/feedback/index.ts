import { feedbackApi, useGetFeedbackQuery } from './api/feedbackApi';
import { feedbackActions, feedbackReducer } from './model/feedbackSlice';
import { ErrorModal } from './ui/ErrorModal/ErrorModal';
import { FeedbackModals } from './ui/FeedBackModals/FeedbackModals';
import { FeedbackCard } from './ui/FeedbackCard/FeedbackCard';
import { PostErrorModal } from './ui/PostErrorModal/PostErrorModal';
import { SuccessModal } from './ui/SuccessModal/SuccessModal';

export {
    useGetFeedbackQuery,
    feedbackActions,
    feedbackReducer,
    feedbackApi,
    FeedbackCard,
    PostErrorModal,
    SuccessModal,
    ErrorModal,
    FeedbackModals,
};
