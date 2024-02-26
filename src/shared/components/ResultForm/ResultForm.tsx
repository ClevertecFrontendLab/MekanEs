import { FC, ReactNode } from 'react';
import clx from 'classnames';
import styles from './ResultForm.module.css';
import { Button, Card, Result } from 'antd';
import { Navigate, NavigateOptions, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@shared/types/common';
import { defNavOption } from '@shared/constants/constants';
import { ResultStatusType } from 'antd/lib/result';
interface ResultFormProps {
    title: string;
    subTitle: string;
    buttonText?: string;
    onClick?: () => void;
    redirect?: Paths;
    id?: string;
    redirectOpt?: NavigateOptions;
    status: ResultStatusType;
    verification?: ReactNode;
    buttonWidth?: string;
    addPadding?: boolean;
}

export const ResultForm: FC<ResultFormProps> = (props) => {
    const location = useLocation();

    const {
        title,
        subTitle,
        buttonText,
        onClick,
        redirect,
        id,
        redirectOpt,
        status,
        verification,
        buttonWidth,
        addPadding = false,
    } = props;
    const nav = useNavigate();
    const handleClick = () => {
        onClick?.();
        if (redirect) {
            nav(redirect, redirectOpt);
        }
    };

    if (location?.state?.from !== defNavOption.state.from) {
        return <Navigate to={Paths.AUTH} />;
    }

    return (
        <Card style={{ margin: '0 16px' }}>
            <Result
                className={clx(styles.ResultForm, { [styles.extraPadding]: addPadding })}
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    verification ? (
                        verification
                    ) : (
                        <Button
                            style={buttonWidth ? { width: buttonWidth } : {}}
                            className={styles.resultBtn}
                            data-test-id={id}
                            onClick={handleClick}
                            type='primary'
                        >
                            {buttonText}
                        </Button>
                    )
                }
            />
        </Card>
    );
};
