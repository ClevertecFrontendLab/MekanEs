import { authActions } from '@modules/auth/model/authSlice';
import { FeedbackCard, useGetFeedbackQuery } from '@modules/feedback';
import { MyFeedBack } from '@modules/feedback/ui/MyFeedBack/MyFeedBack';
import { LoaderModal } from '@shared/components';
import { LS_AuthKey } from '@shared/constants/constants';
import { useAppDispatch } from '@shared/hooks';
import { Button, Modal, Result } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Feedback: FC = () => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const [opened, setOpened] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [postErrorModal, setPostErrorModal] = useState(false);
    const { data, isFetching, refetch, error } = useGetFeedbackQuery();

    const feedbacks = data;
    const activeFB = feedbacks && (opened ? feedbacks : feedbacks.slice(0, 4));
    useEffect(() => {
        if (error) {
            if ('status' in error && error.status === 403) {
                localStorage.removeItem(LS_AuthKey);
                dispatch(authActions.setAuthToken(null));
                setErrorModal(false);
            } else {
                console.log('modal open');
                setErrorModal(true);
            }
        } else {
            console.log('modal close');

            setErrorModal(false);
        }
    }, [error, dispatch]);
    return (
        <>
            {isFetching && <LoaderModal />}
            <Modal open={postErrorModal} centered footer={null} closable={false}>
                <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    extra={
                        <>
                            <Button
                                data-test-id='write-review-not-saved-modal'
                                onClick={() => {
                                    setPostErrorModal(false);
                                    setOpenModal(true);
                                }}
                                type='primary'
                            >
                                Написать отзыв
                            </Button>
                            <Button
                                onClick={() => {
                                    setPostErrorModal(false);
                                }}
                                type='primary'
                            >
                                Закрыть
                            </Button>
                        </>
                    }
                />
            </Modal>
            <Modal open={successModal} centered footer={null} closable={false}>
                <Result
                    status='success'
                    title='Отзыв успешно опубликован'
                    subTitle={null}
                    extra={
                        <Button
                            onClick={() => {
                                setSuccessModal(false);
                            }}
                            type='primary'
                        >
                            Отлично
                        </Button>
                    }
                />
            </Modal>
            <Modal open={errorModal} centered footer={null} closable={false}>
                <Result
                    status='404'
                    title='Что-то пошло не так'
                    subTitle='Произошла ошибка, попробусте ещё раз'
                    extra={
                        <Button
                            onClick={() => {
                                setErrorModal(false);
                                nav('/main');
                            }}
                            type='primary'
                        >
                            Назад
                        </Button>
                    }
                />
            </Modal>

            <MyFeedBack
                openModal={openModal}
                setSuccess={() => {
                    setSuccessModal(true);
                }}
                setError={() => {
                    setPostErrorModal(true);
                }}
                closeModal={() => {
                    setOpenModal(false);
                }}
                refetch={() => {
                    refetch();
                }}
            />
            <div
                style={{
                    overflowY: 'scroll',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {activeFB && activeFB.length > 0 ? (
                    <>
                        <div>
                            {activeFB.map((el) => (
                                <FeedbackCard key={el.id} feedback={el} />
                            ))}
                        </div>
                        <Button
                            data-test-id='all-reviews-button'
                            onClick={() => setOpened((prev) => !prev)}
                        >
                            {opened ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>

                        <Button
                            data-test-id='write-review'
                            onClick={() => setOpenModal((prev) => !prev)}
                        >
                            Написать отзыв
                        </Button>
                    </>
                ) : (
                    <div>
                        <span>Нет отзывов</span>

                        <Button
                            data-test-id='write-review'
                            onClick={() => setOpenModal((prev) => !prev)}
                        >
                            Написать отзыв
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
