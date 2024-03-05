import { FC, memo } from 'react';
import styles from '../Sidebar.module.css';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type ToggleButtonProps= {
    handler: () => void;
    mobile: boolean;
    collapsed: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = memo(({ handler, mobile, collapsed }) => {
    return (
        <div
            className={styles.toggle}
            data-test-id={mobile ? 'sider-switch-mobile' : 'sider-switch'}
        >
            <Button
                onClick={handler}
                className={styles.toggleBtn}
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                size={'small'}
            />
        </div>
    );
});

export default ToggleButton;
