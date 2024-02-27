import {
    authApi,
    useLoginMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} from './authApi/authApi';
import { getAuth } from './model/authSelectors';
import { authSlice } from './model/authSlice';
import { AuthContainer } from './ui/AuthContainer/AuthContainer';
import { AuthLayout } from './ui/AuthLayout/AuthLayout';
import { AuthProvider } from './ui/AuthProvider/AuthProvider';
import { ErrorLogin } from '../result/ui/ErrorLogin/ErrorLogin';
import { AuthChangePasswordLazy as AuthChangePassword } from './ui/AuthChangePassword/AuthChangePassword.async';
import { ConfirmEmail } from './ui/ConfirmEmail/ConfirmEmail';
export {
    AuthProvider,
    AuthContainer,
    AuthLayout,
    ErrorLogin,
    authSlice,
    authApi,
    useLoginMutation,
    useRegisterMutation,
    getAuth,
    AuthChangePassword,
    ConfirmEmail,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
};
