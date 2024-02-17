import { Route, Routes } from 'react-router-dom';
import { Auth, MainPage } from '@pages/index';
import { AuthProvider } from '@modules/auth';
import { AppLayout } from '@shared/components';

export const routes = (
    <Routes>
        <Route path='/' element={<AppLayout />}>
            <Route element={<AuthProvider passIf={false} redirect='/auth' />}>
                <Route path='/main' element={<MainPage />} />
            </Route>

            <Route path='/second' element={<>second</>} />
        </Route>
        <Route element={<AuthProvider passIf={true} redirect='/main' />}>
            <Route path='/auth/registration' element={<Auth />} />
            <Route path='/auth' element={<Auth />} />
        </Route>
    </Routes>
);
