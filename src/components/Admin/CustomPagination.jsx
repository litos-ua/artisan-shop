import React from 'react';
import { Pagination } from 'react-admin';

const CustomPagination = (props) => {
    return (
        <Pagination
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // Ensure the container itself centers its children vertically
                'ul.MuiPagination-ul': {
                    display: 'flex',
                    alignItems: 'center', // Center all items in the ul vertically
                    justifyContent: 'center', // Center all items in the ul horizontally
                    listStyle: 'none',
                    paddingBottom: '3vh',
                },
            }}
            {...props}
        />
    );
};

export default CustomPagination;
