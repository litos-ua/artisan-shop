import React from 'react';
import { Layout, Menu } from 'react-admin';
import { Card, CardContent, CardHeader } from '@mui/material';

const CustomMenu = (props) => (
    <Menu {...props} />
);

export const CustomLayout = (props) => (
    <Layout
        {...props}
        menu={CustomMenu}
    >
        {props.children} {/* This is where the main content will be rendered */}
        <Card>
            <CardHeader title="Welcome to the Admin Panel" />
            <CardContent>
                {/* Add any custom content here */}
                <p>This is your Custom Layout. You can manage categories, products, and more from here.</p>
            </CardContent>
        </Card>
    </Layout>
);
