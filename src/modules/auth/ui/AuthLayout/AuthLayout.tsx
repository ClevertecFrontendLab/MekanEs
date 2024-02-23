import { FC, useEffect, useState } from 'react';
import clx from 'classnames';
import styles from './AuthLayout.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import bgImage from '@shared/assets/images/main_page.png';
import { Card } from 'antd';
import { useAppDispatch } from '@shared/hooks';
import { push } from 'redux-first-history';
import { Paths } from '@shared/types/common';

export const AuthLayout: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [margin, setMargin] = useState('');
    useEffect(() => {
        if (location.pathname.slice(-1) === '/') {
            dispatch(push(location.pathname.slice(0, -1)));
        }
        if (location.pathname === Paths.REGISTRATION) {
            setMargin(styles.margin);
        } else {
            setMargin('');
        }
    }, [location.pathname, dispatch]);
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }}>
            <div className={clx(styles.overlay)}>
                <Card className={clx(styles.content, margin)}>
                    <Outlet />
                </Card>
            </div>
        </div>
    );
};
