import { LS_AuthKey } from '@shared/constants/constants';
import { useAppDispatch } from '@shared/hooks/typed-react-redux-hooks';
import { FC, useEffect } from 'react';
import { push } from 'redux-first-history';
import { AuthLayout } from '../AuthLayout/AuthLayout';
interface AuthProviderProps {
    redirect: string;
    passIf: boolean;
}

export const AuthProvider: FC<AuthProviderProps> = ({ redirect, passIf }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const isAuth = localStorage.getItem(LS_AuthKey);
        if (Boolean(isAuth) === passIf) {
            dispatch(push(redirect));
        }
    }, [dispatch, redirect, passIf]);
    return <AuthLayout />;
};
