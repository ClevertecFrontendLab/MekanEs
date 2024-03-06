import { Result } from 'antd';
import { FC } from 'react';
import styles from './NotFound.module.css';
const NotFound: FC = () => {
    return (
        <div className={styles.container}>
            <Result
                className={styles.NotFound}
                status={404}
                title={'Страница не найдена'}
                subTitle={'Страница не найдена'}
            />
        </div>
    );
};
export default NotFound;
