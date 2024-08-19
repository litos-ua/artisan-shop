import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

export const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the Admin Panel" />
        <CardContent>
            <p>This is your admin dashboard. You can manage categories, products, and more from here.</p>
        </CardContent>
    </Card>
);

export default Dashboard;



