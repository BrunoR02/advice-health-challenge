import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ScheduleContextProvider } from './store/schedule-context';
import { Provider } from 'react-redux';
import store from './store/alert-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ScheduleContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ScheduleContextProvider>
    </Provider>
);

