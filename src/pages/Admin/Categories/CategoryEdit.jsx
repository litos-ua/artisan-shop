import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import CustomCancelToolbar from '../../../components/Admin/CustomCancelToolbar'

export const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);
