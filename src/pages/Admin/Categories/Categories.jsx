// import React from 'react';
// import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm,
//           TextInput, Create, useResourceContext } from 'react-admin';
//
// // export const CategoryList = (props) => (
// //     <List {...props}>
// //         <Datagrid>
// //             <TextField source="id" />
// //             <TextField source="name" />
// //             <EditButton basePath="/categories" />
// //             <DeleteButton basePath="/categories" />
// //         </Datagrid>
// //     </List>
// // );
//
// const ResourceName = () => {
//     const resource = useResourceContext();
//     return <>{resource}</>;
// }
//
// export const CategoryList = () => (
//     <List>
//         <>
//             <ResourceName /> {/* renders 'posts' */}
//             <Datagrid>
//                 <TextField source="id" />
//                 <TextField source="name" />
//             </Datagrid>
//         </>
//     </List>
// )
//
// // export const CategoryCreate = (props) => (
// //     <Create {...props}>
// //         <SimpleForm>
// //             <TextInput source="name" />
// //         </SimpleForm>
// //     </Create>
// // );
// //
// // export const CategoryEdit = (props) => (
// //     <Edit {...props}>
// //         <SimpleForm>
// //             <TextInput source="name" />
// //         </SimpleForm>
// //     </Edit>
// // );
//
// const Categories = () => {
//     return <div>Categories Component</div>;
// };
//
// export default Categories;

// import React from 'react';
// import { List, Datagrid, TextField } from 'react-admin';
// import { useQuery } from 'react-query';
//
// const fetchCategories = async () => {
//     const response = await fetch('http://192.168.0.31/api/categories');
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// };
//
// export const CategoryList = () => {
//     const { data, error, isLoading } = useQuery('categories', fetchCategories);
//
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>An error has occurred: {error.message}</div>;
//
//     return (
//         <List>
//             <Datagrid>
//                 {data.categories.map((category) => (
//                     <TextField key={category.id} source="name" />
//                 ))}
//             </Datagrid>
//         </List>
//     );
// };

import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';


export const CategoryList = (props) => {

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
            </Datagrid>
        </List>
    );
};
