
import React from 'react';
import { Admin, Menu, MenuItemLink, Resource } from 'react-admin';
import { dataProvider } from "../../api/dataProvider";
import { CategoryList } from "./Categories/Categories";
import { ProductList } from "./Products/Products";

const CustomMenu = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/dashboard/categories" primaryText="Categories" />
        <MenuItemLink to="/dashboard/products" primaryText="Products" />
    </Menu>
);

export const AdminPanel = () => (
    <Admin dataProvider={dataProvider} menu={CustomMenu}>
        <Resource name="categories" list={CategoryList} />
        <Resource name="products" list={ProductList} />
    </Admin>
);

