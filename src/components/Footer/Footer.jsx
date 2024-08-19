import React from 'react';
import './Footer.css';
import {ROUTE} from '../../router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="footer__container">
            <div className="footer__row">
                <h1>{t('hotLine')}</h1>
                <a href="tel:0800000000" className="phone">0 800 000 000</a>
                <h1>{t('headOffice')}</h1>
                <a href="https://www.google.com.ua/maps/place/Hillel+IT+School/@50.4370536,30.530262,17z/data=!4m14!1m7!3m6!1s0x40d4cf07295b8e39:0x41f43bbd96473152!2sHillel+IT+School!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36!3m5!1s0x40d4cf07295b8e39:0x41f43bbd96473152!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36?hl=ru&entry=ttu" className="address__info">
                    {t('headOfficeAddress')}
                </a>
            </div>

            <div className="footer__row">
                <h1>{t('forCustomers')}</h1>
                <ul>
                    <li><Link to={ROUTE.DELIVERY}>{t('deliveryPayments')}</Link></li>
                    <li><Link to={ROUTE.WARRANTY}>{t('warranty')}</Link></li>
                    <li><Link to={ROUTE.LOYALTY}>{t('loyaltyProgram')}</Link></li>
                    <li><Link to={ROUTE.GIFT_CARDS}>{t('giftCards')}</Link></li>
                </ul>
            </div>

            <div className="footer__row">
                <h1>{t('company')}</h1>
                <ul>
                    <li><Link to={ROUTE.ABOUT}>{t('about')}</Link></li>
                    <li><Link to={ROUTE.CONTACTS}>{t('contacts')}</Link></li>
                    <li><Link to={ROUTE.CAREER}>{t('career')}</Link></li>
                </ul>
            </div>

            <div className="footer__row">
                <h1>{t('help')}</h1>
                <ul>
                    <li><Link to={ROUTE.FAQ}>{t('questionsAndAnswers')}</Link></li>
                    <li><Link to={ROUTE.RETURNS}>{t('returnOfProducts')}</Link></li>
                    <li><Link to={ROUTE.SERVICE_CENTER}>{t('serviceCenter')}</Link></li>
                </ul>
            </div>
        </footer>
    );
}