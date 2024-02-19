import { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface RegistrationErrorProps {
    className?: string;
}

export const RegistrationError: FC<RegistrationErrorProps> = () => {
    return (
        <ResultForm
            icon={
                <CloseCircleFilled
                    style={{
                        color: 'var(--character-light-error)',
                        fontSize: '100px',
                    }}
                />
            }
            title='Данные не сохранились'
            subTitle='Что-то пошлло не так и ваша регистрация не завершилась. Попробуйте еще раз.'
            buttonText='Повторить'
            redirect={Paths.REGISTRATION}
            id='registration-retry-button'
            redirectOpt={{ state: { action: 'register' } }}
        />
    );
};
