import { type ReactNode, useEffect, memo, useState } from 'react';
import clx from 'classnames';
import styles from './Modal.module.css';
import { Portal } from '../Portal/Portal';
import { Button, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

type ModalProps = {
    bgClassName: string;
    children: ReactNode;
    withCloseButton: boolean;
    isOpened?: boolean;
    closeModal: () => void;
};

export const Modal = memo((props: ModalProps) => {
    const { children, withCloseButton, isOpened, bgClassName, closeModal } = props;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isOpened) {
            setIsMounted(true);
        }
    }, [isOpened]);
    const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
    };

    if (!isMounted) {
        return null;
    }
    return (
        <Portal>
            <div onClick={closeModal} className={clx(styles.Modal, bgClassName)}>
                <Card
                    className={clx(styles.content, {
                        [styles.showContent]: isOpened,
                    })}
                    onClick={stopPropagation}
                >
                    {withCloseButton && (
                        <Button
                            className={styles.closeBtn}
                            onClick={closeModal}
                            icon={<CloseCircleOutlined />}
                            type='default'
                        />
                    )}
                    {children}
                </Card>
            </div>
        </Portal>
    );
});
