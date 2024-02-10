import React from 'react';
import styles from './main-page.module.css';
import { Button, Typography } from 'antd';

import clx from 'classnames';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

export const MainPage: React.FC = () => {
    return (
        <div className={styles['main-page']}>
            <div className={clx(styles.textContainer, styles.large)}>
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
            </div>
            <div className={clx(styles.textContainer, styles.large)}>
                <Typography.Title
                    level={4}
                    style={{ fontWeight: '500', marginBottom: '0', lineHeight: '1.31' }}
                >
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </Typography.Title>
            </div>
            <div className={styles.containers}>
                <div className={clx(styles.textContainer, styles.small)}>
                    <div className={styles.block}>
                        <Typography.Title level={5} style={{ fontWeight: '400' }}>
                            Расписать тренировки
                        </Typography.Title>
                    </div>
                    <div className={clx(styles.block, styles.center)}>
                        <Button
                            type='text'
                            icon={<HeartFilled style={{ color: 'var(--primary-light-6)' }} />}
                            className='buttonWithIcon'
                        >
                            Тренировки
                        </Button>
                    </div>
                </div>
                <div className={clx(styles.textContainer, styles.small)}>
                    <div className={styles.block}>
                        <Typography.Title level={5} style={{ fontWeight: '400' }}>
                            Назначить календарь
                        </Typography.Title>
                    </div>
                    <div className={clx(styles.block, styles.center)}>
                        <Button
                            type='text'
                            icon={
                                <CalendarTwoTone
                                    twoToneColor={'#2f54eb'}
                                    style={{ color: 'var(--primary-light-6)' }}
                                />
                            }
                            className='buttonWithIcon'
                        >
                            Календарь
                        </Button>
                    </div>
                </div>
                <div className={clx(styles.textContainer, styles.small)}>
                    <div className={styles.block}>
                        <Typography.Title level={5} style={{ fontWeight: '400' }}>
                            Заполнить провиль
                        </Typography.Title>
                    </div>

                    <div className={clx(styles.block, styles.center)}>
                        <Button
                            type='text'
                            icon={<IdcardOutlined style={{ color: 'var(--primary-light-6)' }} />}
                            className='buttonWithIcon'
                        >
                            Профиль
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
