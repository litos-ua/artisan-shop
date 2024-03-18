import React from 'react';
import './Footer.css';
import {ROUTE} from '../../router';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer__container">
            <div className="footer__row">
                <h1>Гаряча лінія:</h1>
                <a href="tel:0800000000" className="phone">0 800 000 000</a>
                <h1>Головний офіс:</h1>
                <a href="https://www.google.com.ua/maps/place/Hillel+IT+School/@50.4370536,30.530262,17z/data=!4m14!1m7!3m6!1s0x40d4cf07295b8e39:0x41f43bbd96473152!2sHillel+IT+School!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36!3m5!1s0x40d4cf07295b8e39:0x41f43bbd96473152!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36?hl=ru&entry=ttu" className="address__info">
                    Адреса: м. Реакт вул. Реактівська, 123
                </a>
            </div>

            <div className="footer__row">
                <h1>Покупцям</h1>
                <ul>
                    <li><Link to={ROUTE.DELIVERY}>Доставка і оплата</Link></li>
                    <li><Link to={ROUTE.WARRANTY}>Гарантія та повернення</Link></li>
                    <li><Link to={ROUTE.LOYALTY}>Програма лояльності</Link></li>
                    <li><Link to={ROUTE.GIFT_CARDS}>Подарункові карти</Link></li>
                </ul>
            </div>

            <div className="footer__row">
                <h1>Компанія</h1>
                <ul>
                    <li><Link to={ROUTE.ABOUT}>Про нас</Link></li>
                    <li><Link to={ROUTE.CONTACTS}>Контакти</Link></li>
                    <li><Link to={ROUTE.CAREER}>Кар'єра</Link></li>
                </ul>
            </div>

            <div className="footer__row">
                <h1>Допомога</h1>
                <ul>
                    <li><Link to={ROUTE.FAQ}>Питання та відповіді</Link></li>
                    <li><Link to={ROUTE.RETURNS}>Повернення товарів</Link></li>
                    <li><Link to={ROUTE.SERVICE_CENTER}>Сервісний центр</Link></li>
                </ul>
            </div>
        </footer>
    );
}