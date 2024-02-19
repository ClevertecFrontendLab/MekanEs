import { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';

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
            onClick={() => {
                console.log('click');
            }}
        />
    );
};
