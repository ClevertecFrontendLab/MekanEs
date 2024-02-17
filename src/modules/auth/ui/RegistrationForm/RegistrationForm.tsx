import { FC } from 'react';
import styles from './RegistrationForm.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from '@modules/auth/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '@shared/types/auth';

// interface RegistrationFormProps {
//     className?: string;
// }

export const RegistrationForm: FC = () => {
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const onFinish = async (values: LoginProps) => {
        console.log(values);
        try {
            await register(values).unwrap();

            navigate('/auth');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form
            name='registration'
            onFinish={onFinish}
            layout='vertical'
            requiredMark='optional'
            className={clx(styles.RegistrationForm)}
        >
            {isLoading && <div>Loading...</div>}
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
                <Input.Password autoComplete='new-password' type='password' placeholder='Пароль' />
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
                <Input.Password autoComplete='new-password' />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
                <Button block={true} type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
