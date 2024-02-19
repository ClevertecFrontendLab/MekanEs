import { FC } from 'react';
import { ResultForm } from '../ResultForm/ResultForm';
import { CloseCircleFilled } from '@ant-design/icons';

import { Paths } from '@shared/types/common';

interface ErrorCheckEmailNoEmailProps {
    className?: string;
}

export const ErrorCheckEmailNoEmail: FC<ErrorCheckEmailNoEmailProps> = () => {
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
            title='Такой e-mail не зарегистрирован'
            subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
            buttonText='Попробовать снова'
            redirect={Paths.AUTH}
            redirectOpt={{ state: { clear: true } }}
            id='check-retry-button'
        />
    );
};
