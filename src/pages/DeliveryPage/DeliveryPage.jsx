
import React from 'react';
import './DeliveryPage.css';
import { Header, Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function DeliveryPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div>
            <Header />
            <div className="delivery-page__content">
                <h1>{t('deliveryPayment')}</h1>

                <img
                    src={FOOTER_IMAGE.DELIVERY}
                    alt={t('deliveryImageAlt')}
                    className="delivery-image"
                />

                <p>{t('deliveryDescription')}</p>

                <h2>{t('deliveryMethods')}</h2>
                <ul className="delivery-page__ul">
                    <li>{t('courierDelivery')}</li>
                    <li>{t('postalService')}</li>
                    <li>{t('pickup')}</li>
                </ul>

                <h2>{t('paymentMethods')}</h2>
                <ul className="delivery-page__ul">
                    <li>{t('cashOnDelivery')}</li>
                    <li>{t('onlineCardPayment')}</li>
                    <li>{t('otherPaymentMethods')}</li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}
