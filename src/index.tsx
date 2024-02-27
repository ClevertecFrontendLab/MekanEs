import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';

import 'normalize.css';
import 'antd/dist/antd.css';
import './app/styles/index.css';
import './app/styles/variables.css';
import './app/styles/ant-redeclare.css';
import { routes } from './app/router/routes';
import { store, history } from '@app/store';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
