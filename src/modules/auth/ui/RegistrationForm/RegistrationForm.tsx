import { FC, useState } from 'react';
import styles from './RegistrationForm.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from '@modules/auth/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '@shared/types/auth';
import { validatePassword } from '@shared/utils';

// interface RegistrationFormProps {
//     className?: string;
// }

export const RegistrationForm: FC = () => {
    const [disabledSave, setDisabledSave] = useState(true);

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
            onFieldsChange={(_, allFields) => {
                const isValid = allFields.every(({ errors }) => !errors || errors.length === 0);
                const touched = allFields.slice(0, 1).every(({ touched }) => touched);
                if (isValid && touched) {
                    setDisabledSave(false);
                } else {
                    setDisabledSave(true);
                }
            }}
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
                <Input.Password autoComplete='new-password' type='password' placeholder='Пароль' />
            </Form.Item>
            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: <></>,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Пароли не совпадают');
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete='new-password' />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
                <Button disabled={disabledSave} block={true} type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
