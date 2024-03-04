import { feedbackModalBodyStyle } from '@modules/feedback/model/constants';
import { ResultForm } from '@shared/components';
import { Paths } from '@shared/types/common';
import Modal from 'antd/lib/modal/Modal';
import { FC, ReactNode } from 'react';

interface ErrorModalProps {
    className?: string;
    open: boolean;
    onClick: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = ({ className, open, onClick }) => {
    return (
        <Modal
            maskStyle={{ backdropFilter: 'blur(12px' }}
            className={className}
            open={open}
            centered
            footer={null}
            closable={false}
            bodyStyle={feedbackModalBodyStyle}
        >
            <ResultForm
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробусте ещё раз'
                buttonText='Назад'
                buttonWidth='74px'
                redirect={Paths.MAIN}
                protectedRoute={false}
                onClick={onClick}
            />
        </Modal>
    );
};
