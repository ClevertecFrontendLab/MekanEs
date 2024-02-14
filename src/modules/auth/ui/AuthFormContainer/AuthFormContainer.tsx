import clx from 'classnames';
import styles from './AuthForm.module.css';
import { Tabs } from 'antd';
import Logo from '@shared/assets/icons/logo-full.svg?react';
import { FC } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { Link, useLocation } from 'react-router-dom';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';

// interface AuthFormContainerProps {}

export const AuthFormContainer: FC = () => {
    const location = useLocation();

    return (
        <div className={clx(styles.AuthForm)}>
            <section>
                <div>
                    <Logo />
                    <div>
                        <Tabs
                            activeKey={location.pathname.split('/').slice(-1)[0]}
                            items={[
                                {
                                    label: <Link to='/auth'>Вход</Link>,
                                    key: 'auth',
                                    active: location.pathname === '/auth',
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
                    </div>
                </div>
            </section>
        </div>
    );
};
