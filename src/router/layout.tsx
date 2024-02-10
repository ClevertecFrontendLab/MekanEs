import { FC, Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import styles from './Layout.module.css';
import { AppFooter, AppHeader, Sidebar } from '@components/index';

const { Header, Content } = Layout;
export const AppLayout: FC = () => {
    const [mobile, setMobile] = useState(false);
    return (
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
        </Layout>
    );
};
