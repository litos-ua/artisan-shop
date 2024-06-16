
import React from 'react';
import {
            List, Datagrid, TextField, EmailField, EditButton, DeleteButton,
            Edit, SimpleForm, TextInput, SelectInput, Show, SimpleShowLayout,
        } from 'react-admin';
import CustomPagination from './../../../components/Admin/CustomPagination';
import CustomCancelToolbar from "../../../components/Admin/CustomCancelToolbar";


export const UserList = (props) => (
    <List {...props} pagination={<CustomPagination />} perPage={10}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);



export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <SelectInput source="role" choices={[
                { id: 1, name: 'User' },
                { id: 2, name: 'Moderator' },
                { id: 3, name: 'Admin' },
            ]} />
        </SimpleForm>
    </Edit>
);



export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout toolbar={<CustomCancelToolbar />}>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="role" />
        </SimpleShowLayout>
    </Show>
);
