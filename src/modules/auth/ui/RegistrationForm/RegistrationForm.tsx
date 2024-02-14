import { FC } from 'react';
import styles from './RegistrationForm.module.css';
import clx from 'classnames';
import { Form, Input } from 'antd';

// interface RegistrationFormProps {
//     className?: string;
// }

export const RegistrationForm: FC = () => {
    const onFinish = (values: unknown) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name='registration'
            onFinish={onFinish}
            layout='vertical'
            requiredMark='optional'
            className={clx(styles.RegistrationForm)}
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
                <Input prefix={<div>e-mail:</div>} />
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
                <Input.Password type='password' placeholder='Пароль' />
            </Form.Item>
            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('The new password that you entered do not match!'),
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    );
};
