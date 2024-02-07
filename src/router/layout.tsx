import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
    return (
        <>
            <header>Header</header>
            <Suspense fallback={'Loading'}>
                <Outlet />
            </Suspense>
        </>
    );
};
