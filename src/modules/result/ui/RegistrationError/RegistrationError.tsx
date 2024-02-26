import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

interface RegistrationErrorProps {
    className?: string;
}

export const RegistrationError: FC<RegistrationErrorProps> = () => {
    return (
        <ResultForm
            status={'error'}
            title='Данные не сохранились'
            subTitle='Что-то пошлло не так и ваша регистрация не завершилась. Попробуйте еще раз.'
            buttonText='Повторить'
            redirect={Paths.REGISTRATION}
            id='registration-retry-button'
            redirectOpt={{ state: { action: 'register' } }}
        />
    );
};
