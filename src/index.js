// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {RouterProvider,} from "react-router-dom";
// import {router} from "./router";
// import { Provider } from 'react-redux';
// import store from './services/store';
//
//
// const root = ReactDOM.createRoot(document.getElementById('root'), {
//     concurrentUpdatesByDefault: true
// });
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <RouterProvider router={router} />
//         </Provider>
//     </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import store from './services/store';
// import { router } from "./router";
//
// // Create a QueryClient instance
// const queryClient = new QueryClient();
//
// const root = ReactDOM.createRoot(document.getElementById('root'), {
//     concurrentUpdatesByDefault: true
// });
//
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <QueryClientProvider client={queryClient}>
//                 <RouterProvider router={router} />
//             </QueryClientProvider>
//         </Provider>
//     </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './services/store';
// import { router } from "./router";
//
//
// const root = ReactDOM.createRoot(document.getElementById('root'), {
//     concurrentUpdatesByDefault: true
// });
//
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//                 <RouterProvider router={router} />
//         </Provider>
//     </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './services/store';
// import { router } from "./router";
// import { QueryClient, QueryClientProvider } from 'react-query';
// import {ErrorBoundary} from './components';
//
// // Initialize the QueryClient
// const queryClient = new QueryClient();
//
// const root = ReactDOM.createRoot(document.getElementById('root'), {
//     concurrentUpdatesByDefault: true
// });
//
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <QueryClientProvider client={queryClient}>
//                 <ErrorBoundary>
//                     <RouterProvider router={router} />
//                 </ErrorBoundary>
//             </QueryClientProvider>
//         </Provider>
//     </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './services/store';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ErrorBoundary } from './components';
// import { App } from './App';
//
// // Initialize the QueryClient
// const queryClient = new QueryClient();
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
//
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <QueryClientProvider client={queryClient}>
//                 <ErrorBoundary>
//                     <Router>
//                         <App />
//                     </Router>
//                 </ErrorBoundary>
//             </QueryClientProvider>
//         </Provider>
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './services/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from './components';
import { router } from './router';

// Initialize the QueryClient
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

