
// import React from 'react';
// import { App } from '../App';
// import { Products } from '../pages';
// import { Cart } from '../pages';
// import { ProductsOfCategory } from "../pages";
// import { OrderForm } from "../pages";
// import { LoginPage } from "../pages";
// import { RegistrationPage } from "../pages";
// import { DeliveryPage } from "../pages";
// import { WarrantyPage } from "../pages";
// import { LoyaltyPage } from "../pages";
// import { GiftCardsPage } from "../pages";
// import { AboutPage } from "../pages";
// import { ContactsPage } from "../pages";
// import { CareerPage } from "../pages";
// import { FaqPage } from "../pages";
// import { ReturnsPage } from "../pages";
// import { ServiceCenterPage } from "../pages";
// import { SearchPage } from "../pages";
// import { EmailVerificationPage } from "../pages";
// import { CategoryList } from "../pages";
// import {CustomerAccountPage} from "../pages";
// import {QueryPage} from "../pages/Admin/QueryPage";
// import AdminPanel from "../pages/Admin/AdminPanel"
//
// import { useSelector } from 'react-redux';
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import { selectIsAuthenticated, selectUserRole } from '../ducks';
//
// export const ROUTE = {
//     HOME: "/*",
//     POSTS: "/posts/*",
//     DASHBOARD: "/Dashboard",
//     CATEGORIES: "/categories",
//     CATEGORY_CURRENT: "/Categories/:category",
//     PRODUCTS: "/Products",
//     PRODUCT_CURRENT: "/Products/:productKey",
//     CART: "/Cart",
//     ORDER_FORM: "/order_form",
//     LOGIN: "/login",
//     REGISTRATION: "/registration",
//     DELIVERY: "/delivery",
//     WARRANTY: "/warranty",
//     LOYALTY: "/loyalty",
//     GIFT_CARDS: "/giftCards",
//     ABOUT: "/about",
//     CONTACTS: "/contacts",
//     CAREER: "/career",
//     FAQ: "/faq",
//     RETURNS: "/returns",
//     SERVICE_CENTER: "/service-center",
//     SEARCH_RESULTS: "/search/:searchParam",
//     EMAIL_VERIFICATION: "/email/verify/:email",
//     CUSTOMER_ACCOUNT: "/customer/account",
//     QUERY: "/query",
// };
//
//
// const WithAuthCheck = ({ children }) => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//
//     if (!isAuthenticated) {
//         return <Navigate to={ROUTE.LOGIN} />;
//     }
//     return children; // If authenticated, render the children
// };
// //export default WithAuthCheck;
//
//
// const AdminRoute = ({ children }) => {
//     const isAuthenticated = useSelector(selectIsAuthenticated);
//     const userRole = useSelector(selectUserRole);
//
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }
//
//     if (userRole !== 3) { // Assuming 1 is the admin role
//         return <Navigate to="/unauthorized" />;
//     }
//
//     return children;
// };
//
// //export default AdminRoute;
//
//
// export const router = createBrowserRouter([
//     { path: ROUTE.HOME, element: <App /> },
//     { path: ROUTE.POSTS, element: <App /> },
//     { path: ROUTE.DASHBOARD, element: <AdminPanel/> }, // <AdminAccountPage /> will be delete
//     { path: ROUTE.CATEGORIES, element: <CategoryList/> },
//     { path: ROUTE.CATEGORY_CURRENT, element: <ProductsOfCategory /> },
//     { path: ROUTE.PRODUCTS, element: <Products /> },
//     { path: ROUTE.PRODUCT_CURRENT, element: <Products /> },
//     { path: ROUTE.CART, element: <Cart /> },
//     { path: ROUTE.LOGIN, element: <LoginPage /> },
//     { path: ROUTE.REGISTRATION, element: <RegistrationPage /> },
//     { path: ROUTE.DELIVERY, element: <DeliveryPage /> },
//     { path: ROUTE.WARRANTY, element: <WarrantyPage /> },
//     { path: ROUTE.LOYALTY, element: <LoyaltyPage /> },
//     { path: ROUTE.GIFT_CARDS, element: <GiftCardsPage /> },
//     { path: ROUTE.ABOUT, element: <AboutPage /> },
//     { path: ROUTE.CONTACTS, element: <ContactsPage /> },
//     { path: ROUTE.CAREER, element: <CareerPage /> },
//     { path: ROUTE.FAQ, element: <FaqPage /> },
//     { path: ROUTE.RETURNS, element: <ReturnsPage /> },
//     { path: ROUTE.SERVICE_CENTER, element: <ServiceCenterPage /> },
//     { path: ROUTE.SEARCH_RESULTS, element: <SearchPage /> },
//     { path: ROUTE.EMAIL_VERIFICATION, element: <EmailVerificationPage /> },
//     { path: ROUTE.QUERY, element: <QueryPage /> },
//     {
//         path: ROUTE.ORDER_FORM,
//         element: <WithAuthCheck><OrderForm /></WithAuthCheck>
//     },
//     // {
//     //     path: ROUTE.DASHBOARD, element: <WithAuthCheck><AdminDashboard/></WithAuthCheck>
//     // },
//     {
//         path: ROUTE.CUSTOMER_ACCOUNT, element: <WithAuthCheck><CustomerAccountPage /></WithAuthCheck>
//     },
// ]);

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
    { path: ROUTE.DASHBOARD, element: <AdminRoute><AdminPanel /></AdminRoute> },
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




