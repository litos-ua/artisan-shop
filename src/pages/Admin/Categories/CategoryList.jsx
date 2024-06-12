// import React, { useEffect } from 'react';
// import { Datagrid, List, TextField } from 'react-admin';
//
// // Define the CategoryList component
// const CategoryList = (props) => {
//     useEffect(() => {
//         console.log('Category props:', props);
//     }, [props]);
//
//     // Render nothing if props is empty or undefined
//     if (!props) {
//         return null;
//     }
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
// export default CategoryList;

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

// export default CategoryList;
