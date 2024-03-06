import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';

export const ErrorCheckEmailNoEmail: FC = () => {
    return (
        <ResultForm
            status={'error'}
            title='Такой e-mail не зарегистрирован'
            subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
            buttonText='Попробовать снова'
            redirect={Paths.AUTH}
            redirectOpt={{ state: { clear: true } }}
            id='check-retry-button'
        />
    );
};
