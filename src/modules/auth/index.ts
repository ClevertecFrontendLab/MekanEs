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
import { ErrorLogin } from './ui/Results/ErrorLogin/ErrorLogin';
import { RegistrationSucces } from './ui/Results/RegistrationSucces/RegistrtionSucces';
import { RegistrationErrorUE } from './ui/Results/RegistrationErrorUE/RegistrationErrorUE';
import { ErrorCheckEmailNoEmail } from './ui/Results/ErrorCheckEmail/ErrorCheckEmailNoEmail';
import { ErrorCheckEmail } from './ui/Results/ErrorCheckEmail/ErrorCheckEmail';
import { ConfirmEmail } from './ui/Results/ConfirmEmail/ConfirmEmail';
import { RegistrationError } from './ui/Results/RegistrationError/RegistrationError';
import { AuthChangePassword } from './ui/AuthChangePassword/AuthChangePassword';
import { ErrorChangePassword } from './ui/Results/ErrorChangePassword/ErrorChangePassword';
import { SuccesPasswordChange } from './ui/Results/SuccessPasswordChange/SuccessPasswordChange';
import ResultProvider from './ui/Results/ResultProvider/ResultProvider';
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
    RegistrationErrorUE,
    RegistrationSucces,
    ErrorCheckEmailNoEmail,
    ErrorCheckEmail,
    ConfirmEmail,
    RegistrationError,
    AuthChangePassword,
    ErrorChangePassword,
    SuccesPasswordChange,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    ResultProvider,
};
