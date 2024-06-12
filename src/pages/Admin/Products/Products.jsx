import React from 'react';
import {
    List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm,
    TextInput, Create, Loading
} from 'react-admin';
import {ItemCharacteristicsField} from './ItemCharacteristicsField';

export const ProductList = (props) => {

    if (!props) {
        return <Loading />;
    }

    return(
    <List {...props} perPage={5}>

        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="category.name" label="Category"/>
            {/*<ReferenceField source="category_id" reference="categories">*/}
            {/*    <TextField source="name" />*/}
            {/*</ReferenceField>*/}
            <TextField source="price" />
            <ItemCharacteristicsField source="item_characteristics" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
    );
};

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

const Products = () => {
    return <div>Products Component</div>;
};

// export default Products;
