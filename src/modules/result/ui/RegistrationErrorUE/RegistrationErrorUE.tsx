import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

export const RegistrationErrorUE: FC = () => {
    return (
        <ResultForm
            status={'error'}
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            buttonText='Назад к регистрации'
            redirect={Paths.REGISTRATION}
            redirectOpt={{ state: { clear: true } }}
            id='registration-back-button'
        />
    );
};
