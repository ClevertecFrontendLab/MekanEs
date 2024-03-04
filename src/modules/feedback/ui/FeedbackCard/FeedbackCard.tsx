import { FC } from 'react';
import styles from './FeedbackCard.module.css';
import { Avatar, Card, Rate, Typography } from 'antd';
import { ServerFeedback } from '@shared/types/feedback';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { RateCharacter } from '@shared/components/RateCharacter/RateCharacter';

interface FeedbackCardProps {
    feedback: ServerFeedback;
}

export const FeedbackCard: FC<FeedbackCardProps> = ({ feedback }) => {
    return (
        <Card className={styles.FeedbackCard}>
            <Card.Meta
                className={styles.meta}
                avatar={
                    feedback.imageSrc ? (
                        <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />
                    ) : (
                        <Avatar
                            size={'large'}
                            icon={<UserOutlined style={{ color: '#000' }} />}
                            style={{ background: '#F5F5F5' }}
                        />
                    )
                }
                title={
                    feedback.fullName ? (
                        <>
                            <Typography.Text className={styles.metaText}>
                                {feedback.fullName.split(' ')[0]}
                            </Typography.Text>
                            <Typography.Text className={styles.metaText}>
                                {feedback.fullName.split(' ')[1]}
                            </Typography.Text>
                        </>
                    ) : (
                        <Typography.Text className={styles.metaText}>Пользователь</Typography.Text>
                    )
                }
            />
            <div>
                <div className={styles.rateContainer}>
                    <Rate
                        disabled
                        defaultValue={Math.round(feedback.rating)}
                        character={(props) =>
                            RateCharacter({ index: props.index, rating: feedback.rating })
                        }
                    />

                    <Typography.Text>
                        {feedback.createdAt.slice(0, 10).split('-').reverse().join('.')}
                    </Typography.Text>
                </div>
                <Typography.Text
                    style={{
                        wordBreak: 'break-word',
                        color: 'var(--character-light-secondary-45)',
                    }}
                >
                    {feedback.message}
                </Typography.Text>
            </div>
        </Card>
    );
};
