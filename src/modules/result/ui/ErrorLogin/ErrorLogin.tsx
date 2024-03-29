import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

type ErrorLoginProps = {
    className?: string;
};

export const ErrorLogin: FC<ErrorLoginProps> = () => {
    return (
        <ResultForm
            status={'warning'}
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз.'
            buttonText='Повторить'
            redirect={Paths.AUTH}
            id='login-retry-button'
        />
    );
};
