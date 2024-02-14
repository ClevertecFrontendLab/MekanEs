import { useAppDispatch } from '@shared/hooks/typed-react-redux-hooks';
import { FC, ReactNode, useEffect } from 'react';
import { push } from 'redux-first-history';
interface AuthProviderProps {
    children: ReactNode;
    redirect: string;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children, redirect }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const isAuth = localStorage.getItem('auth');
        if (!isAuth) {
            dispatch(push(redirect));
        }
    }, [dispatch, redirect]);
    return <>{children}</>;
};
