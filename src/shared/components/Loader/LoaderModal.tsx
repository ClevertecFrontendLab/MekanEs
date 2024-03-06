import { FC } from 'react';
import clx from 'classnames';
import styles from './LoaderModal.module.css';
import { Loader } from './Loader';
import { Portal } from '../Portal/Portal';

export const LoaderModal: FC = () => {
    return (
        <Portal>
            <div className={clx(styles.LoaderModal)}>
                <Loader />
            </div>
        </Portal>
    );
};
