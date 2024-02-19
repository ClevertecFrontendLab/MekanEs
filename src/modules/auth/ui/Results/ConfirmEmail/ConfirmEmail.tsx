import { FC, useState } from 'react';
import styles from './ConfirmEmail.module.css';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '@modules/auth/authApi/authApi';
import VerificationInput from 'react-verification-input';
import clx from 'classnames';
import { Typography } from 'antd';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';
import { LoaderModal } from '@shared/components';
interface ConfirmEmailProps {
    className?: string;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = () => {
    const location = useLocation();
    const nav = useNavigate();
    const [error, setError] = useState<null | unknown>(null);
    const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
    const [inputValue, setInputValue] = useState('');
    const confirm = async (code: string) => {
        try {
            const resp = await confirmEmail({ email: location.state.email, code });
            if ('data' in resp) {
                nav(Paths.AUTH_CHANGE_PASSWORD, defNavOption);
            } else {
                throw Error();
            }
        } catch (e) {
            setInputValue('');
            setError(e);
        }
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
        <div className={clx(styles.ConfirmEmail)}>
            {isLoading && <LoaderModal />}
            {error ? (
                <CloseCircleFilled
                    style={{
                        color: 'var(--character-light-error)',
                        fontSize: '100px',
                    }}
                />
            ) : (
                <ExclamationCircleFilled
                    style={{
                        color: 'var(--blue-dark-5)',
                        fontSize: '100px',
                    }}
                />
            )}
            <Typography.Title>
                Неверный код. Введите код для восстановления аккаунта
            </Typography.Title>
            <Typography.Text>
                Произошла ошибка, попробуйте отправить форму еще раз. Мы отправили вам на e-mail{' '}
                <b>{location.state.email}</b> шестизначный код. Введите его в поле ниже.
            </Typography.Text>
            <VerificationInput
                inputProps={{ 'data-test-id': 'verification-input' }}
                classNames={{
                    character: error ? clx('character', styles.bordered) : 'character',
                }}
                value={inputValue}
                onChange={(value) => setInputValue(value)}
                onComplete={handleFill}
            />
            <Typography.Text>Не пришло письмо? Проверьте папку Спам. </Typography.Text>
        </div>
    );
};
