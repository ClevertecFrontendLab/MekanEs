import { useAppSelector } from '@shared/hooks/typed-react-redux-hooks';
import { FC } from 'react';
import { AuthLayout } from '../AuthLayout/AuthLayout';
import { getAuth } from '@modules/auth';
import { Navigate, Outlet } from 'react-router-dom';
interface AuthProviderProps {
    redirect: string;
    passIf: boolean;
    withLayout?: boolean;
}

export const AuthProvider: FC<AuthProviderProps> = ({ redirect, passIf, withLayout }) => {
    const isAuth = useAppSelector(getAuth);

    if (Boolean(isAuth) === passIf) {
        return <Navigate to={redirect} />;
    } else {
        if (!withLayout) {
            return <Outlet />;
        }
        return <AuthLayout />;
    }
};
