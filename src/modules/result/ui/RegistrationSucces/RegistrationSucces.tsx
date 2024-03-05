import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

export const RegistrationSucces: FC = () => {
    return (
        <ResultForm
            status={'success'}
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            buttonText='Войти'
            redirect={Paths.AUTH}
            id='registration-enter-button'
        />
    );
};
