import React from 'react';
import { Pagination } from 'react-admin';

const CustomPagination = (props) => {
    return (
        <Pagination
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                'ul.MuiPagination-ul': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    listStyle: 'none',
                    paddingBottom: '3vh',
                },
            }}
            {...props}
        />
    );
};

export default CustomPagination;
