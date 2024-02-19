import { FC, ReactNode } from 'react';
import clx from 'classnames';
import styles from './ResultForm.module.css';
import { Button, Typography } from 'antd';
import { Navigate, NavigateOptions, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';
interface ResultFormProps {
    icon: ReactNode;
    title: string;
    subTitle: string;
    buttonText: string;
    onClick?: () => void;
    redirect?: Paths;
    id: string;
    redirectOpt?: NavigateOptions;
}

export const ResultForm: FC<ResultFormProps> = (props) => {
    const location = useLocation();

    const { icon, title, subTitle, buttonText, onClick, redirect, id, redirectOpt } = props;
    const nav = useNavigate();
    const handleClick = () => {
        onClick?.();
        if (redirect) {
            nav(redirect, redirectOpt);
        }
    };

    if (location?.state?.from !== defNavOption.state.from) {
        console.log('auto redirect', location);
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <div className={clx(styles.ResultForm)}>
            {icon}
            <Typography.Title>{title}</Typography.Title>
            <Typography.Text>{subTitle}</Typography.Text>

            <Button data-test-id={id} onClick={handleClick} type='primary'>
                {buttonText}
            </Button>
        </div>
    );
};
