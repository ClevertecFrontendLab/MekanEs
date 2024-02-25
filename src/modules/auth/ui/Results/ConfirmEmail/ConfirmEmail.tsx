import { FC, useState } from 'react';
import styles from './ConfirmEmail.module.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useConfirmEmailMutation } from '@modules/auth/authApi/authApi';
import VerificationInput from 'react-verification-input';
import clx from 'classnames';
import { Typography } from 'antd';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';
import { LoaderModal } from '@shared/components';
import { ResultForm } from '../ResultForm/ResultForm';
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
                console.log(resp, 'succes');
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
