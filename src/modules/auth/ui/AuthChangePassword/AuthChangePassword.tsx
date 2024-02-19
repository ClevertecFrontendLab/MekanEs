import { FC, useCallback, useEffect, useState } from 'react';
import styles from './AuthChangePassword.module.css';
import clx from 'classnames';
import { Button, Form, Input } from 'antd';

import { authActions } from '../../model/authSlice';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@shared/types/common';
import { useChangePasswordMutation } from '../../authApi/authApi';
import { LoaderModal } from '@shared/components';
import { defNavOption } from '@shared/constants/constants';
import { getChangeValues } from '@modules/auth/model/authSelectors';

export interface ConfirmPassword {
    password: string;
}
export const AuthChangePassword: FC = () => {
    const [changePassword, { isLoading, error: changePasswordError }] = useChangePasswordMutation();
    const location = useLocation();
    const changeValues = useAppSelector(getChangeValues);
    const [disabledSave, setDisabledSave] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = useCallback(
        async (values: ConfirmPassword) => {
            try {
                dispatch(authActions.setChangeValues(values));
                await changePassword({
                    password: values.password,
                    confirmPassword: values.password,
                });

                navigate(Paths.RESULT_SUCCESS_CHANGE_PASSWORD, defNavOption);
            } catch (e) {
                console.log(e);
            }
        },
        [changePassword, dispatch, navigate],
    );
    useEffect(() => {
        if (changePasswordError) {
            navigate(Paths.RESULT_ERROR_CHANGE_PASSWORD, defNavOption);
        }
    }, [navigate, changePasswordError]);

    useEffect(() => {
        if (location?.state?.action === 'changeAgain') {
            if (changeValues) onFinish(changeValues);
        }
    }, [changeValues, location, onFinish]);

    if (location?.state?.from !== defNavOption.state.from) {
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <Form
            autoComplete={'off'}
            autoFocus={true}
            name='normal_login'
            initialValues={undefined}
            onFieldsChange={(_, allFields) => {
                const isValid = allFields.every(({ errors }) => !errors || errors.length === 0);

                if (isValid) {
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
                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                    },
                    { message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
                ]}
            >
                <Input.Password
                    data-test-id='change-password'
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
                    data-test-id='change-confirm-password'
                    autoComplete='new-password'
                />
            </Form.Item>

            <Form.Item style={{ marginBottom: '0px' }}>
                <Button
                    data-test-id='change-submit-button'
                    disabled={disabledSave}
                    block={true}
                    type='primary'
                    htmlType='submit'
                >
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};