import React, { useState } from 'react';
import './FaqPage.css';
import { Header } from "../../components";
import { Footer } from "../../components";
import {Dropdown} from "./DropDown";
import {FOOTER_IMAGE} from "../../resources";

export function FaqPage() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1);
    };
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };
    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
    };

    return (
        <div>
            <Header/>
            <div className="faq-page__content">
                <h1>Питання та відповіді</h1>
                <p>
                    Нижче наведено найпоширеніші запитання та відповіді на них.
                    Якщо у вас виникли інші питання, будь ласка, зв'яжіться з нашим
                    відділом обслуговування клієнтів.
                </p>

                <h2 className="faq-page__content__h2">Часто задаються питання:</h2>

                <img
                    src={FOOTER_IMAGE.FAQ}
                    alt="Про нас"
                    className="faq-page__image"
                />

                <ul className="faq-page__arrow">
                    <Dropdown question="Які способи оплати ви приймаєте?" isOpen={isOpen1} toggle={toggleDropdown1}
                              answer="Ми приймаємо оплату готівкою, банківським переказом та кредитними картками"/>

                    <Dropdown question="Як довго триває доставка замовлення?" isOpen={isOpen2} toggle={toggleDropdown2}
                              answer="Термін доставки залежить від місця доставки та обраного методу доставки."/>

                    <Dropdown question="Чи можу я повернути товар?" isOpen={isOpen3} toggle={toggleDropdown3}
                              answer="Так, ви можете повернути товар упродовж 14 днів з моменту його отримання."/>
                </ul>
            </div>
            <Footer/>
        </div>
    );
}
