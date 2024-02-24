import { FC } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface SuccesPasswordChangeProps {
    className?: string;
}

export const SuccesPasswordChange: FC<SuccesPasswordChangeProps> = () => {
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
