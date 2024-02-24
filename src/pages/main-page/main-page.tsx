import React from 'react';
import styles from './main-page.module.css';
import { Typography } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { ActionCard, TextContainer } from '@shared/components';

const MainPage: React.FC = () => {
    return (
        <div className={styles['main-page']}>
            <TextContainer className={styles.large}>
                <Typography.Text
                    style={{
                        color: 'var(--primary-light-9)',
                        fontSize: '16px',
                    }}
                >
                    С CleverFit ты сможешь: <br />
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                    <br />— отслеживать свои достижения в разделе статистики, сравнивая свои
                    результаты с нормами и рекордами;
                    <br />— создавать свой профиль, где ты можешь загружать свои фото, видео и
                    отзывы о тренировках;
                    <br />— выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям и советам профессиональных тренеров.
                </Typography.Text>
            </TextContainer>

            <TextContainer className={styles.large}>
                <Typography.Title level={4} style={{ fontWeight: '500', marginBottom: '0' }}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </Typography.Title>
            </TextContainer>

            <div className={styles.containers}>
                <ActionCard
                    title='Расписать тренировки'
                    buttonText='Тренировки'
                    icon={<HeartFilled style={{ color: 'var(--primary-light-6)' }} />}
                />
                <ActionCard
                    title='Назначить календарь'
                    buttonText='Календарь'
                    icon={<CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />}
                />
                <ActionCard
                    title='Заполнить профиль'
                    buttonText='Профиль'
                    icon={<IdcardOutlined style={{ color: 'var(--primary-light-6)' }} />}
                />
            </div>
        </div>
    );
};
export default MainPage;
