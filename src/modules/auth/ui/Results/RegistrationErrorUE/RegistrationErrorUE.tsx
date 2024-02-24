import { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface RegistrationErrorUEProps {
    className?: string;
}

export const RegistrationErrorUE: FC<RegistrationErrorUEProps> = () => {
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
