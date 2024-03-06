import { FeedbackCard, FeedbackModals, useGetFeedbackQuery } from '@modules/feedback';
import { Button, Card, Typography } from 'antd';
import clx from 'classnames';
import { FC, useState } from 'react';
import styles from './Feedback.module.css';

export const Feedback: FC = () => {
    const [opened, setOpened] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [itemsCount, setItemsCount] = useState(30);
    const { data: feedbacks, isFetching, refetch, error } = useGetFeedbackQuery();

    const activeFB = feedbacks && (opened ? feedbacks.slice(0, itemsCount) : feedbacks.slice(0, 4));

    return (
        <>
            <FeedbackModals
                error={error}
                isFetching={isFetching}
                refetch={refetch}
                writeFBModal={openModal}
                openFB={() => {
                    setOpenModal(true);
                }}
                closeFB={() => {
                    setOpenModal(false);
                }}
            />
            <div
                className={clx(styles.content, {
                    [styles.centered]: activeFB && activeFB.length === 0,
                })}
            >
                {activeFB && activeFB.length > 0 ? (
                    <>
                        <div className={styles.feedbacks}>
                            {activeFB.map((el) => (
                                <FeedbackCard
                                    key={el.id || new Date().getMilliseconds()}
                                    feedback={el}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <Card className={styles.card}>
                        <Typography.Title
                            style={{ color: 'var(--primary-light-9)' }}
                            level={3}
                            className={styles.title}
                        >
                            Оставьте свой отзыв первым
                        </Typography.Title>
                        <Typography.Text
                            className={styles.text}
                            style={{ color: 'var(--character-light-secondary-45)' }}
                        >
                            Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                            <br />
                            Поделитесь своим мнением и опытом с другими пользователями,
                            <br /> и помогите им сделать правильный выбор.
                        </Typography.Text>
                    </Card>
                )}
                <div
                    className={clx(
                        { [styles.buttonContainer]: activeFB && activeFB?.length > 0 },
                        { [styles.altBtnContainer]: activeFB && activeFB.length === 0 },
                    )}
                >
                    <Button
                        className={clx(styles.btn)}
                        type='primary'
                        style={{ backgroundColor: 'var(--primary-light-6)' }}
                        data-test-id='write-review'
                        onClick={() => setOpenModal((prev) => !prev)}
                    >
                        Написать отзыв
                    </Button>
                    {activeFB && activeFB.length > 0 ? (
                        <Button
                            style={{ color: 'var(--primary-light-6)' }}
                            className={styles.btn}
                            type='link'
                            data-test-id='all-reviews-button'
                            onClick={() => {
                                setOpened((prev) => !prev);
                                setItemsCount(20);
                            }}
                        >
                            {opened ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>
                    ) : null}
                </div>
            </div>
        </>
    );
};
