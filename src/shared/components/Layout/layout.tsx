import { FC, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import styles from './Layout.module.css';
import { AppFooter, AppHeader, Sidebar } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { push } from 'redux-first-history';

const { Header, Content } = Layout;
export const AppLayout: FC = () => {
    const [mobile, setMobile] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(push('/main'));
        }
        if (location.pathname.slice(-1) === '/') {
            dispatch(push(location.pathname.slice(0, -1)));
        }
    }, [location.pathname, dispatch]);
    return (
        <div className={styles.bg}>
            <Layout className={styles.Layout} data-test-id={'app'}>
                <Sidebar mobile={mobile} setMobile={setMobile} />

                <Layout style={{ background: 'none' }} className={styles.page}>
                    <Header style={{ height: 'auto', padding: '0', width: '100%' }}>
                        <AppHeader mobile={mobile} />
                    </Header>
                    <Suspense fallback={'Loading'}>
                        <Content className={styles.content}>
                            <Outlet />
                        </Content>
                    </Suspense>
                    <AppFooter />
                </Layout>
            </Layout>{' '}
        </div>
    );
};
