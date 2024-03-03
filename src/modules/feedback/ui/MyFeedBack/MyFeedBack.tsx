import { FC, useEffect, useState } from 'react';
import clx from 'classnames';
import styles from './MyFeedBack.module.css';
import { Button, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
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
        <div className={clx(styles.MyFeedBack)}>
            <Modal
                open={openModal}
                title={'Ваш отзыв'}
                centered={true}
                closable={true}
                destroyOnClose={true}
                footer={
                    <Button
                        disabled={!canSend}
                        data-test-id='new-review-submit-button'
                        onClick={() => {
                            post({ rating: myRate, message: myFeedBack })
                                .unwrap()
                                .then(() => {
                                    closeModal();
                                    refetch();
                                    setSuccess();
                                })
                                .catch((e) => {
                                    closeModal();
                                    console.log(e);
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
                {isLoading && <LoaderModal />}
                <Rate
                    value={myRate}
                    onChange={setMyRate}
                    allowClear={true}
                    character={(props) => RateCharacter({ index: props.index, rating: myRate })}
                />
                <TextArea
                    value={myFeedBack}
                    onChange={(e) => {
                        setMyFeedBack(e.target.value);
                    }}
                />
            </Modal>
        </div>
    );
};
