import { FC, useCallback, useEffect, useState } from 'react';
import styles from '../AuthLayout/Form.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from '@modules/auth/authApi/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginProps } from '@shared/types/auth';
import { CustomResponseError, Paths } from '@shared/types/common';
import { LoaderModal } from '@shared/components';
import { getRegValues } from '@modules/auth/model/authSelectors';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { authActions } from '@modules/auth/model/authSlice';
import { defNavOption } from '@shared/constants/constants';

// interface RegistrationFormProps {
//     className?: string;
// }

export const RegistrationForm: FC = () => {
    const [disabledSave, setDisabledSave] = useState(false);
    const location = useLocation();
    const regValues = useAppSelector(getRegValues);
    const dispatch = useAppDispatch();
    const [register, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();
    const onFinish = useCallback(
        async (values: LoginProps) => {
            if (!disabledSave) {
                try {
                    dispatch(authActions.setRegValues(values));
                    await register(values).unwrap();

                    navigate(Paths.RESULT_SUCCESS, defNavOption);
                } catch (e) {
                    console.log(e);
                }
            }
        },
        [dispatch, navigate, register, disabledSave],
    );
    useEffect(() => {
        if (error) {
            const err = error as CustomResponseError;
            if (err?.status === 409) {
                navigate(Paths.RESULT_ERROR_US_EXIST, defNavOption);
            } else {
                navigate(Paths.RESULT_ERROR, defNavOption);
            }
        }
    }, [error, navigate]);
    useEffect(() => {
        if (location?.state?.action === 'register') {
            if (regValues) onFinish(regValues);
        }
    }, [location, onFinish, regValues]);

    useEffect(() => {
        if (location?.state?.clear === true) {
            dispatch(authActions.setRegValues(null));
        }
    }, [dispatch, location]);
    return (
        <Form
            name='registration'
            onFinish={onFinish}
            initialValues={undefined}
            layout='vertical'
            requiredMark='optional'
            className={clx(styles.Form)}
            onFieldsChange={(_, allFields) => {
                const isValid = allFields.every(({ errors }) => !errors || errors.length === 0);
                if (isValid) {
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
                <Input
                    data-test-id='registration-email'
                    autoComplete='username'
                    prefix={<div>e-mail:</div>}
                />
            </Form.Item>
            <Form.Item
                name='password'
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        required: true,
                        min: 8,
                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                    },
                    { message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
                ]}
            >
                <Input.Password
                    data-test-id='registration-password'
                    autoComplete='new-password'
                    type='password'
                    placeholder='Пароль'
                />
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
                <Input.Password
                    data-test-id='registration-confirm-password'
                    autoComplete='new-password'
                />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
                <Button
                    data-test-id='registration-submit-button'
                    block={true}
                    type='primary'
                    htmlType='submit'
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};
