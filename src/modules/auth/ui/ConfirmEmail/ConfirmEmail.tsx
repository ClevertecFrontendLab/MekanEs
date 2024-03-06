import { FC, useState } from 'react';
import styles from './ConfirmEmail.module.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '@modules/auth/authApi/authApi';
import VerificationInput from 'react-verification-input';
import clx from 'classnames';
import { Typography } from 'antd';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';
import { LoaderModal, ResultForm } from '@shared/components';

export const ConfirmEmail: FC = () => {
    const location = useLocation();
    const nav = useNavigate();
    const [confirmEmail, { isLoading, error }] = useConfirmEmailMutation();
    const [inputValue, setInputValue] = useState('');
    const confirm = async (code: string) => {
        confirmEmail({ email: location.state.email, code })
            .unwrap()
            .then(() => {
                nav(Paths.AUTH_CHANGE_PASSWORD, defNavOption);
            })
            .catch(() => {
                setInputValue('');
            });
    };

    const handleFill = (code?: string) => {
        if (code) {
            confirm(code);
        }
    };

    if (location?.state?.from !== defNavOption.state.from) {
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <ResultForm
            status={error ? 'warning' : 'info'}
            title={'Неверный код. Введите код для восстановления аккаунта'}
            subTitle={`Мы отправили вам на e-mail ${(
                <b>{location.state.email}</b>
            )} шестизначный код.Введите его в поле ниже.`}
            verification={
                <div className={styles.varificationContainer}>
                    <VerificationInput
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        classNames={{
                            container: styles.container,
                            character: error
                                ? clx(styles.character, styles.bordered)
                                : styles.character,
                            characterInactive: styles.inactive,
                            characterSelected: styles.selected,
                            characterFilled: styles.filled,
                        }}
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}
                        onComplete={handleFill}
                    />
                    {isLoading && <LoaderModal />}
                    <Typography.Text style={{ color: 'var(--character-light-secondary-45)' }}>
                        Не пришло письмо? Проверьте папку Спам.
                    </Typography.Text>
                </div>
            }
        />
    );
};
