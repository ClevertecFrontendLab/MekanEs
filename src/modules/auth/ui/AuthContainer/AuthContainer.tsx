import clx from 'classnames';
import styles from './AuthContainer.module.css';
import { Tabs } from 'antd';
import Logo from '@shared/assets/icons/form-logo.svg?react';
import { FC, useEffect, useState } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { Link, useLocation } from 'react-router-dom';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { Paths } from '@shared/types/common';

export const AuthContainer: FC = () => {
    const location = useLocation();
    const [gap, setGap] = useState('');
    const [margin, setMargin] = useState('');
    useEffect(() => {
        if (location.pathname === Paths.REGISTRATION) {
            setGap(styles.gap);
            setMargin(styles.margin);
        } else {
            setGap('');
            setMargin('');
        }
    }, [location.pathname]);
    return (
        <section className={clx(styles.AuthContainer, margin)}>
            <Logo className={styles.logo} width={'309px'} height={'76px'} />

            <Tabs
                tabBarStyle={{
                    width: '100%',
                    marginBottom: '0',
                    minHeight: '46px',
                }}
                size='middle'
                className={clx(styles.tabs, gap)}
                centered
                tabBarExtraContent={null}
                activeKey={location.pathname.split('/').slice(-1)[0]}
                items={[
                    {
                        label: <Link to='/auth'>Вход</Link>,
                        key: 'auth',
                        active: location.pathname === '/auth' || true,
                        children: <AuthForm />,
                    },
                    {
                        label: <Link to='/auth/registration'>Регистрация</Link>,
                        key: 'registration',
                        active: location.pathname !== '/auth',
                        children: <RegistrationForm />,
                    },
                ]}
            />
        </section>
    );
};
