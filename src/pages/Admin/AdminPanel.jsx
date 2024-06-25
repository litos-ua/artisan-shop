
import React from 'react';
import { Admin, Resource} from 'react-admin';
import { useSelector } from 'react-redux';
import { dataProvider } from "../../api/dataProvider";
import { CategoryList, CategoryCreate, CategoryEdit } from "./Categories";
import { ProductCreate, ProductEdit, ProductList } from "./Products";
import { Dashboard } from "./AdminDashboard";
import { CustomLayout } from "../../components";
import { UserList, UserEdit, UserShow } from "./Users";
import { CustomerList, CustomerEdit } from "./Customers";
import { OrderList, OrderCreate, OrderEdit, OrderShow } from './Orders';
import { MessageList, MessageCreate } from './Messages';
import { selectUserId } from '../../ducks';
import { lightTheme, darkTheme } from '../../components';
import { configObj } from "../../resources";

export const AdminPanel = () => {
    const userId = useSelector(selectUserId);
    const currentUserId = userId;
    const adminId = configObj.adminUserId;


    return (
        <Admin
            dataProvider={dataProvider}
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
            <Resource
                name="orders"
                list={OrderList}
                create={OrderCreate}
                edit={OrderEdit}
                show={OrderShow}
            />
            <Resource
                name="messages"
                list={(props) => <MessageList {...props} userId={currentUserId} adminId={adminId} />}
                create={(props) => <MessageCreate {...props} currentUserId={currentUserId} />} // Pass currentUserId here
            />
        </Admin>
    );
};
