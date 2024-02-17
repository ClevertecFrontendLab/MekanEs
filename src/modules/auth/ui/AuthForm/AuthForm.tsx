import { FC, useState } from 'react';
import styles from './AuthForm.module.css';
import clx from 'classnames';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@modules/auth/authApi/authApi';
import { LoginProps } from '@shared/types/auth';
import { authActions } from '@modules/auth/model/authSlice';
import { useAppDispatch } from '@shared/hooks';
import { useNavigate } from 'react-router-dom';
import { LS_AuthKey } from '@shared/constants/constants';
import { validatePassword } from '@shared/utils';

// interface AuthFormProps {
//     className?: string;
// }
export interface FormValues extends LoginProps {
    remember: boolean;
}
export const AuthForm: FC = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [disabledSave, setDisabledSave] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: FormValues) => {
        try {
            const { accessToken } = await login(values).unwrap();
            dispatch(authActions.setAuthToken(accessToken));
            if (values.remember) {
                localStorage.setItem(LS_AuthKey, accessToken);
            }
            navigate('/main');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Form
            name='normal_login'
            initialValues={{
                email: '',
                password: '',
                remember: true,
            }}
            onFieldsChange={(_, allFields) => {
                const isValid = allFields.every(({ errors }) => !errors || errors.length === 0);
                const touched = allFields.slice(0, 1).every(({ touched }) => touched);
                if (isValid && touched) {
                    setDisabledSave(false);
                } else {
                    setDisabledSave(true);
                }
            }}
            onFinish={onFinish}
            layout='vertical'
            requiredMark='optional'
            className={clx(styles.AuthForm)}
        >
            {isLoading && <div>Loading...</div>}
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: <></>,
                    },
                ]}
            >
                <Input autoComplete='username' prefix={<div>e-mail:</div>} />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        min: 8,
                        validator: validatePassword,
                    },
                ]}
            >
                <Input.Password
                    autoComplete='current-password'
                    type='password'
                    placeholder='Пароль'
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <a href=''>Забыли пароль?</a>
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
                <Button disabled={disabledSave} block={true} type='primary' htmlType='submit'>
                    Log in
                </Button>
                <Button icon={<GooglePlusOutlined />} type='default'>
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
