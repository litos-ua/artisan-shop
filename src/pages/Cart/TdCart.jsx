
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveCartItemToReduxStore, increment, decrement } from "../../ducks";

export const TdCart = ({ productKey, image, price, quantityCount, setQuantityCount, onDelete }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const cartData = {
            productKey,
            quantityCount,
            price,
            image,
        };
        dispatch(saveCartItemToReduxStore(cartData));
    }, [dispatch, productKey, image, price, quantityCount]);

    const handleIncrement = () => {
        dispatch(increment({ productKey }));
    };

    const handleDecrement = () => {
        dispatch(decrement({ productKey }));
    };

    return (
        <tr className="cart__table_row">
            <td className="cart__table_img">
                <img src={image} alt={productKey} />
            </td>
            <td className="cart__table_product_key">
                {productKey}
            </td>
            <td className="cart__table_product">
                <div className="cart__table_text">
                    <button
                        className="cart__table_quantity_btn"
                        onClick={handleDecrement}
                    >
                        -
                    </button>
                    <p>{quantityCount}</p>
                    <button
                        className="cart__table_quantity_btn"
                        onClick={handleIncrement}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="cart__table_product_price">{price}</td>
            <td className="cart__table_product_total">
                {quantityCount * parseInt(price)}
            </td>
            <td className="cart__table_product_delete">
                <button
                    className="cart__table_delete_btn"
                    onClick={() => onDelete(productKey)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
