import { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';

interface ErrorChangePasswordProps {
    className?: string;
}

export const ErrorChangePassword: FC<ErrorChangePasswordProps> = () => {
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
            subTitle='Что-то пошлло не так. Попробуйте еще раз.'
            buttonText='Повторить'
            onClick={() => {
                console.log('click');
            }}
        />
    );
};
