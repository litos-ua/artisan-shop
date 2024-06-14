
import React from 'react';
import { Admin,  Resource } from 'react-admin';
import { dataProvider } from "../../api/dataProvider";
import { CategoryList } from "./Categories";
import { CategoryCreate } from "./Categories";
import { CategoryEdit } from "./Categories";
import {ProductCreate, ProductEdit, ProductList} from "./Products/Products";
import {Dashboard} from "./AdminDashboard"
import {CustomLayout} from "../../components"


//Menu, MenuItemLink, CustomMenu
// const CustomMenu = (props) => (
//     <Menu {...props}>
//         <MenuItemLink to="/dashboard/categories" primaryText="Categories" />
//         <MenuItemLink to="/dashboard/products" primaryText="Products" />
//     </Menu>
// );

export const AdminPanel = () => (
    <Admin
        dataProvider={dataProvider}
        //menu={CustomMenu}
        basename="/dashboard"
        dashboard={Dashboard}
        layout={CustomLayout}
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
    </Admin>
);

