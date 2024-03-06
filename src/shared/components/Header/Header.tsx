import { FC } from 'react';
import styles from './Header.module.css';
import { Breadcrumb, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { Paths } from '@shared/types/common';
type AppHeaderProps = {
    mobile: boolean;
};
export const AppHeader: FC<AppHeaderProps> = ({ mobile }) => {
    const location = useLocation();
    return (
        <div className={styles.Header}>
            <Breadcrumb
                style={
                    mobile
                        ? location.pathname === '/feedbacks'
                            ? {}
                            : { display: 'none' }
                        : { lineHeight: '130%' }
                }
            >
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                {location.pathname === Paths.FEEDBACK && (
                    <Breadcrumb.Item>Отзывы пользователей</Breadcrumb.Item>
                )}
            </Breadcrumb>
            {location.pathname === '/main' && (
                <div className={styles.content}>
                    <Typography.Title level={1} className={styles.title}>
                        Приветствуем тебя {mobile && <br />} в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </Typography.Title>

                    <Button
                        type={mobile ? 'default' : 'text'}
                        shape='circle'
                        icon={<SettingOutlined />}
                        className={styles.settingsBtn}
                    >
                        {mobile ? null : (
                            <Typography.Text style={{ wordBreak: 'normal' }}>
                                Настройки
                            </Typography.Text>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};
