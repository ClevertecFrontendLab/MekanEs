import { FC } from 'react';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface ErrorCheckEmailProps {
    className?: string;
}

export const ErrorCheckEmail: FC<ErrorCheckEmailProps> = () => {
    return (
        <ResultForm
            status={500}
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму еще раз.'
            buttonText='Назад'
            id='check-back-button'
            redirect={Paths.AUTH}
            buttonWidth='74px'
            redirectOpt={{ state: { action: 'checkMail' } }}
        />
    );
};
