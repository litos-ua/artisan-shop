import React from 'react';
import './DeliveryPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";
import {FOOTER_IMAGE} from "../../resources";

export function DeliveryPage() {
    return (
        <div>
            <Header/>
            <div className="delivery-page__content">
                <h1>Доставка і оплата</h1>

                <img
                    src={FOOTER_IMAGE.DELIVERY}
                    alt="Доставка і оплата"
                    className="delivery-image"
                />

                <p>
                    Ми пропонуємо різні способи доставки та оплати для вашого зручтва.
                    Зверніть увагу на наші послуги та умови, щоб зробити ваше замовлення
                    якомога приємнішим.
                </p>

                <h2>Способи доставки</h2>
                <ul className="delivery-page__ul">
                    <li>Кур'єрська доставка</li>
                    <li>Поштова служба</li>
                    <li>Самовивіз з пунктів видачі</li>
                </ul>

                <h2>Способи оплати</h2>
                <ul className="delivery-page__ul">
                    <li>Готівковий розрахунок при отриманні</li>
                    <li>Оплата банківською карткою онлайн</li>
                    <li>Інші зручні способи оплати</li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}