import { FC } from 'react';
import styles from './Footer.module.css';
import { Button, Divider, Typography } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import clx from 'classnames';
export const AppFooter: FC = () => {
    return (
        <footer className={styles.Footer}>
            <Button type='link' className={styles.linkbtn}>
                Смотреть отзывы
            </Button>
            <div className={styles.rightSec}>
                <div className={styles.body}>
                    <Link className={styles.linkbtn}>Скачать на телефон</Link>
                    <Typography.Text>Доступно в PRO тарифе</Typography.Text>
                </div>
                <Divider style={{ margin: '0' }} />
                <div className={styles.action}>
                    <Button type='text' className={clx('buttonWithIcon')}>
                        <AndroidFilled />
                        Android OS
                    </Button>
                    <Button type='text' className={clx('buttonWithIcon')}>
                        <AppleFilled />
                        Apple iOS
                    </Button>
                </div>
            </div>
        </footer>
    );
};
