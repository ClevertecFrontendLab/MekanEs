import { useAppDispatch, useAppSelector } from '@shared/hooks/typed-react-redux-hooks';
import { FC, useEffect } from 'react';
import { push } from 'redux-first-history';
import { AuthLayout } from '../AuthLayout/AuthLayout';
import { getAuth } from '@modules/auth';
import { Outlet } from 'react-router-dom';
interface AuthProviderProps {
    redirect: string;
    passIf: boolean;
    withLayout?: boolean;
}

export const AuthProvider: FC<AuthProviderProps> = ({ redirect, passIf, withLayout }) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getAuth);
    useEffect(() => {
        if (Boolean(isAuth) === passIf) {
            dispatch(push(redirect));
        }
    }, [dispatch, redirect, passIf, isAuth]);
    if (!withLayout) {
        return <Outlet />;
    }
    return <AuthLayout />;
};
