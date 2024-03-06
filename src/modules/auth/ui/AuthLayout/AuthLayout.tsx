import { FC, useEffect } from 'react';
import clx from 'classnames';
import CStyles from '../CommonStyles/CommonStyles.module.css';

import { Outlet, useLocation } from 'react-router-dom';
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
        <div className={CStyles.bg}>
            <div className={clx(CStyles.overlay)}>
                <Outlet />
            </div>
        </div>
    );
};
