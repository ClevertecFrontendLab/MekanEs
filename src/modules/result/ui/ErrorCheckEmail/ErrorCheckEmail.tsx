import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

type ErrorCheckEmailProps = {
    className?: string;
};

export const ErrorCheckEmail: FC<ErrorCheckEmailProps> = () => {
    return (
        <ResultForm
            addPadding={true}
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
