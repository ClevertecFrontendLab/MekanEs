import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { MainPage } from '@pages/index';
import { AppLayout } from './layout';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path='/second' element={<>second</>} />
            </Route>
        </Route>,
    ),
);
