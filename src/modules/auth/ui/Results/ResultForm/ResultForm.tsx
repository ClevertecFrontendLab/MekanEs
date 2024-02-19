import { FC, ReactNode } from 'react';
import clx from 'classnames';
import styles from './ResultForm.module.css';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@shared/types/common';
interface ResultFormProps {
    icon: ReactNode;
    title: string;
    subTitle: string;
    buttonText: string;
    onClick: () => void;
    redirect?: Paths;
}

export const ResultForm: FC<ResultFormProps> = (props) => {
    const { icon, title, subTitle, buttonText, onClick, redirect } = props;
    const nav = useNavigate();
    const handleClick = () => {
        onClick();
        if (redirect) {
            nav(redirect);
        }
    };
    return (
        <div className={clx(styles.ResultForm)}>
            {icon}
            <Typography.Title>{title}</Typography.Title>
            <Typography.Text>{subTitle}</Typography.Text>

            <Button onClick={handleClick} type='primary'>
                {buttonText}
            </Button>
        </div>
    );
};
