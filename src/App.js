// import React from "react";
// import { Header }  from "./components"
// import { Carousel } from './components';
// import { Footer } from "./components";
// import {ErrorBoundary}  from "./components";
// import {images} from "./resources";
//
// export function App () {
//
//     return (
//         <ErrorBoundary>
//             <div>
//                 <Header />
//                 <Carousel images={images} />
//                 <Footer />
//             </div>
//         </ErrorBoundary>)
// }





// import React, { useEffect } from 'react';
// import { Admin, Datagrid, List, Resource, TextField, Menu, MenuItemLink } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
//
// // Define the PostList component
// const PostList = (props) => {
//     useEffect(() => {
//         console.log('PostList props:', props);
//     }, [props]);
//
//     return (
//         <List {...props}>
//             <Datagrid>
//                 <TextField source="id" />
//                 <TextField source="title" />
//                 <TextField source="userId" />
//             </Datagrid>
//         </List>
//     );
// };
//
// // Initialize the data provider
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// dataProvider.getList('posts', {
//     pagination: { page: 1, perPage: 10 },
//     sort: { field: 'id', order: 'ASC' },
//     filter: {},
// }).then(response => {
//     console.log('Data provider response:', response);
// }).catch(error => {
//     console.error('Data provider error:', error);
// });
// console.log('Data Provider initialized:', dataProvider);
//
// // Define the custom Menu component
// const CustomMenu = (props) => (
//     <Menu {...props}>
//         <MenuItemLink to="posts" primaryText="Posts" />
//     </Menu>
// );
//
// // Define the main App component
// export const App = () => (
//     <Admin dataProvider={dataProvider} menu={CustomMenu}>
//         <Resource name="posts" list={PostList} />
//     </Admin>
// );
//
// export default App;



// import React, { useEffect } from 'react';
// import { Admin, Datagrid, List, Resource, TextField, Menu, MenuItemLink } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
//
// // Define the CategoryList component
// const CategoryList = (props) => {
//     useEffect(() => {
//         console.log('Category props:', props);
//     }, [props]);
//
//     return (
//         <List {...props}>
//             <Datagrid>
//                 <TextField source="id" />
//                 <TextField source="name" />
//             </Datagrid>
//         </List>
//     );
// };
//
// // Initialize the data provider
// const dataProvider = jsonServerProvider('http://192.168.0.31/api');
// dataProvider.getList('categories', {
//     pagination: { page: 1, perPage: 3 },
//     sort: { field: 'id', order: 'ASC' },
//     filter: {},
// }).then(response => {
//     console.log('Data provider response:', response);
// }).catch(error => {
//     console.error('Data provider error:', error);
// });
// console.log('Data Provider initialized:', dataProvider);
//
// // Define the custom Menu component
// const CustomMenu = (props) => (
//     <Menu {...props}>
//         <MenuItemLink to="categories" primaryText="Categories" />
//     </Menu>
// );
//
// // Define the main App component
// export const App = () => (
//     <Admin dataProvider={dataProvider} menu={CustomMenu}>
//         <Resource name="categories" list={CategoryList} />
//     </Admin>
// );
//
// export default App;





// import React from 'react';
// import { Admin, Resource, Menu, MenuItemLink } from 'react-admin';
// //import jsonServerProvider from 'ra-data-json-server';
// import {dataProvider} from "./api/dataProvider";
// import {CategoryList, ProductList} from './pages';
//
// // //Initialize the data provider
// // const dataProvider = jsonServerProvider('http://192.168.0.31/api/admin');
// // dataProvider.getList('products', {
// //     pagination: { page: 1, perPage: 3 },
// //     sort: { field: 'id', order: 'DESC' },
// //     filter: {},
// // }).then(response => {
// //     console.log('Data provider response:', response);
// // }).catch(error => {
// //     console.error('Data provider error:', error);
// // });
// // //console.log('Data Provider initialized:', dataProvider);
//
//
// const CustomMenu = (props) => (
//     <Menu {...props}>
//         <MenuItemLink to="categories" primaryText="Categories" />
//         <MenuItemLink to="products" primaryText="Products" />
//     </Menu>
// );
//
// export const App = () => (
//     <Admin
//         dataProvider={dataProvider}
//         menu={CustomMenu}
//         basename="/posts"
//     >
//          <Resource name="categories"  list={CategoryList} />
//          <Resource name="products"  list={ProductList} />
//     </Admin>
// );
//
//
// //export default App;





import React from 'react';
import { Header, Carousel, Footer, ErrorBoundary } from "./components";
import { images } from "./resources";

export const App = () => (
    <ErrorBoundary>
        <div>
            <Header />
            <Carousel images={images} />
            <Footer />
        </div>
    </ErrorBoundary>
);


