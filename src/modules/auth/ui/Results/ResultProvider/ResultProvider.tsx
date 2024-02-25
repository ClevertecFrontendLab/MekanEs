import { FC, useEffect } from 'react';
import clx from 'classnames';
import styles from './ResultProvider.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import bgImage from '@shared/assets/images/auth-bg.png';

import { Paths } from '@shared/types/common';
import { useAppDispatch } from '@shared/hooks';
import { push } from 'redux-first-history';
import { defNavOption } from '@shared/constants/constants';

const ResultProvider: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (location.state.from !== defNavOption.state.from) {
            dispatch(push(Paths.AUTH));
        }
    }, [dispatch, location.pathname, location.state.from]);
    return (
        <div style={{ background: `url(${bgImage}) no-repeat`, backgroundSize: 'cover' }}>
            <div className={clx(styles.overlay)}>
                <Outlet />
            </div>
        </div>
    );
};
export default ResultProvider;
