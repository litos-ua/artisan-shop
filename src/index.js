
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './services/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from './components';
import { router } from './router';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <RouterProvider router={router} />
                </ErrorBoundary>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

