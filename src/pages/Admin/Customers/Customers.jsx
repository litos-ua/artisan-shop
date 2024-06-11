import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm,
    TextInput, Create } from 'react-admin';


export const CustomerList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton basePath="/customers" />
            <DeleteButton basePath="/customers" />
        </Datagrid>
    </List>
);

export const CustomerCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const CustomerEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

const Customers = () => {
    return <div>Customers Component</div>;
};

export default Customers;
