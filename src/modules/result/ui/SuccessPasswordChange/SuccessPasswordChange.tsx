import { FC } from 'react';
import { Paths } from '@shared/types/common';
import { ResultForm } from '@shared/components';

export const SuccesPasswordChange: FC = () => {
    return (
        <ResultForm
            status={'success'}
            title='Пароль успешно изменен'
            subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль.'
            buttonText='Вход'
            redirect={Paths.AUTH}
            id='change-entry-button'
        />
    );
};
