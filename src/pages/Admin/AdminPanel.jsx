
import React from 'react';
import { Admin,  Resource, defaultTheme } from 'react-admin';
import { createTheme } from '@mui/material/styles';
import { dataProvider } from "../../api/dataProvider";
import { CategoryList } from "./Categories";
import { CategoryCreate } from "./Categories";
import { CategoryEdit } from "./Categories";
import {ProductCreate, ProductEdit, ProductList} from "./Products/Products";
import {Dashboard} from "./AdminDashboard"
import {CustomLayout} from "../../components"
import { UserList, UserEdit, UserShow } from "./Users/Users";
import { CustomerList, CustomerEdit } from "./Customers/Customers";


const lightTheme = defaultTheme;
const darkTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
    },
});

export const AdminPanel = () => (
    <Admin
        dataProvider={dataProvider}
        //menu={CustomMenu}
        basename="/dashboard"
        dashboard={Dashboard}
        layout={CustomLayout}
        theme={lightTheme}
        darkTheme={darkTheme}
    >
        <Resource
            name="categories"
            list={CategoryList}
            create={CategoryCreate}
            edit={CategoryEdit}
        />
        <Resource
            name="products"
            list={ProductList}
            create={ProductCreate}
            edit={ProductEdit}
        />
        <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            show={UserShow}
        />
        <Resource
            name="customers"
            list={CustomerList}
            edit={CustomerEdit}
        />
    </Admin>
);

