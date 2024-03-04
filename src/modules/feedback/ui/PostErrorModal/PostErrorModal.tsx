import { feedbackModalBodyStyle } from '@modules/feedback/model/constants';
import { ResultForm } from '@shared/components';
import Modal from 'antd/lib/modal/Modal';
import { FC, ReactNode } from 'react';

interface PostErrorModalProps {
    className?: string;
    open: boolean;

    extra: ReactNode;
}

export const PostErrorModal: FC<PostErrorModalProps> = ({ className, open, extra }) => {
    return (
        <Modal
        maskStyle={{backdropFilter:'blur(12px'}}

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
};
