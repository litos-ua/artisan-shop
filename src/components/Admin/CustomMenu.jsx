import {Menu, MenuItemLink} from "react-admin";
import React from "react";

export const CustomMenu = (props) => (
    <Menu {...props}
          sx={{
              marginTop: '3vh', //it is real correct vertical margin
              '& .RaMenuItemLink-root': { marginTop: '2vh' },
          }}
    >
        <MenuItemLink to="/dashboard/categories" primaryText="Categories" />
        <MenuItemLink to="/dashboard/products" primaryText="Products" />
        <MenuItemLink to="/dashboard/users" primaryText="Users" />
        <MenuItemLink to="/dashboard/customers" primaryText="Customers" />
        <MenuItemLink to="/dashboard/orders" primaryText="Orders" />
    </Menu>
);