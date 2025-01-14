import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import "./orders.css";

const OrderTableComponent = ({ cartItems}) => {

    const { t } = useTranslation();

    if (!cartItems) {
        return null;
    }
    return (
        <Box className="order__table_container">
            <Table className="order__table" sx={{ '& .order__table_cell':
                    { fontSize: '1.1vw', color: 'blue', height: '4vh', padding:'0vh 0vw 0vh 1vw', margin:'0px' } }}
            >
                <TableHead className="order__table_head">
                    <TableRow className="order__table_row">
                        <TableCell className="order__table_product_key">{t('productName')}</TableCell>
                        <TableCell className="order__table_quantity">{t('quantity')}</TableCell>
                        <TableCell className="order__table_price">{t('price')}</TableCell>
                        <TableCell className="order__table_amount">{t('total')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {cartItems.map((item, index) => (
                        <TableRow key={index} className="order__table_cell">
                            <TableCell className="order__table_cell" >{item.productKey}</TableCell>
                            <TableCell className="order__table_cell">{item.quantityCount}</TableCell>
                            <TableCell className="order__table_cell">{item.price}</TableCell>
                            <TableCell className="order__table_cell">{parseInt(item.quantityCount) * parseInt(item.price)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>

    );
};

export default OrderTableComponent;

