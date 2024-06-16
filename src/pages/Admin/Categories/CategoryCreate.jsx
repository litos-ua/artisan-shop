import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import CustomCancelToolbar from '../../../components/Admin/CustomCancelToolbar';

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
