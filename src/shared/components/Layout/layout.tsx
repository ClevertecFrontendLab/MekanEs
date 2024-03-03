import { FC, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Layout } from 'antd';

import styles from './Layout.module.css';
import { AppFooter, AppHeader, LoaderModal, Sidebar } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { push } from 'redux-first-history';
import { authActions } from '@modules/auth/model/authSlice';
import { LS_AuthKey } from '@shared/constants/constants';

const { Header, Content } = Layout;
export const AppLayout: FC = () => {
    const [search] = useSearchParams();
    const [mobile, setMobile] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const accessToken = search.get('accessToken');
        if (accessToken) {
            dispatch(authActions.setAuthToken(accessToken));
            localStorage.setItem(LS_AuthKey, accessToken);
        }
        if (location.pathname === '/') {
            dispatch(push('/main'));
        }
        if (location.pathname.slice(-1) === '/') {
            dispatch(push(location.pathname.slice(0, -1)));
        }
    }, [location.pathname, dispatch, search]);
    return (
        <div className={styles.bg}>
            <Layout className={styles.Layout} data-test-id={'app'}>
                <Sidebar mobile={mobile} setMobile={setMobile} />

                <Layout style={{ background: 'none' }} className={styles.page}>
                    <Header style={{ height: 'auto', padding: '0', width: '100%' }}>
                        <AppHeader mobile={mobile} />
                    </Header>
                    <Suspense fallback={<LoaderModal />}>
                        <Content className={styles.content}>
                            <Outlet />
                        </Content>
                    </Suspense>
                    {location.pathname === '/main' && <AppFooter />}
                </Layout>
            </Layout>{' '}
        </div>
    );
};
