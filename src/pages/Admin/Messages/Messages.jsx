

import React, { useEffect, useState } from 'react';
import { List, Datagrid, TextField, DateField, SimpleForm, TextInput, ReferenceInput, SelectInput, Create, FunctionField } from 'react-admin';
import CustomPagination from './../../../components/Admin/CustomPagination';
import CustomCancelToolbar from '../../../components/Admin/CustomCancelToolbar';
import { getMessages } from "../../../api";

// Removing empty first and last names
const formatName = (firstName, lastName) => {
    const formattedFirstName = firstName === 'null' || firstName === null ? '' : firstName;
    const formattedLastName = lastName === 'null' || lastName === null ? '' : lastName;
    return `${formattedFirstName} ${formattedLastName}`.trim();
};

export const MessageList = ({ userId, adminId, ...props }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const fetchedMessages = await getMessages(userId, adminId, { Authorization: `Bearer ${token}` });
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [userId, adminId]);

    return (
        <List {...props} pagination={<CustomPagination />} perPage={10}>
            <Datagrid>
                <FunctionField
                    label="Sender"
                    render={record => formatName(record.sender_first_name, record.sender_last_name)}
                />
                <FunctionField
                    label="Receiver"
                    render={record => formatName(record.receiver_first_name, record.receiver_last_name)}
                />
                <TextField source="message" label="Message" />
                <DateField source="created_at" label="Date" />
            </Datagrid>
        </List>
    );
};

export const MessageCreate = (props) => {
    console.log('currentUserId:', props.currentUserId);
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CustomCancelToolbar />}>
                <ReferenceInput label="Receiver" source="receiver_id" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="message" multiline />
            </SimpleForm>
        </Create>
    );
};




