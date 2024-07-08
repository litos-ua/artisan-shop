
// import React from 'react';
// import {Datagrid, List, TextField, Loading, EditButton, DeleteButton} from 'react-admin';
//
// export const CategoryList = (props) => {
//
//     if (!props) {
//         return <Loading />;
//     }
//
//     return (
//         <List {...props} resource="categories">
//             <Datagrid>
//                 <TextField source="id" />
//                 <TextField source="name" />
//                 <EditButton />
//                 <DeleteButton />
//             </Datagrid>
//         </List>
//     );
// };

import React from 'react';
import {Datagrid, List, TextField, Loading, EditButton, DeleteButton} from 'react-admin';
import CustomPagination from './../../../components/Admin/CustomPagination';

export const CategoryList = (props) => {

    if (!props) {
        return <Loading />;
    }

    return (
        <List {...props} pagination={<CustomPagination/>} perPage={8}  >
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

