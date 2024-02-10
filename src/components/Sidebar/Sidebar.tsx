import { FC, useState } from 'react';
import styles from './Sidebar.module.css';
import {
    CalendarOutlined,
    HeartFilled,
    IdcardOutlined,
    TrophyFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Divider, Menu } from 'antd';
import ExitIcon from '../../assets/icons/exit.svg?react';
import FullLogo from '../../assets/icons/logo-full.svg?react';

import ShortLogo from '../../assets/icons/logo-short.svg?react';
import { Button, Layout } from 'antd';
import clx from 'classnames';

const { Sider } = Layout;
interface SidebarProps {
    mobile: boolean;
    setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Sidebar: FC<SidebarProps> = ({ mobile, setMobile }) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleToggle = () => {
        document.body.style['overflowY'] = collapsed ? 'hidden' : 'scroll';
        setCollapsed((prev) => !prev);
    };

    return (
        <Sider
            breakpoint='xs'
            onBreakpoint={(e) => {
                setMobile(e);
            }}
            trigger={null}
            width={mobile ? '106px' : '208px'}
            className={styles.Sidebar}
            collapsedWidth={mobile ? '0' : '64px'}
            collapsed={collapsed}
            collapsible
        >
            <div className={styles.sidebarContent}>
                <div>
                    <div
                        className={clx(collapsed ? styles.shortLogo : styles.logo, {
                            [styles.mobileLogo]: mobile,
                        })}
                    >
                        {collapsed ? <ShortLogo /> : <FullLogo />}
                    </div>

                    <Menu
                        className={clx(styles.menu)}
                        mode={'vertical'}
                        items={[
                            {
                                key: '1',
                                icon: mobile ? null : (
                                    <CalendarOutlined className={styles.menuItem} />
                                ),
                                label: 'Календарь',
                                title: 'Календарь',
                                style: mobile ? { paddingLeft: '8px', marginTop: '2px' } : {},
                            },
                            {
                                key: '2',
                                icon: mobile ? null : <HeartFilled className={styles.menuItem} />,
                                label: 'Тренировки',
                                title: 'Тренировки',
                                style: mobile ? { paddingLeft: '8px', marginTop: '2px' } : {},
                            },
                            {
                                key: '3',
                                icon: mobile ? null : <TrophyFilled className={styles.menuItem} />,
                                label: 'Достижения',
                                title: 'Достижения',
                                style: mobile ? { paddingLeft: '8px', marginTop: '2px' } : {},
                            },
                            {
                                key: '4',
                                icon: mobile ? null : (
                                    <IdcardOutlined className={styles.menuItem} />
                                ),
                                label: 'Профиль',
                                title: 'Профиль',
                                style: mobile ? { paddingLeft: '8px', marginTop: '2px' } : {},
                            },
                        ]}
                    />
                </div>
                <div className={styles.exitContainer}>
                    <Divider style={{ margin: '0' }} />

                    <Button
                        type='text'
                        icon={mobile ? null : <ExitIcon />}
                        className={styles.exitBtn}
                    >
                        {collapsed ? '' : 'Выход'}
                    </Button>
                </div>
                <div
                    className={styles.toggle}
                    data-test-id={mobile ? 'sider-switch-mobile' : 'sider-switch'}
                >
                    <Button
                        onClick={handleToggle}
                        className={styles.toggleBtn}
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        size={'small'}
                    />
                </div>
            </div>
        </Sider>
    );
};
