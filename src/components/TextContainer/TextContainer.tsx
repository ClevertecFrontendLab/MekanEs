import { FC, ReactNode } from 'react';
import styles from './TextContainer.module.css';
import clx from 'classnames';
interface TextContainerProps {
    className?: string;
    children: ReactNode;
}

export const TextContainer: FC<TextContainerProps> = ({ className, children }) => {
    return <div className={clx(styles.textContainer, className)}>{children}</div>;
};
