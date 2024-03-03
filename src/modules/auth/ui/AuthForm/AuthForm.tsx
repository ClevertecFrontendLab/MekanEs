import { FC, useCallback, useEffect, useState } from 'react';
import Fstyles from '../CommonStyles/Form.module.css';
import clx from 'classnames';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { authActions } from '../../model/authSlice';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AUTH_PATH,
    BASE_URL,
    LS_AuthKey,
    defNavOption,
    emailRule,
    passwordRule,
} from '@shared/constants/constants';
import { Paths } from '@shared/types/common';
import { CustomResponseError } from '@shared/types/common';
import { useCheckEmailMutation, useLoginMutation } from '@modules/auth';
import { LoaderModal } from '@shared/components';
import { AuthFormValues } from '../../types';
import { getAuthValues } from '@modules/auth/model/authSelectors';

const AuthForm: FC = () => {
    const authValues = useAppSelector(getAuthValues);
    const [isValidEmail, setIsValidEmail] = useState<boolean | string>(authValues?.email || true);
    const [login, { isLoading }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingCheckEmail }] = useCheckEmailMutation();

    const location = useLocation();

    const [disabledSave, setDisabledSave] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = (values: AuthFormValues) => {
        if (!disabledSave) {
            login(values)
                .unwrap()
                .then(({ accessToken }) => {
                    dispatch(authActions.setAuthToken(accessToken));
                    if (values.remember) {
                        localStorage.setItem(LS_AuthKey, accessToken);
                    }
                    navigate(Paths.MAIN);
                })
                .catch(() => {
                    navigate(Paths.RESULT_ERROR_LOGIN, defNavOption);
                });
        }
    };
    const onAuthGoogle = () => {
        window.location.href = BASE_URL + AUTH_PATH + 'google';
    };

    const checkEmailHandle = useCallback(() => {
        if (typeof isValidEmail === 'string') {
            dispatch(
                authActions.setAuthValues({
                    email: isValidEmail,
                    password: authValues?.password || '',
                    remember: authValues?.remember || false,
                }),
            );

            checkEmail({ email: isValidEmail })
                .unwrap()
                .then(() => {
                    navigate(Paths.CONFIRM_EMAIL, {
                        state: { email: isValidEmail, ...defNavOption.state },
                    });
                })
                .catch((e: CustomResponseError) => {
                    if (e?.status === 404 && e?.data?.message === 'Email не найден') {
                        navigate(Paths.RESULT_ERROR_NO_EMAIL, defNavOption);
                    } else {
                        navigate(Paths.RESULT_ERROR_CHECK_EMAIL, defNavOption);
                    }
                });
        }
    }, [authValues?.password, authValues?.remember, checkEmail, dispatch, isValidEmail, navigate]);

    useEffect(() => {
        if (location?.state?.action === 'checkMail') {
            checkEmailHandle();
        }
    }, [location, checkEmailHandle]);
    useEffect(() => {
        if (location?.state?.clear === true) {
            dispatch(authActions.setAuthValues(null));
        }
    }, [dispatch, location]);
    return (
        <>
            {(isLoading || isLoadingCheckEmail) && <LoaderModal />}

            <Form
                autoComplete={'off'}
                autoFocus={true}
                name='normal_login'
                initialValues={undefined}
                onFieldsChange={(_, allFields) => {
                    if (allFields[0].errors?.length === 0) {
                        setIsValidEmail(allFields[0].value);
                    } else {
                        setIsValidEmail(false);
                    }
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
                className={clx(Fstyles.Form)}
            >
                <div className={Fstyles.inputs}>
                    <Form.Item name='email' rules={[emailRule]}>
                        <Input
                            data-test-id='login-email'
                            autoComplete='username'
                            autoFocus={true}
                            prefix={<div>e-mail:</div>}
                        />
                    </Form.Item>
                    <Form.Item name='password' help={''} rules={[passwordRule]}>
                        <Input.Password
                            data-test-id='login-password'
                            autoComplete='current-password'
                            type='password'
                            placeholder='Пароль'
                            prefix={null}
                        />
                    </Form.Item>
                </div>
                <div className={Fstyles['check-block']}>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox defaultChecked={false} data-test-id='login-remember'>
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            data-test-id='login-forgot-button'
                            className={Fstyles.checkMail}
                            onClick={checkEmailHandle}
                            disabled={!isValidEmail}
                            type='link'
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>
                </div>
                <div className={Fstyles.inputs}>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Button
                            data-test-id='login-submit-button'
                            block={true}
                            type='primary'
                            htmlType='submit'
                            style={{ height: '40px' }}
                        >
                            Войти
                        </Button>{' '}
                    </Form.Item>
                    <Button
                        onClick={() => {
                            onAuthGoogle();
                        }}
                        className={Fstyles.googleBtn}
                        icon={<GooglePlusOutlined />}
                        style={{ height: '40px' }}
                        type='default'
                        block
                    >
                        Войти через Google
                    </Button>
                </div>
            </Form>
        </>
    );
};
export default AuthForm;
