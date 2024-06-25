
import React from 'react';
import {Datagrid, List, TextField, Loading, EditButton, DeleteButton} from 'react-admin';

export const CategoryList = (props) => {

    if (!props) {
        return <Loading />;
    }

    return (
        <List {...props} resource="categories">
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

