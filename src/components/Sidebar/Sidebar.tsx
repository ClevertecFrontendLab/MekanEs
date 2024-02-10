import { FC, useCallback, useState } from 'react';
import styles from './Sidebar.module.css';
import { Divider } from 'antd';
import ExitIcon from '../../assets/icons/exit.svg?react';
import FullLogo from '../../assets/icons/logo-full.svg?react';

import ShortLogo from '../../assets/icons/logo-short.svg?react';
import { Button, Layout } from 'antd';
import clx from 'classnames';
import AppMenu from './Menu/Menu';
import ToggleButton from './ToggleButton/ToggleButton';

const { Sider } = Layout;
interface SidebarProps {
    mobile: boolean;
    setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Sidebar: FC<SidebarProps> = ({ mobile, setMobile }) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleToggle = useCallback(() => {
        if (mobile) {
            document.body.style['overflowY'] = collapsed ? 'hidden' : 'scroll';
        }
        setCollapsed((prev) => !prev);
    }, [collapsed, mobile]);

    const handleBreak = (broken: boolean) => {
        setMobile(broken);
    };

    return (
        <Sider
            breakpoint='sm'
            onBreakpoint={handleBreak}
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

                    <AppMenu mobile={mobile} />
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
                <ToggleButton handler={handleToggle} mobile={mobile} collapsed={collapsed} />
            </div>
        </Sider>
    );
};
