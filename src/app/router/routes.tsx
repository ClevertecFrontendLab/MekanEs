import { Route, Routes } from 'react-router-dom';
import { Auth, MainPage } from '@pages/index';
import { AuthProvider } from '@modules/auth';
import { AppLayout } from '@shared/components';
import { Paths } from '@shared/types/common';

export const routes = (
    <Routes>
        <Route path={Paths.BASE} element={<AppLayout />}>
            <Route element={<AuthProvider passIf={false} redirect={Paths.AUTH} />}>
                <Route path={Paths.MAIN} element={<MainPage />} />
            </Route>
        </Route>
        <Route element={<AuthProvider withLayout passIf={true} redirect={Paths.MAIN} />}>
            <Route path={Paths.REGISTRATION} element={<Auth />} />
            <Route path={Paths.AUTH} element={<Auth />} />
        </Route>
    </Routes>
);
