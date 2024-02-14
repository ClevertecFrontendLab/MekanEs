import { FC } from 'react';
import styles from './Header.module.css';
import { Breadcrumb, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
interface AppHeaderProps {
    mobile: boolean;
}
export const AppHeader: FC<AppHeaderProps> = ({ mobile }) => {
    return (
        <div className={styles.Header}>
            <Breadcrumb style={mobile ? { display: 'none' } : { lineHeight: '130%' }}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
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
                        <Typography.Text style={{ wordBreak: 'normal' }}>Настройки</Typography.Text>
                    )}
                </Button>
            </div>
        </div>
    );
};
