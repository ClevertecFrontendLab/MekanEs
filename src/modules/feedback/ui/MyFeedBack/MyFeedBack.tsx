import { FC, useEffect, useState } from 'react';
import styles from './MyFeedBack.module.css';
import { Button, Input, Modal, Rate } from 'antd';
import { RateCharacter } from '@shared/components/RateCharacter/RateCharacter';
import { usePostFeedbackMutation } from '@modules/feedback/api/feedbackApi';
import { LoaderModal } from '@shared/components';

interface MyFeedBackProps {
    openModal: boolean;
    closeModal: () => void;
    refetch: () => void;
    setSuccess: () => void;
    setError: () => void;
}

export const MyFeedBack: FC<MyFeedBackProps> = ({
    openModal,
    closeModal,
    refetch,
    setSuccess,
    setError,
}) => {
    const [post, { isLoading }] = usePostFeedbackMutation();
    const [canSend, setCanSend] = useState(false);
    const [myRate, setMyRate] = useState(0);
    const [myFeedBack, setMyFeedBack] = useState('');
    useEffect(() => {
        if (myRate > 0) {
            setCanSend(true);
        } else {
            setCanSend(false);
        }
    }, [myRate, myFeedBack]);
    return (
        <>
            {isLoading ? (
                <LoaderModal />
            ) : (
                <Modal
                    maskStyle={{ backdropFilter: 'blur(12px' }}
                    className={styles.modal}
                    open={openModal}
                    title={'Ваш отзыв'}
                    centered={true}
                    closable={true}
                    destroyOnClose={true}
                    footer={
                        <Button
                            disabled={!canSend}
                            className={styles.postBtn}
                            data-test-id='new-review-submit-button'
                            type='primary'
                            onClick={() => {
                                closeModal();

                                post({ rating: myRate, message: myFeedBack })
                                    .unwrap()
                                    .then(() => {
                                        refetch();
                                        setSuccess();
                                        setMyRate(0);
                                        setMyFeedBack('');
                                    })
                                    .catch(() => {
                                        setError();
                                    });
                            }}
                        >
                            Опубликовать
                        </Button>
                    }
                    maskClosable
                    onCancel={closeModal}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <Rate
                        value={myRate}
                        onChange={setMyRate}
                        allowClear={true}
                        character={(props) => RateCharacter({ index: props.index, rating: myRate })}
                        style={{ marginBottom: '16px' }}
                    />
                    <Input.TextArea
                        autoSize={true}
                        value={myFeedBack}
                        className={styles.textArea}
                        placeholder='Расскажите, почему Вам понравилось наше приложение.'
                        onChange={(e) => {
                            setMyFeedBack(e.target.value);
                        }}
                    />
                </Modal>
            )}
        </>
    );
};
