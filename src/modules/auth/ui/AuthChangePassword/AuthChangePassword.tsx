import { FC, useEffect, useState } from 'react';
import styles from './AuthChangePassword.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';

import { authActions } from '../../model/authSlice';
import { useAppDispatch } from '@shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
// import { validatePassword } from '@shared/utils';
import { push } from 'redux-first-history';
import { Paths } from '@shared/types/common';
import { CustomResponseError } from '@shared/types/common';
import { useChangePasswordMutation } from '../../authApi/authApi';
import { LoaderModal } from '@shared/components';

export interface ConfirmPassword {
    password: string;
}
export const AuthChangePassword: FC = () => {
    const [changePassword, { isLoading, error: emailCheckError }] = useChangePasswordMutation();
    const { state } = useLocation();
    //Clear
    console.log(state);
    //Clear
    const [disabledSave, setDisabledSave] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: ConfirmPassword) => {
        try {
            const { accessToken } = await changePassword({
                password: values.password,
                confirmPassword: values.password,
            }).unwrap();
            dispatch(authActions.setAuthToken(accessToken));

            navigate(Paths.RESULT_SUCCESS_CHANGE_PASSWORD);
        } catch (e) {
            dispatch(push(Paths.RESULT_ERROR_CHANGE_PASSWORD));
        }
    };
    useEffect(() => {
        if (emailCheckError) {
            const error = emailCheckError as CustomResponseError;
            if (
                error.data &&
                error?.data?.statusCode === 404 &&
                error?.data?.message === 'Email не найден'
            ) {
                navigate(Paths.RESULT_ERROR_NO_EMAIL);
            } else {
                navigate(Paths.RESULT_ERROR_CHECK_EMAIL);
            }
        }
    }, [navigate, emailCheckError]);

    return (
        <Form
            autoComplete={'off'}
            autoFocus={true}
            name='normal_login'
            initialValues={{
                password: '',
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
            className={clx(styles.AuthChangePassword)}
        >
            {isLoading && <LoaderModal />}
            <Form.Item
                name='password'
                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                rules={[
                    {
                        required: true,
                        min: 8,
                        // validator: validatePassword,
                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
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
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};
