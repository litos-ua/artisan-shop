import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider,} from "react-router-dom";
import {router} from "./router";
import { Provider } from 'react-redux';
import store from './services/store'


const root = ReactDOM.createRoot(document.getElementById('root'), {
    concurrentUpdatesByDefault: true
});
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);