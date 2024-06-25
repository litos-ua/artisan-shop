

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
    { path: ROUTE.HOME, element: <App /> },
    { path: ROUTE.DASHBOARD, element: <WithAuthCheck><AdminRoute><AdminPanel /></AdminRoute></WithAuthCheck> },
    { path: ROUTE.CATEGORY_CURRENT, element: <ProductsOfCategory /> },
    //{ path: ROUTE.PRODUCTS, element: <Products /> },
    { path: ROUTE.PRODUCT_CURRENT, element: <Products /> },
    { path: ROUTE.CART, element: <Cart /> },
    { path: ROUTE.ORDER_FORM, element: <WithAuthCheck><OrderForm /></WithAuthCheck> },
    { path: ROUTE.LOGIN, element: <LoginPage /> },
    { path: ROUTE.REGISTRATION, element: <RegistrationPage /> },
    { path: ROUTE.DELIVERY, element: <DeliveryPage /> },
    { path: ROUTE.WARRANTY, element: <WarrantyPage /> },
    { path: ROUTE.LOYALTY, element: <LoyaltyPage /> },
    { path: ROUTE.GIFT_CARDS, element: <GiftCardsPage /> },
    { path: ROUTE.ABOUT, element: <AboutPage /> },
    { path: ROUTE.CONTACTS, element: <ContactsPage /> },
    { path: ROUTE.CAREER, element: <CareerPage /> },
    { path: ROUTE.FAQ, element: <FaqPage /> },
    { path: ROUTE.RETURNS, element: <ReturnsPage /> },
    { path: ROUTE.SERVICE_CENTER, element: <ServiceCenterPage /> },
    { path: ROUTE.SEARCH_RESULTS, element: <SearchPage /> },
    { path: ROUTE.EMAIL_VERIFICATION, element: <EmailVerificationPage /> },
    { path: ROUTE.CUSTOMER_ACCOUNT, element: <WithAuthCheck><CustomerAccountPage /></WithAuthCheck> },
]);




