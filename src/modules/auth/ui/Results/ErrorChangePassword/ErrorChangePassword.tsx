import { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { ResultForm } from '../ResultForm/ResultForm';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';

interface ErrorChangePasswordProps {
    className?: string;
}

export const ErrorChangePassword: FC<ErrorChangePasswordProps> = () => {
    return (
        <ResultForm
            icon={
                <CloseCircleFilled
                    style={{
                        color: '#FF4D4F',
                        fontSize: '100px',
                        width: '81px',
                    }}
                />
            }
            title='Данные не сохранились'
            subTitle='Что-то пошлло не так. Попробуйте еще раз.'
            buttonText='Повторить'
            id='change-retry-button'
            redirect={Paths.AUTH_CHANGE_PASSWORD}
            redirectOpt={{ state: { action: 'changeAgain' } }}
        />
    );
};
