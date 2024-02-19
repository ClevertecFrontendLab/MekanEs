import { FC } from 'react';
import clx from 'classnames';
import styles from './LoaderModal.module.css';
import { Loader } from '..';
import { Portal } from '../Portal/Portal';

interface LoaderModalProps {
    className?: string;
}

export const LoaderModal: FC<LoaderModalProps> = () => {
    return (
        <Portal>
            <div className={clx(styles.LoaderModal)}>
                <Loader />
            </div>
        </Portal>
    );
};
