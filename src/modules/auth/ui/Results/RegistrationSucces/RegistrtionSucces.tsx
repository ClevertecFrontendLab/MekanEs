import { FC } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface RegistrationSuccesProps {
    className?: string;
}

export const RegistrationSucces: FC<RegistrationSuccesProps> = () => {
    return (
        <ResultForm
            icon={
                <CheckCircleFilled
                    style={{
                        color: 'var(--character-light-success)',
                        fontSize: '100px',
                    }}
                />
            }
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            buttonText='Войти'
            redirect={Paths.AUTH}
            id='registration-enter-button'
        />
    );
};
