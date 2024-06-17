import React from 'react';
import {
    List, Datagrid, TextField, NumberField, EditButton, DeleteButton, Edit,
    SimpleForm, TextInput, NumberInput, Create, Show, SimpleShowLayout, SelectInput,
} from 'react-admin';
import CustomPagination from './../../../components/Admin/CustomPagination';
import CustomCancelToolbar from '../../../components/Admin/CustomCancelToolbar';


//Order List Component
export const OrderList = (props) => (
    <List {...props} pagination={<CustomPagination />} perPage={10}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="delivery_requirement" />
            <TextField source="received_status" />
            <TextField source="type_of_payment" />
            <TextField source="payment_status" />
            <NumberField source="advance_payment" />
            <TextField source="customer_notes" />
            <TextField source="customer.first_name" label="Customer First Name" />
            <TextField source="customer.last_name" label="Customer Last Name" />
            <TextField source="order_details" label="Order Details" />
            <NumberField source="total_amount" label="Total Amount" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <SelectInput source="delivery_requirement" choices={[
                { id: 0, name: 'Pickup' },
                { id: 1, name: 'Delivery' },
            ]} />
            <SelectInput source="received_status" choices={[
                { id: 0, name: 'Pending' },
                { id: 1, name: 'Received' },
            ]} />
            <SelectInput source="type_of_payment" choices={[
                { id: 'Cash', name: 'Cash' },
                { id: 'Card', name: 'Card' },
            ]} />
            <SelectInput source="payment_status" choices={[
                { id: 0, name: 'Paid' },
                { id: 1, name: 'Not paid' },
            ]} />
            <SelectInput source="advance_payment" choices={[
                { id: 0, name: 'Payment upon receipt' },
                { id: 1, name: 'Prepayment' },
            ]} />
            <TextInput source="customer_notes" />
        </SimpleForm>
    </Create>
);

// Order Edit Component
export const OrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomCancelToolbar />}>
            <SelectInput source="delivery_requirement" choices={[
                { id: 0, name: 'Pickup' },
                { id: 1, name: 'Delivery' },
            ]} />
            <SelectInput source="received_status" choices={[
                { id: 0, name: 'Pending' },
                { id: 1, name: 'Received' },
            ]} />
            <SelectInput source="type_of_payment" choices={[
                { id: 'Cash', name: 'Cash' },
                { id: 'Card', name: 'Card' },
            ]} />
            <SelectInput source="payment_status" choices={[
                { id: 0, name: 'Paid' },
                { id: 1, name: 'Not paid' },
            ]} />
            <SelectInput source="advance_payment" choices={[
                { id: 0, name: 'Payment upon receipt' },
                { id: 1, name: 'Prepayment' },
            ]} />
            <TextInput source="customer_notes" />
        </SimpleForm>
    </Edit>
);

// Order Show Component
export const OrderShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="delivery_requirement" />
            <TextField source="received_status" />
            <TextField source="type_of_payment" />
            <TextField source="payment_status" />
            <NumberField source="advance_payment" />
            <TextField source="customer_notes" />
        </SimpleShowLayout>
    </Show>
);

