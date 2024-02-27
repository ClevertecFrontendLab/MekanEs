import { FC, useCallback, useEffect, useState } from 'react';
import styles from './AuthChangePassword.module.css';
import CStyles from '../CommonStyles/CommonStyles.module.css';
import clx from 'classnames';
import { Button, Card, Form, Input, Typography } from 'antd';

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
const AuthChangePassword: FC = () => {
    const [changePassword, { isLoading, error: changePasswordError }] = useChangePasswordMutation();
    const [error, setError] = useState(false);
    const location = useLocation();
    const changeValues = useAppSelector(getChangeValues);
    const [disabledSave, setDisabledSave] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = useCallback(
        (values: ConfirmPassword) => {
            dispatch(authActions.setChangeValues(values));
            changePassword({
                password: values.password,
                confirmPassword: values.password,
            })
                .unwrap()
                .then(() => {
                    navigate(Paths.RESULT_SUCCESS_CHANGE_PASSWORD, defNavOption);
                })
                .catch((e) => {
                    setError(Boolean(e));
                });
        },
        [changePassword, dispatch, navigate],
    );
    useEffect(() => {
        if (changePasswordError || error) {
            navigate(Paths.RESULT_ERROR_CHANGE_PASSWORD, defNavOption);
        }
    }, [navigate, changePasswordError, error]);

    useEffect(() => {
        if (location?.state?.action === 'changeAgain') {
            if (changeValues) onFinish(changeValues);
        }
    }, [changeValues, location, onFinish]);

    if (location?.state?.from !== defNavOption.state.from) {
        console.log('redirecting');
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <Card className={clx(CStyles.card, styles.formCard)}>
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
                <Typography.Title level={3}>Восстановление аккаунта</Typography.Title>
                <div className={styles.inputs}>
                    <Form.Item
                        name='password'
                        help={
                            <div className={styles.help}>
                                Пароль не менее 8 символов, с заглавной буквой и цифрой
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(
                                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
                                ),
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
                </div>
                <Form.Item style={{ marginBottom: '0px' }}>
                    <Button
                        className={styles.btn}
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
        </Card>
    );
};
export default AuthChangePassword;
