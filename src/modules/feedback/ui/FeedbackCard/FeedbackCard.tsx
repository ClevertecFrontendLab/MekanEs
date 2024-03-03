import { FC } from 'react';
import styles from './FeedbackCard.module.css';
import { Avatar, Card, Rate } from 'antd';
import { ServerFeedback } from '@shared/types/feedback';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { RateCharacter } from '@shared/components/RateCharacter/RateCharacter';

interface FeedbackCardProps {
    feedback: ServerFeedback;
}

export const FeedbackCard: FC<FeedbackCardProps> = ({ feedback }) => {
    return (
        <Card bodyStyle={{ display: 'flex', padding: '10px' }}>
            <Card.Meta
                style={{ display: 'flex', flexDirection: 'column', textWrap: 'wrap', width: '20%' }}
                avatar={
                    feedback.imageSrc ? (
                        <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />
                    ) : (
                        <UserOutlined />
                    )
                }
                title={feedback.fullName || 'Пользователь'}
            />
            <div>
                <p style={{ wordBreak: 'break-word' }}>{feedback.message}</p>
                <div>
                    <Rate
                        disabled
                        defaultValue={Math.round(feedback.rating)}
                        character={(props) =>
                            RateCharacter({ index: props.index, rating: feedback.rating })
                        }
                    />

                    {feedback.createdAt.slice(0, 10).split('-').reverse().join('.')}
                </div>
            </div>
        </Card>
    );
};
