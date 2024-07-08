

// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField as MuiTextField, Button, Box, TablePagination } from '@mui/material';
// import { getMessages, sendMessage } from '../../api';
//
// const MessagesTable = ({ userId, adminId }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//
//     useEffect(() => {
//         fetchMessages();
//     }, []);
//
//     const fetchMessages = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const fetchedMessages = await getMessages(userId, adminId, { Authorization: `Bearer ${token}` });
//             //Descending Sort messages
//             setMessages(fetchedMessages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//         }
//     };
//
//     const handleSendMessage = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const messageData = {
//                 sender_id: userId,
//                 receiver_id: adminId,
//                 message: newMessage,
//             };
//             await sendMessage(messageData, { Authorization: `Bearer ${token}` });
//             setNewMessage('');
//             fetchMessages();
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };
//
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//     const formatName = (name) => (name === 'null' || name === null ? '' : name);
//
//     return (
//         <Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                 <Button variant="contained" color="primary" onClick={fetchMessages}>
//                     Get
//                 </Button>
//                 <MuiTextField
//                     fullWidth
//                     label="Type a message"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     sx={{ ml: 2 }}
//                 />
//                 <Button variant="contained" color="secondary" onClick={handleSendMessage} sx={{ ml: 2 }}>
//                     Send
//                 </Button>
//             </Box>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Sender</TableCell>
//                             <TableCell>Receiver</TableCell>
//                             <TableCell>Message</TableCell>
//                             <TableCell>Created At</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message) => (
//                             <TableRow key={message.id}>
//                                 <TableCell>{message.id}</TableCell>
//                                 <TableCell>{`${formatName(message.sender_first_name)} ${formatName(message.sender_last_name)}`}</TableCell>
//                                 <TableCell>{`${formatName(message.receiver_first_name)} ${formatName(message.receiver_last_name)}`}</TableCell>
//                                 <TableCell>{message.message}</TableCell>
//                                 <TableCell>{new Date(message.created_at).toLocaleString()}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={messages.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     sx={{ display: 'flex', justifyContent: 'center' }}
//                 />
//             </TableContainer>
//         </Box>
//     );
// };
//
// export default MessagesTable;

import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField as MuiTextField, Button, Box, TablePagination
} from '@mui/material';
import { getMessages, sendMessage } from '../../api';
import * as Yup from 'yup';
import { configObj } from '../../resources';

const MessagesTable = ({ userId, adminId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [error, setError] = useState('');

    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .required('Message is required')
            .max(150, 'Message must be at most 150 characters long'),
    });

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            //const token = localStorage.getItem('token');
            const token = configObj.getToken();
            const fetchedMessages = await getMessages(userId, adminId, { Authorization: `Bearer ${token}` });
            setMessages(fetchedMessages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        try {
            await validationSchema.validate({ message: newMessage });
            //const token = localStorage.getItem('token');
            const token = configObj.getToken();
            const messageData = {
                sender_id: userId,
                receiver_id: adminId,
                message: newMessage,
            };
            await sendMessage(messageData, { Authorization: `Bearer ${token}` });
            setNewMessage('');
            setError('');
            fetchMessages();
        } catch (error) {
            if (error.name === 'ValidationError') {
                setError(error.message);
            } else {
                console.error("Error sending message:", error);
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatName = (name) => (name === 'null' || name === null ? '' : name);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={fetchMessages}>
                    Get
                </Button>
                <MuiTextField
                    fullWidth
                    label="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ ml: 2 }}
                />
                <Button variant="contained" color="secondary" onClick={handleSendMessage} sx={{ ml: 2 }}>
                    Send
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Sender</TableCell>
                            <TableCell>Receiver</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message) => (
                            <TableRow key={message.id}>
                                <TableCell>{message.id}</TableCell>
                                <TableCell>{`${formatName(message.sender_first_name)} ${formatName(message.sender_last_name)}`}</TableCell>
                                <TableCell>{`${formatName(message.receiver_first_name)} ${formatName(message.receiver_last_name)}`}</TableCell>
                                <TableCell>{message.message}</TableCell>
                                <TableCell>{new Date(message.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={messages.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                />
            </TableContainer>
        </Box>
    );
};

export default MessagesTable;



