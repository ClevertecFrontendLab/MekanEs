import { Route, Routes } from 'react-router-dom';
import { Auth, MainPage } from '@pages/index';
import { AppLayout } from './layout';
import { AuthProvider } from '@modules/auth';

export const routes = (
    <Routes>
        <Route path='/' element={<AppLayout />}>
            <Route
                index
                element={
                    <AuthProvider redirect='/auth'>
                        <MainPage />
                    </AuthProvider>
                }
            />
            <Route path='/auth' element={<Auth />} />
            <Route path='/auth/registration' element={<Auth />} />

            <Route path='/second' element={<>second</>} />
        </Route>
    </Routes>
);
