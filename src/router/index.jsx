
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
    EmailVerificationPage, ProductsOfCategory, Cart, OrderForm, LoginPage, RegistrationPage,
    DeliveryPage, WarrantyPage, LoyaltyPage, GiftCardsPage, AboutPage, ContactsPage, Products,
    CareerPage, FaqPage, ReturnsPage, ServiceCenterPage, SearchPage, CustomerAccountPage,
} from '../pages';
import { AdminPanel } from '../pages/Admin';
import { App } from '../App';
import { AdminRoute } from './AdminRoute';
import { WithAuthCheck } from './WithAuthCheck'
import {ErrorBoundary} from './../components/Errors';

export const ROUTE = {
    HOME: "/*",
    DASHBOARD: "/dashboard/*",
    DASHBOARD1: "/dashboard",
    CATEGORY_CURRENT: "/categories/:category",
    //PRODUCTS: "/products",
    PRODUCT_CURRENT: "/products/:productKey",
    CART: "/cart",
    ORDER_FORM: "/order_form",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    DELIVERY: "/delivery",
    WARRANTY: "/warranty",
    LOYALTY: "/loyalty",
    GIFT_CARDS: "/giftcards",
    ABOUT: "/about",
    CONTACTS: "/contacts",
    CAREER: "/career",
    FAQ: "/faq",
    RETURNS: "/returns",
    SERVICE_CENTER: "/service-center",
    SEARCH_RESULTS: "/search/:searchParam",
    EMAIL_VERIFICATION: "/email/verify/:email",
    CUSTOMER_ACCOUNT: "/customer/account",
};

export const router = createBrowserRouter([
    { path: ROUTE.HOME, element: <ErrorBoundary><App /></ErrorBoundary> },
    { path: ROUTE.DASHBOARD, element: <WithAuthCheck>
                                            <AdminRoute>
                                                <ErrorBoundary>
                                                    <AdminPanel />
                                                </ErrorBoundary>
                                            </AdminRoute>
                                      </WithAuthCheck> },
    { path: ROUTE.CATEGORY_CURRENT, element: <ErrorBoundary><ProductsOfCategory /></ErrorBoundary> },
    //{ path: ROUTE.PRODUCTS, element: <ErrorBoundary><Products /></ErrorBoundary> },
    { path: ROUTE.PRODUCT_CURRENT, element: <ErrorBoundary><Products /></ErrorBoundary> },
    { path: ROUTE.CART, element: <ErrorBoundary><Cart /></ErrorBoundary> },
    { path: ROUTE.ORDER_FORM, element: <WithAuthCheck>
                                            <ErrorBoundary>
                                                    <OrderForm />
                                            </ErrorBoundary>
                                       </WithAuthCheck> },
    { path: ROUTE.LOGIN, element: <ErrorBoundary><LoginPage /></ErrorBoundary> },
    { path: ROUTE.REGISTRATION, element: <ErrorBoundary><RegistrationPage /></ErrorBoundary> },
    { path: ROUTE.DELIVERY, element: <ErrorBoundary><DeliveryPage /></ErrorBoundary> },
    { path: ROUTE.WARRANTY, element: <ErrorBoundary><WarrantyPage /></ErrorBoundary> },
    { path: ROUTE.LOYALTY, element: <ErrorBoundary><LoyaltyPage /></ErrorBoundary> },
    { path: ROUTE.GIFT_CARDS, element: <ErrorBoundary><GiftCardsPage /></ErrorBoundary> },
    { path: ROUTE.ABOUT, element: <ErrorBoundary><AboutPage /></ErrorBoundary> },
    { path: ROUTE.CONTACTS, element: <ErrorBoundary><ContactsPage /></ErrorBoundary> },
    { path: ROUTE.CAREER, element: <ErrorBoundary><CareerPage /></ErrorBoundary> },
    { path: ROUTE.FAQ, element: <ErrorBoundary><FaqPage /></ErrorBoundary> },
    { path: ROUTE.RETURNS, element: <ErrorBoundary><ReturnsPage /></ErrorBoundary> },
    { path: ROUTE.SERVICE_CENTER, element: <ErrorBoundary><ServiceCenterPage /></ErrorBoundary> },
    { path: ROUTE.SEARCH_RESULTS, element: <ErrorBoundary><SearchPage /></ErrorBoundary> },
    { path: ROUTE.EMAIL_VERIFICATION, element: <ErrorBoundary><EmailVerificationPage /></ErrorBoundary> },
    { path: ROUTE.CUSTOMER_ACCOUNT, element: <WithAuthCheck>
                                                <ErrorBoundary>
                                                    <CustomerAccountPage />
                                                </ErrorBoundary>
                                             </WithAuthCheck> },
]);







