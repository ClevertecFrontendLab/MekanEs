import clx from 'classnames';
import styles from './AuthContainer.module.css';
import CStyles from '../CommonStyles/CommonStyles.module.css';
import { Card, Tabs } from 'antd';
import Logo from '@shared/assets/icons/form-logo.svg?react';
import { FC, useEffect, useState } from 'react';
import { AuthFormLazy as AuthForm } from '../AuthForm/AuthForm.async';
import { Link, useLocation } from 'react-router-dom';
import { RegistrationFormLazy as RegistrationForm } from '../RegistrationForm/RegistrationForm.async';
import { Paths } from '@shared/types/common';

export const AuthContainer: FC = () => {
    const location = useLocation();
    const [reg, setReg] = useState(true);

    useEffect(() => {
        if (location.pathname === Paths.REGISTRATION) {
            setReg(true);
        } else {
            setReg(false);
        }
    }, [location.pathname]);
    return (
        <Card
            className={clx(
                CStyles.content,
                reg ? styles.regCard : styles.authCard,
                styles.formCard,
            )}
        >
            <section className={clx(styles.AuthContainer, { [styles.margin]: reg })}>
                <Logo className={styles.logo} width={'309px'} height={'76px'} />

                <Tabs
                    tabBarStyle={{
                        width: '100%',
                        marginBottom: '0',
                        minHeight: '46px',
                    }}
                    size='middle'
                    className={clx(styles.tabs, { [styles.gap]: reg })}
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
        </Card>
    );
};
