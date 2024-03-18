
import React, { useEffect } from 'react';
import { Footer, Header } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
import { ROUTE } from '../../router';
import { TdCart } from './TdCart';
import { saveCartItemToReduxStore, removeCartItemFromReduxStore } from "../../ducks";

export const Cart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const productKey = queryParams.get('productKey');
    const price = queryParams.get('price');
    const image = queryParams.get('image');
    const allItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        if (productKey && price && image) {
            const cartData = {
                productKey,
                quantityCount: 1,
                price,
                image,
            };
            dispatch(saveCartItemToReduxStore(cartData));
        }
    }, [dispatch, productKey, price, image]);

    useEffect(() => {
    }, [allItems]);

    const handleDelete = (deletedProductKey) => {
        dispatch(removeCartItemFromReduxStore(deletedProductKey));
    };

    return (
        <div>
            <Header/>
            <div className="cart">
                <table className="cart__table">
                    <thead>
                    <tr className="cart__table_row">
                        <th></th>
                        <th className="cart__table_product_key">Product Name</th>
                        <th className="cart__table_quantity">Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {allItems.map((item, index) => (
                        <TdCart
                            key={index}
                            productKey={item.productKey}
                            image={item.image}
                            price={item.price}
                            quantityCount={item.quantityCount}
                            setQuantityCount={(quantity) => {
                            }}
                            onDelete={handleDelete}
                        />
                    ))}
                    </tbody>
                </table>
                <div className="cart__table_total_amount">
                    Total: {allItems.reduce((acc, item) => acc + (item.quantityCount * parseInt(item.price)), 0)}
                </div>
                <div className="cart__item_btn_group">
                    <button className="cart__item_btn" onClick={() => navigate(ROUTE.HOME)}>
                        Повернутись до пошуку товарів
                    </button>
                    <button className="cart__item_btn" onClick={() => navigate(ROUTE.ORDER_FORM)}>
                        Оформити замовлення
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
