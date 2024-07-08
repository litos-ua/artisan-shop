import React from 'react';
import {
    List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm,
    TextInput, Create, Loading, ReferenceInput, SelectInput, NumberInput
} from 'react-admin';
//import {ItemCharacteristicsField} from './ItemCharacteristicsField';
import {CollapsibleItemCharacteristicsField} from "./CollapsibleItemCharacteristicsField";
import ItemCharacteristicsInput from './ItemCharacteristicsInput';
import CustomCancelToolbar from '../../../components/Admin/CustomCancelToolbar';
import CustomPagination from './../../../components/Admin/CustomPagination';


export const ProductList = (props) => {

    if (!props) {
        return <Loading />;
    }

    return(
    <List {...props} pagination={<CustomPagination />} perPage={8}>

        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="category.name" label="Category"/>
            <TextField source="image" />
            <TextField source="title" />
            {/*<ItemCharacteristicsField source="item_characteristics" />*/}
            <CollapsibleItemCharacteristicsField source="item_characteristics" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
    );
};

export const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <TextInput source="name" />
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="price" />
            <TextInput source="image" />
            <TextInput source="title" />
            <ItemCharacteristicsInput source="item_characteristics" />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />} >
            <TextInput source="name" />
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="price" />
            <TextInput source="image" />
            <TextInput source="title" />
            <ItemCharacteristicsInput source="item_characteristics" />
        </SimpleForm>
    </Create>
);


