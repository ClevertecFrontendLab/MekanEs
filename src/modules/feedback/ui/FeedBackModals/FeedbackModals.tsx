import { FC, useEffect, useState } from 'react';
import styles from './FeedbackModals.module.css';
import { PostErrorModal } from '../PostErrorModal/PostErrorModal';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { ErrorModal } from '../ErrorModal/ErrorModal';
import { MyFeedBack } from '../MyFeedBack/MyFeedBack';
import { LS_AuthKey } from '@shared/constants/constants';
import { useAppDispatch } from '@shared/hooks';
import { CustomResponseError, HttpStatusCode } from '@shared/types/common';
import { SerializedError } from '@reduxjs/toolkit';
import { authActions } from '@modules/auth/model/authSlice';
import { LoaderModal } from '@shared/components';
import { Button } from 'antd';
type FeedbackModalsProps = {
    error: CustomResponseError | SerializedError | undefined;
    isFetching: boolean;
    refetch: () => void;
    writeFBModal: boolean;
    openFB: () => void;
    closeFB: () => void;
};

export const FeedbackModals: FC<FeedbackModalsProps> = ({
    error,
    isFetching,
    refetch,
    writeFBModal,
    closeFB,
    openFB,
}) => {
    const dispatch = useAppDispatch();

    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [postErrorModal, setPostErrorModal] = useState(false);

    useEffect(() => {
        if (error && 'status' in error && error.status === HttpStatusCode.FORBIDDEN) {
            localStorage.removeItem(LS_AuthKey);
            dispatch(authActions.setAuthToken(null));
            setErrorModal(false);
        } else {
            setErrorModal(Boolean(error));
        }
    }, [error, dispatch]);
    return (
        <>
            {isFetching && <LoaderModal />}
            <PostErrorModal
                open={postErrorModal}
                className={styles.feedbackModal}
                extra={
                    <div className={styles.btnContainer}>
                        <Button
                            className={styles.button}
                            data-test-id='write-review-not-saved-modal'
                            onClick={() => {
                                setPostErrorModal(false);
                                openFB();
                            }}
                            type='primary'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className={styles.button}
                            onClick={() => {
                                setPostErrorModal(false);
                            }}
                            type='default'
                        >
                            Закрыть
                        </Button>
                    </div>
                }
            />
            <SuccessModal
                open={successModal}
                className={styles.feedbackModal}
                onClick={() => {
                    setSuccessModal(false);
                }}
            />
            <ErrorModal
                open={errorModal}
                className={styles.feedbackModal}
                onClick={() => {
                    setErrorModal(false);
                }}
            />

            <MyFeedBack
                openModal={writeFBModal}
                setSuccess={() => {
                    setSuccessModal(true);
                }}
                setError={() => {
                    setPostErrorModal(true);
                }}
                closeModal={() => {
                    closeFB();
                }}
                refetch={() => {
                    refetch();
                }}
            />
        </>
    );
};
