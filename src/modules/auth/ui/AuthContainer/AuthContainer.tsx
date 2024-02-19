import clx from 'classnames';
import styles from './AuthContainer.module.css';
import { Tabs } from 'antd';
import Logo from '@shared/assets/icons/logo-full.svg?react';
import { FC } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { Link, useLocation } from 'react-router-dom';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';

export const AuthContainer: FC = () => {
    const location = useLocation();

    return (
        <section className={clx(styles.AuthContainer)}>
            <Logo width={'309px'} height={'76px'} />

            <Tabs
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
