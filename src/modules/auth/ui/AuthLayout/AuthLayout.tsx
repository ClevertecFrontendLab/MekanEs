import { FC } from 'react';
import clx from 'classnames';
import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';
import bgImage from '@shared/assets/images/main_page.png';
import { Card } from 'antd';

export const AuthLayout: FC = () => {
    return (
        <div className={clx(styles.overlay)}>
            <div className={styles.bg} style={{ backgroundImage: `url(${bgImage})` }}></div>
            <Card className={clx(styles.content)}>
                <Outlet />
            </Card>
        </div>
    );
};
