import { FC } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';

interface ErrorLoginProps {
    className?: string;
}

export const ErrorLogin: FC<ErrorLoginProps> = () => {
    return (
        <ResultForm
            icon={
                <WarningFilled
                    style={{
                        color: 'var(--character-light-warning)',
                        fontSize: '100px',
                    }}
                />
            }
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз.'
            buttonText='Повторить'
            redirect={Paths.AUTH}
            id='login-retry-button'
        />
    );
};
