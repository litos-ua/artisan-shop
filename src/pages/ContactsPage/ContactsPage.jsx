
import React from 'react';
import './ContactsPage.css';
import { Header, Footer } from "../../components";
import { useTranslation } from 'react-i18next';

export function ContactsPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div>
            <Header />
            <div className="contacts-page__content">
                <h1>{t('contactsTitle')}</h1>
                <p>{t('contactsDescription')}</p>

                <h2 className="contacts-page__content__h2">{t('contactsAddressTitle')}</h2>
                <a href="https://www.google.com.ua/maps/place/Hillel+IT+School/@50.4370536,30.530262,17z/data=!4m14!1m7!3m6!1s0x40d4cf07295b8e39:0x41f43bbd96473152!2sHillel+IT+School!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36!3m5!1s0x40d4cf07295b8e39:0x41f43bbd96473152!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36?hl=ru&entry=ttu">
                    {t('contactsAddress')}
                </a>

                <h2 className="contacts-page__content__h2">{t('contactsPhoneTitle')}</h2>
                <a href="tel:0800000000" className="phone">{t('contactsPhone')}</a>

                <h2 className="contacts-page__content__h2">{t('contactsEmailTitle')}</h2>
                <a href="mailto:react@example.com">{t('contactsEmail')}</a>

                <h2 className="contacts-page__content__h2">{t('contactsHoursTitle')}</h2>
                <p>{t('contactsHours')}</p>
            </div>
            <Footer />
        </div>
    );
}
