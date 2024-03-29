import { FC, useCallback, useEffect, useState } from 'react';
import Fstyles from '../CommonStyles/Form.module.css';
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
import { defNavOption, emailRule, passwordRule } from '@shared/constants/constants';
import { GooglePlusOutlined } from '@ant-design/icons';

const RegistrationForm: FC = () => {
    const [disabledSave, setDisabledSave] = useState(false);
    const location = useLocation();
    const regValues = useAppSelector(getRegValues);
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const onFinish = useCallback(
        async (values: LoginProps) => {
            if (!disabledSave) {
                dispatch(authActions.setRegValues(values));
                register(values)
                    .unwrap()
                    .then(() => {
                        navigate(Paths.RESULT_SUCCESS, defNavOption);
                    })
                    .catch((e: CustomResponseError) => {
                        if (e?.status === 409) {
                            navigate(Paths.RESULT_ERROR_US_EXIST, defNavOption);
                        } else {
                            navigate(Paths.RESULT_ERROR, defNavOption);
                        }
                    });
            }
        },
        [dispatch, navigate, register, disabledSave],
    );

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
            className={clx(Fstyles.Form)}
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
            <div className={clx(Fstyles.inputs, Fstyles.margin)}>
                <Form.Item name='email' rules={[emailRule]}>
                    <Input
                        data-test-id='registration-email'
                        autoComplete='username'
                        prefix={<div>e-mail:</div>}
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    help={
                        <div className={Fstyles.help}>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </div>
                    }
                    rules={[
                        passwordRule,
                        {
                            message: (
                                <div className={Fstyles.help}>
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </div>
                            ),
                        },
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
                        placeholder='Повторите пароль'
                        data-test-id='registration-confirm-password'
                        autoComplete='new-password'
                    />
                </Form.Item>
            </div>
            <div className={Fstyles.inputs}>
                <Form.Item style={{ marginBottom: '0px' }}>
                    <Button
                        style={{ height: '40px' }}
                        data-test-id='registration-submit-button'
                        block={true}
                        type='primary'
                        htmlType='submit'
                    >
                        Войти
                    </Button>
                </Form.Item>

                <Button
                    className={Fstyles.googleBtn}
                    icon={<GooglePlusOutlined />}
                    style={{ height: '40px' }}
                    type='default'
                    block
                >
                    Регистрация через Google
                </Button>
            </div>
        </Form>
    );
};
export default RegistrationForm;
