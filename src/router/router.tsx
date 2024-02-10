import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AppLayout } from './Layout';
import { MainPage } from '@pages/main-page';

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
