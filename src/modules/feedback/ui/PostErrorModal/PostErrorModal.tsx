import { feedbackModalBodyStyle } from '@modules/feedback/model/constants';
import { ResultForm } from '@shared/components';
import Modal from 'antd/lib/modal/Modal';
import { FC, ReactNode } from 'react';

type PostErrorModalProps = {
    open: boolean;
    extra: ReactNode;
    className?: string;
};

export const PostErrorModal: FC<PostErrorModalProps> = ({ className, open, extra }) => (
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
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз.'
            protectedRoute={false}
            extra={extra}
        />
    </Modal>
);
