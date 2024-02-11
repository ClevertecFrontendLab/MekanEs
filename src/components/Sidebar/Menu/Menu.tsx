import { FC } from 'react';
import clx from 'classnames';
import styles from '../Sidebar.module.css';
import { Menu } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';

interface AppMenuProps {
    mobile: boolean;
}

const AppMenu: FC<AppMenuProps> = ({ mobile }) => {
    return (
        <Menu
            className={clx(styles.menu)}
            mode={'vertical'}
            items={[
                {
                    key: '1',
                    icon: mobile ? null : <CalendarTwoTone twoToneColor={['#061178', '#061178']} />,
                    label: 'Календарь',
                    title: 'Календарь',
                    style: mobile ? { padding: '0 8px', marginTop: '2px' } : {},
                },
                {
                    key: '2',
                    icon: mobile ? null : <HeartFilled className={styles.menuItem} />,
                    label: 'Тренировки',
                    title: 'Тренировки',
                    style: mobile ? { padding: '0 8px', marginTop: '2px' } : {},
                },
                {
                    key: '3',
                    icon: mobile ? null : <TrophyFilled className={styles.menuItem} />,
                    label: 'Достижения',
                    title: 'Достижения',
                    style: mobile ? { padding: '0 8px', marginTop: '2px' } : {},
                },
                {
                    key: '4',
                    icon: mobile ? null : <IdcardOutlined className={styles.menuItem} />,
                    label: 'Профиль',
                    title: 'Профиль',
                    style: mobile ? { padding: '0 8px', marginTop: '2px' } : {},
                },
            ]}
        />
    );
};
export default AppMenu;
