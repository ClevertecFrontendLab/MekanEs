import { FC, useState } from 'react';
import styles from './ConfirmEmail.module.css';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '@modules/auth/authApi/authApi';
import VerificationInput from 'react-verification-input';
import clx from 'classnames';
import { Typography } from 'antd';
interface ConfirmEmailProps {
    className?: string;
}

export const ConfirmEmail: FC<ConfirmEmailProps> = () => {
    const { state }: { state: { email: string } } = useLocation();
    const [error, setError] = useState<null | unknown>(null);
    const navigate = useNavigate();
    const [confirmEmail, { isLoading, error: fetchErr }] = useConfirmEmailMutation();

    //Clear
    console.log(isLoading);
    //Clear
    const confirm = async (code: string) => {
        try {
            const resp = await confirmEmail({ email: state.email, code });
            if ('data' in resp) {
                navigate('/auth/change-password');
                console.log('succes', fetchErr, error);
            } else {
                throw Error();
            }
        } catch (e) {
            setError(e);
        }
    };

    const handleFill = (code?: string) => {
        if (code) {
            confirm(code);
        }
    };
    return (
        <div className={clx(styles.ConfirmEmail)}>
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
                <b>{state.email}</b> шестизначный код. Введите его в поле ниже.
            </Typography.Text>

            <VerificationInput
                classNames={{
                    character: error ? clx('character', styles.bordered) : 'character',
                }}
                onComplete={handleFill}
            />
            <Typography.Text>Не пришло письмо? Проверьте папку Спам. </Typography.Text>
        </div>
    );
};
