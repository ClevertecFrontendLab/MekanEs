import styles from './Auth.module.css';
import clx from 'classnames';
import bgImage from '@shared/assets/images/main_page.png';
import { AuthFormContainer } from '@modules/auth';
import { Modal } from '@shared/components';
export const Auth = () => {
    return (
        <div className={clx(styles.Auth)}>
            <Modal bg={bgImage} isOpened={true}>
                <AuthFormContainer />
            </Modal>
        </div>
    );
};
