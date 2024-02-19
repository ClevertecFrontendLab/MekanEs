import { FC, useEffect } from 'react';
import clx from 'classnames';
import styles from './AuthLayout.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import bgImage from '@shared/assets/images/main_page.png';
import { Card } from 'antd';
import { useAppDispatch } from '@shared/hooks';
import { push } from 'redux-first-history';

export const AuthLayout: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.slice(-1) === '/') {
            dispatch(push(location.pathname.slice(0, -1)));
        }
    }, [location.pathname, dispatch]);
    return (
        <div className={clx(styles.overlay)}>
            <div className={styles.bg} style={{ backgroundImage: `url(${bgImage})` }}></div>
            <Card className={clx(styles.content)}>
                <Outlet />
            </Card>
        </div>
    );
};
