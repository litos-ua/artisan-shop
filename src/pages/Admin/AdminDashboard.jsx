// import React, { useState } from 'react';
// import { Box, Card, CardHeader, CardContent, List, ListItem, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Header } from '../../components';
// import AdminPanel from './AdminPanel';
// import Categories from './Categories/Categories';
// import Products from './Products/Products';
// import Customers from './Customers/Customers';
// import Orders from './Orders/Orders';
// import Messages from './Messages/Messages';
// import Logout from './Logout/Logout';
//
// export const AdminDashboard = () => {
//         const [activeMenuItem, setActiveMenuItem] = useState('Categories');
//         const [content, setContent] = useState(<Categories />);
//         const navigate = useNavigate();
//
//         const handleMenuItemClick = (menuItem) => {
//                 setActiveMenuItem(menuItem);
//                 switch (menuItem) {
//                         case 'Categories':
//                                 setContent(<Categories />);
//                                 break;
//                         case 'Products':
//                                 setContent(<Products />);
//                                 break;
//                         case 'Customers':
//                                 setContent(<Customers />);
//                                 break;
//                         case 'Orders':
//                                 setContent(<Orders />);
//                                 break;
//                         case 'Messages':
//                                 setContent(<Messages />);
//                                 break;
//                         case 'Logout':
//                                 setContent(<Logout />);
//                                 break;
//                         default:
//                                 break;
//                 }
//         };
//
//         return (
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
//                     <Header />
//                     <Box sx={{ display: 'flex', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
//                             <Box sx={{ backgroundColor: '#1b80e4', padding: '0.5vw', width: '14vw' }}>
//                                     <List>
//                                             {['Categories', 'Products', 'Customers', 'Orders', 'Messages', 'Logout'].map((text) => (
//                                                 <ListItem button
//                                                           key={text}
//                                                           sx={{
//                                                                   borderRadius: '0.5rem',
//                                                                   '&:hover': { backgroundColor: '#5fa6ec' },
//                                                                   backgroundColor: activeMenuItem === text ? '#5fa6ec' : 'transparent'
//                                                           }}
//                                                           onClick={() => handleMenuItemClick(text)}
//                                                 >
//                                                         <ListItemText primary={text} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
//                                                 </ListItem>
//                                             ))}
//                                     </List>
//                             </Box>
//                             <Box sx={{ marginLeft: '3.5vw', marginRight: '3vw', flexGrow: 1 }}>
//                                     <Card sx={{ marginBottom: '0.5vw', backgroundColor: '#ffffb3', borderRadius: '1rem', border: '2px solid #bfbfbf' }}>
//                                             <CardHeader title={`Admin Dashboard: ${activeMenuItem}`} sx={{ marginBottom: 0, paddingBottom: 0 }} />
//                                             <CardContent>
//                                                     {content}
//                                             </CardContent>
//                                     </Card>
//                             </Box>
//                     </Box>
//             </Box>
//         );
// };
//
// export default AdminDashboard;

// import React, { useState } from 'react';
// //import { Admin, Resource } from 'react-admin';
// import {Box, Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Header } from '../../components';
// import Categories from './Categories/Categories';
// import Products from './Products/Products';
// import Customers from './Customers/Customers';
// import Orders from './Orders/Orders';
// import Messages from './Messages/Messages';
// import Logout from './Logout/Logout';
// import AdminPanel from './AdminPanel';
// import dataProvider from '../../api/dataProvider';
// import { CategoryList, CategoryCreate, CategoryEdit } from './Categories/Categories';
// // import { ProductList, ProductCreate, ProductEdit } from './Products/Products';
// // import { CustomerList, CustomerCreate, CustomerEdit } from './Customers/Customers';
// // import { OrderList, OrderCreate, OrderEdit } from './Orders/Orders';
//
// const AdminComponent = () => {
//
//         return <div >Admin Component</div>;
// };
//
// export const AdminDashboard = () => {
//
//         const [activeMenuItem, setActiveMenuItem] = useState('Categories');
//         const [content, setContent] = useState(<Categories />);
//         const navigate = useNavigate();
//
//         const handleMenuItemClick = (menuItem) => {
//                 setActiveMenuItem(menuItem);
//                 switch (menuItem) {
//                         case 'Categories':
//                                 setContent(<Categories />);
//                                 break;
//                         case 'Products':
//                                 setContent(<Products />);
//                                 break;
//                         case 'Customers':
//                                 setContent(<Customers />);
//                                 break;
//                         case 'Orders':
//                                 setContent(<Orders />);
//                                 break;
//                         case 'Messages':
//                                 setContent(<Messages />);
//                                 break;
//                         case 'AdminPanel':
//                                 setContent(<AdminPanel />);
//                                 //setContent(<AdminComponent />)
//                                 break;
//                         case 'Logout':
//                                 setContent(<Logout />);
//                                 break;
//                         default:
//                                 break;
//                 }
//         };
//
//         return (
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
//                     <Header />
//                     <Box sx={{ display: 'flex', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
//                             <Box sx={{ display: 'flex', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
//                                     <Box sx={{ backgroundColor: '#1b80e4', padding: '0.5vw', width: '14vw' }}>
//                                             <List>
//                                                     {['Categories', 'Products', 'Customers', 'Orders', 'Messages', 'AdminPanel', 'Logout'].map((text) => (
//                                                         <ListItem button
//                                                                   key={text}
//                                                                   sx={{
//                                                                           borderRadius: '0.5rem',
//                                                                           '&:hover': { backgroundColor: '#5fa6ec' },
//                                                                           backgroundColor: activeMenuItem === text ? '#5fa6ec' : 'transparent'
//                                                                   }}
//                                                                   onClick={() => handleMenuItemClick(text)}
//                                                         >
//                                                                 <ListItemText primary={text} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
//                                                         </ListItem>
//                                                     ))}
//                                             </List>
//                                     </Box>
//                                     <Box sx={{ marginLeft: '3.5vw', marginRight: '3vw', flexGrow: 1 }}>
//                                             <Card sx={{ marginBottom: '0.5vw', backgroundColor: '#ffffb3', borderRadius: '1rem', border: '2px solid #bfbfbf' }}>
//                                                     <CardHeader title={`Admin Dashboard: ${activeMenuItem}`} sx={{ marginBottom: 0, paddingBottom: 0 }} />
//                                                     <CardContent>
//                                                             {content}
//                                                     </CardContent>
//                                             </Card>
//                                     </Box>
//                             </Box>
//                     </Box>
//             </Box>
//         );
// };
//
// export default AdminDashboard;


