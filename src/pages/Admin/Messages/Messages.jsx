import React, { useEffect, useState } from 'react';
import { List, Datagrid, TextField, DateField, useDataProvider, useNotify, useRefresh, SimpleForm,
         TextInput, Create
} from 'react-admin';

export const MessageList = (props) => {
    const [messages, setMessages] = useState([]);
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    useEffect(() => {
        dataProvider.getList('messages', { userId: props.userId })
            .then(({ data }) => setMessages(data))
            .catch(error => notify(`Error: ${error.message}`, 'warning'));
    }, [dataProvider, notify, refresh, props.userId]);

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="sender.name" label="Sender" />
                <TextField source="receiver.name" label="Receiver" />
                <TextField source="message" />
                <DateField source="timestamp" />
            </Datagrid>
        </List>
    );
};

export const MessageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="receiver_id" />
            <TextInput source="message" multiline />
        </SimpleForm>
    </Create>
);
