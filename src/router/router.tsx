import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './layout';
import { MainPage } from '@pages/main-page';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path='/second' element={<>second</>} />
            </Route>
        </Route>,
    ),
);
