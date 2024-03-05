import { FC } from 'react';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';

export const ErrorChangePassword: FC = () => {
    return (
        <ResultForm
            status={'error'}
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте еще раз.'
            buttonText='Повторить'
            id='change-retry-button'
            redirect={Paths.AUTH_CHANGE_PASSWORD}
            redirectOpt={{ state: { action: 'changeAgain', ...defNavOption.state } }}
        />
    );
};
