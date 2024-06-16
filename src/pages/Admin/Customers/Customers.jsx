
import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, Edit, SimpleForm, TextInput } from 'react-admin';
import CustomPagination from './../../../components/Admin/CustomPagination';
import CustomCancelToolbar from "../../../components/Admin/CustomCancelToolbar";


export const CustomerList = (props) => (
    <List {...props} pagination={<CustomPagination />} perPage={10}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
            <TextField source="phone_number" />
            <TextField source="zip_code" />
            <TextField source="address" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const CustomerEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="phone_number" />
            <TextInput source="zip_code" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);

