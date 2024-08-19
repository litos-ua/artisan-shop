
import React from 'react';
import './ServiceCenterPage.css';
import { Header } from "../../components";
import { Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function ServiceCenterPage() {
    const { t } = useTranslation('footerLocale');

    const serviceCenterServices = t('serviceCenterPage.services', { returnObjects: true });

    return (
        <div>
            <Header />
            <div className="service-center-page__content">
                <h1>{t('serviceCenterPage.title')}</h1>
                <p>{t('serviceCenterPage.description')}</p>

                <img
                    src={FOOTER_IMAGE.SERVICE_CENTER}
                    alt={t('serviceCenterPage.imageAlt')}
                    className="service-center-page__image"
                />

                <h2 className="service-center-page__content__h2">{t('serviceCenterPage.servicesTitle')}</h2>
                <ul>
                    {serviceCenterServices.map((service, index) => (
                        <li key={index}>{service}</li>
                    ))}
                </ul>

                <h2 className="service-center-page__content__h2">{t('serviceCenterPage.contactTitle')}</h2>
                <p>
                    {t('serviceCenterPage.contactIntro')}:{' '}
                    <span style={{ color: 'lightcoral', fontWeight: 'bold' }}>{t('serviceCenterPage.contactEmail')}</span>
                </p>
                <p>{t('serviceCenterPage.contactOutro')}</p>
            </div>
            <Footer />
        </div>
    );
}
