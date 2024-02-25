import { type ReactNode, useEffect, memo, useState } from 'react';
import clx from 'classnames';
import styles from './Modal.module.css';
import { Portal } from '../Portal/Portal';
import { Card } from 'antd';

interface ModalProps {
    className?: string;
    children: ReactNode;
    isOpened: boolean;
    closeModal?: () => void;
    lazy?: boolean;
    bg?: string;
}

export const Modal = memo((props: ModalProps) => {
    const { className, children, isOpened, closeModal, lazy, bg } = props;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        if (isOpened) {
            setIsMounted(true);
        }
    }, [isOpened]);
    const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
    };

    if (!isMounted && lazy) {
        return null;
    }
    return (
        <Portal>
            <div className={clx(styles.Modal, { [styles.opened]: isOpened }, [className])}>
                <div
                    className={clx(styles.overlay)}
                    onClick={() => {
                        closeModal?.();
                    }}
                >
                    <div className={styles.bg} style={{ backgroundImage: `url(${bg})` }}></div>
                    <Card
                        className={clx(styles.content, {
                            [styles.showContent]: isOpened,
                        })}
                        onClick={stopPropagation}
                    >
                        {children}
                    </Card>
                </div>
            </div>
        </Portal>
    );
});
