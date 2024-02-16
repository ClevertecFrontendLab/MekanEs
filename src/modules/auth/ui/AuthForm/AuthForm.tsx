import { FC } from 'react';
import styles from './AuthForm.module.css';
import clx from 'classnames';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

// interface AuthFormProps {
//     className?: string;
// }

export const AuthForm: FC = () => {
    const onFinish = (values: unknown) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name='normal_login'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            layout='vertical'
            requiredMark='optional'
            className={clx(styles.AuthForm)}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        type: 'email',
                    },
                    {
                        required: true,
                        message: 'Пожалуйста введите email',
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
                        message: 'Please input your Password!',
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
                <Button block={true} type='primary' htmlType='submit'>
                    Log in
                </Button>
                <Button icon={<GooglePlusOutlined />} type='default'>
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
