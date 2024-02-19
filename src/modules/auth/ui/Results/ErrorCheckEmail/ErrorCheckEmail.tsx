import { FC } from 'react';
import { ResultForm } from '../ResultForm/ResultForm';
import { CloseCircleFilled } from '@ant-design/icons';

interface ErrorCheckEmailProps {
    className?: string;
}

export const ErrorCheckEmail: FC<ErrorCheckEmailProps> = () => {
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
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму еще раз.'
            buttonText='Назад'
            onClick={() => {
                console.log('click');
            }}
        />
    );
};
