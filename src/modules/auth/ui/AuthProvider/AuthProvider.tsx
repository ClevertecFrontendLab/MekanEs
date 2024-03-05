import { useAppSelector } from '@shared/hooks/typed-react-redux-hooks';
import { FC, Suspense } from 'react';
import { AuthLayout } from '../AuthLayout/AuthLayout';
import { getAuth } from '@modules/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { LoaderModal } from '@shared/components';
import { Paths } from '@shared/types/common';
type AuthProviderProps = {
    redirectPath: Paths;
    passIf: boolean;
    withLayout?: boolean;
};

export const AuthProvider: FC<AuthProviderProps> = ({ redirectPath, passIf, withLayout }) => {
    const isAuth = useAppSelector(getAuth);

    if (Boolean(isAuth) === passIf) {
        return <Navigate to={redirectPath} />;
    }

    return (
        <Suspense fallback={<LoaderModal />}>{withLayout ? <AuthLayout /> : <Outlet />}</Suspense>
    );
};
