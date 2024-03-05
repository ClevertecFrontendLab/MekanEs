import { feedbackModalBodyStyle } from '@modules/feedback/model/constants';
import { ResultForm } from '@shared/components';
import Modal from 'antd/lib/modal/Modal';
import { FC } from 'react';

type SuccessModalProps = {
    className?: string;
    open: boolean;
    onClick: () => void;
};

export const SuccessModal: FC<SuccessModalProps> = ({ className, open, onClick }) => {
    return (
        <Modal
            maskStyle={{ backdropFilter: 'blur(12px' }}
            className={className}
            bodyStyle={feedbackModalBodyStyle}
            open={open}
            centered
            footer={null}
            closable={false}
        >
            <ResultForm
                status='success'
                title='Отзыв успешно опубликован'
                subTitle={null}
                buttonText='Отлично'
                onClick={onClick}
                protectedRoute={false}
            />
        </Modal>
    );
};
