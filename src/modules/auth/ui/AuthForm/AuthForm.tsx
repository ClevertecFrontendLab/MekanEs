import { FC, useEffect, useState } from 'react';
import styles from './AuthForm.module.css';
import clx from 'classnames';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { LoginProps } from '@shared/types/auth';
import { authActions } from '../../model/authSlice';
import { useAppDispatch } from '@shared/hooks';
import { useNavigate } from 'react-router-dom';
import { LS_AuthKey } from '@shared/constants/constants';
import { validatePassword } from '@shared/utils';
import { push } from 'redux-first-history';
import { Paths } from '@shared/types/common';
import { CustomResponseError } from '@shared/types/common';
import { useCheckEmailMutation, useLoginMutation } from '@modules/auth';
import { LoaderModal } from '@shared/components';

// interface AuthFormProps {
//     className?: string;
// }
export interface FormValues extends LoginProps {
    remember: boolean;
}
export const AuthForm: FC = () => {
    const [isValidEmail, setIsValidEmail] = useState<boolean | string>(false);
    const [login, { isLoading }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingCheckEmail, error: emailCheckError }] =
        useCheckEmailMutation();

    //Clear
    console.log(isLoading, isLoadingCheckEmail);
    //Clear
    const [disabledSave, setDisabledSave] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = async (values: FormValues) => {
        try {
            const { accessToken } = await login(values).unwrap();
            dispatch(authActions.setAuthToken(accessToken));
            if (values.remember) {
                localStorage.setItem(LS_AuthKey, accessToken);
            } else {
                sessionStorage.setItem(LS_AuthKey, accessToken);
            }
            navigate('/main');
        } catch (e) {
            dispatch(push(Paths.RESULT_ERROR_LOGIN));
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

    const checkEmailHandle = async () => {
        try {
            if (typeof isValidEmail === 'string') {
                await checkEmail({ email: isValidEmail }).unwrap();

                navigate(Paths.CONFIRM_EMAIL, { state: { email: isValidEmail } });
            }
        } catch (e) {
            dispatch(push(Paths.RESULT_ERROR_NO_EMAIL));
        }
    };

    return (
        <>
            {(isLoading || !isLoadingCheckEmail) && <LoaderModal />}

            <Form
                autoComplete={'off'}
                autoFocus={true}
                name='normal_login'
                initialValues={{
                    email: '',
                    password: '',
                    remember: true,
                }}
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
                requiredMark='optional'
                className={clx(styles.AuthForm)}
            >
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
                    <Input autoComplete='username' autoFocus={true} prefix={<div>e-mail:</div>} />
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
                    ]}
                >
                    <Input.Password
                        autoComplete='current-password'
                        type='password'
                        placeholder='Пароль'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button onClick={checkEmailHandle} disabled={!isValidEmail} type='link'>
                        Забыли пароль?
                    </Button>
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px' }}>
                    <Button disabled={disabledSave} block={true} type='primary' htmlType='submit'>
                        Log in
                    </Button>
                    <Button icon={<GooglePlusOutlined />} type='default'>
                        Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
