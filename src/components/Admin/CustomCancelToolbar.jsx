import React from 'react';
import { Toolbar, SaveButton, useRedirect } from 'react-admin';
import { Button } from '@mui/material';

const CustomToolbar = (props) => {
    const redirect = useRedirect();

    const handleCancel = () => {
        redirect('list', props.resource);
    };

    return (
        <Toolbar {...props}>
            <SaveButton />
            <Button variant="outlined" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                Cancel
            </Button>
        </Toolbar>
    );
};

export default CustomToolbar;
