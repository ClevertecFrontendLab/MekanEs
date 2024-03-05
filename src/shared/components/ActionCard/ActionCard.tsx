import { FC, ReactNode } from 'react';
import styles from './ActionCard.module.css';
import { Button, Divider, Typography } from 'antd';
import clx from 'classnames';
import { TextContainer } from '../index';

type ActionCardProps = {
    title: string;
    buttonText: string;
    icon: ReactNode;
};

export const ActionCard: FC<ActionCardProps> = ({ title, buttonText, icon }) => {
    return (
        <TextContainer className={styles.small}>
            <div className={styles.block}>
                <Typography.Title level={5} style={{ fontWeight: '400' }}>
                    {title}
                </Typography.Title>
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={clx(styles.block)}>
                <Button type='text' icon={icon} className='buttonWithIcon'>
                    {buttonText}
                </Button>
            </div>
        </TextContainer>
    );
};
