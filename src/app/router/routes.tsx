import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth, MainPage, NotFound } from '@pages/index';

import { AppLayout } from '@shared/components';
import { Paths } from '@shared/types/common';
import { AuthChangePassword, AuthProvider, ConfirmEmail, ErrorLogin } from '@modules/auth';
import {
    ErrorChangePassword,
    ErrorCheckEmail,
    ErrorCheckEmailNoEmail,
    RegistrationError,
    RegistrationErrorUE,
    RegistrationSucces,
    ResultProvider,
    SuccesPasswordChange,
} from '@modules/result';
import { Feedback } from '@pages/feedback/Feedback';

export const routes = (
    <Routes>
        <Route path={Paths.BASE} element={<AppLayout />}>
            <Route element={<AuthProvider passIf={false} redirectPath={Paths.AUTH} />}>
                <Route path={Paths.MAIN} element={<MainPage />} />
                <Route path={Paths.FEEDBACK} element={<Feedback />} />
            </Route>
        </Route>

        <Route element={<AuthProvider withLayout passIf={true} redirectPath={Paths.MAIN} />}>
            <Route path={Paths.REGISTRATION} element={<Auth />} />
            <Route path={Paths.AUTH} element={<Auth />} />
        </Route>

        <Route element={<AuthProvider passIf={true} redirectPath={Paths.MAIN} />}>
            <Route element={<ResultProvider />}>
                <Route path={Paths.AUTH_CHANGE_PASSWORD} element={<AuthChangePassword />} />
                <Route path={Paths.RESULT_ERROR_LOGIN} element={<ErrorLogin />} />
                <Route path={Paths.RESULT_ERROR_US_EXIST} element={<RegistrationErrorUE />} />
                <Route path={Paths.RESULT_ERROR} element={<RegistrationError />} />
                <Route path={Paths.RESULT_SUCCESS} element={<RegistrationSucces />} />
                <Route
                    path={Paths.RESULT_SUCCESS_CHANGE_PASSWORD}
                    element={<SuccesPasswordChange />}
                />
                <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                <Route path={Paths.RESULT_ERROR_NO_EMAIL} element={<ErrorCheckEmailNoEmail />} />
                <Route
                    path={Paths.RESULT_ERROR_CHANGE_PASSWORD}
                    element={<ErrorChangePassword />}
                />
                <Route path={Paths.RESULT_ERROR_CHECK_EMAIL} element={<ErrorCheckEmail />} />
            </Route>
        </Route>
        <Route path='*' element={<Navigate to={Paths.NOT_FOUND} />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
    </Routes>
);
