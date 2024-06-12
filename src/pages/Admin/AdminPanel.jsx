
import React from 'react';
import { Admin, Menu, MenuItemLink, Resource } from 'react-admin';
import { dataProvider } from "../../api/dataProvider";
import { CategoryList } from "./Categories";
import { CategoryCreate } from "./Categories";
import { CategoryEdit } from "./Categories";
import { ProductList } from "./Products/Products";
import {Dashboard} from "./AdminDashboard"
//import {CustomLayout} from "./CustomLayout";

const CustomMenu = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/dashboard/categories" primaryText="Categories" />
        <MenuItemLink to="/dashboard/products" primaryText="Products" />
    </Menu>
);

export const AdminPanel = () => (
    <Admin
        dataProvider={dataProvider}
        menu={CustomMenu}
        basename="/dashboard"
        dashboard={Dashboard}
        //layout={CustomLayout}
    >
        <Resource
            name="categories"
            list={CategoryList}
            create={CategoryCreate}
            edit={CategoryEdit}
        />
        <Resource name="products" list={ProductList} />
    </Admin>
);

