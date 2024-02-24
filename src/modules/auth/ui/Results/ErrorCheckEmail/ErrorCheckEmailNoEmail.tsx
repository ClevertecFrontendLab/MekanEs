import { FC } from 'react';
import { ResultForm } from '../ResultForm/ResultForm';

import { Paths } from '@shared/types/common';

interface ErrorCheckEmailNoEmailProps {
    className?: string;
}

export const ErrorCheckEmailNoEmail: FC<ErrorCheckEmailNoEmailProps> = () => {
    return (
        <ResultForm
            status={'error'}
            title='Такой e-mail не зарегистрирован'
            subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
            buttonText='Попробовать снова'
            redirect={Paths.AUTH}
            redirectOpt={{ state: { clear: true } }}
            buttonWidth='74px'
            id='check-retry-button'
        />
    );
};
