
import React from 'react';
import './AboutPage.css';
import { Header, Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function AboutPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div>
            <Header />
            <div className="about-page__content">
                <h1>{t('aboutTitle')}</h1>
                <p>{t('aboutText1')}</p>

                <img
                    src={FOOTER_IMAGE.ABOUT}
                    alt={t('aboutAlt')}
                    className="about-page__image"
                />

                <h2 className="about-page__content__h2">{t('aboutMissionTitle')}</h2>
                <p>{t('aboutMissionText')}</p>

                <h2 className="about-page__content__h2">{t('aboutValuesTitle')}</h2>
                <ul>
                    <li>{t('aboutValueQuality')}</li>
                    <li>{t('aboutValueReliability')}</li>
                    <li>{t('aboutValueProfessionalism')}</li>
                    <li>{t('aboutValueResponsibility')}</li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}
