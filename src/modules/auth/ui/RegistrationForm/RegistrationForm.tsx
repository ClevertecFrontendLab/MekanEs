import { FC, useEffect, useState } from 'react';
import styles from './RegistrationForm.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from '@modules/auth/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '@shared/types/auth';
import { validatePassword } from '@shared/utils';
import { CustomResponseError, Paths } from '@shared/types/common';
import { LoaderModal } from '@shared/components';

// interface RegistrationFormProps {
//     className?: string;
// }

export const RegistrationForm: FC = () => {
    const [disabledSave, setDisabledSave] = useState(true);

    const [register, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();
    const onFinish = async (values: LoginProps) => {
        try {
            await register(values).unwrap();

            navigate(Paths.RESULT_SUCCESS);
        } catch (e) {
            const err = e;
            //Clear
            console.log(err);
            //Clear
        }
    };
    useEffect(() => {
        if (error) {
            const err = error as CustomResponseError;
            if (err?.status === 409) {
                navigate(Paths.RESULT_ERROR_US_EXIST);
            } else {
                navigate(Paths.RESULT_ERROR);
            }
        }
    }, [error, navigate]);

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
            {isLoading && <LoaderModal />}

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
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        required: true,
                        min: 8,
                        validator: validatePassword,
                    },
                    { message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
                ]}
            >
                <Input.Password autoComplete='new-password' type='password' placeholder='Пароль' />
            </Form.Item>
            <Form.Item
                name='confirm'
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
