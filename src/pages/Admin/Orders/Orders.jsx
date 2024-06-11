import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm,
    TextInput, Create } from 'react-admin';

export const OrderList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/orders" />
            <DeleteButton basePath="/orders" />
        </Datagrid>
    </List>
);

export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const OrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);


const Orders = () => {
    return <div>Orders Component</div>;
};

export default Orders;
