import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/index';
import { AppLayout } from './layout';

export const routes = (
    <Routes>
        <Route path='/' element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path='/second' element={<>second</>} />
        </Route>
    </Routes>
);
