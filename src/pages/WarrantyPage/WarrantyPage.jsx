
import React from 'react';
import './WarrantyPage.css';
import { Header, Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function WarrantyPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div>
            <Header />
            <h1>{t('warrantyTitle')}</h1>
            <div className="warranty-page">
                <div className="warranty-section">
                    <p>{t('warrantyText1')}</p>
                    <img
                        src={FOOTER_IMAGE.WARRANTY_1}
                        alt={t('warrantyAlt1')}
                        className="warranty-image"
                    />
                </div>

                <div className="warranty-section">
                    <p>{t('warrantyText2')}</p>
                    <img
                        src={FOOTER_IMAGE.WARRANTY_2}
                        alt={t('warrantyAlt2')}
                        className="warranty-image"
                    />
                </div>

                <div className="warranty-section">
                    <p>{t('warrantyText3')}</p>
                    <img
                        src={FOOTER_IMAGE.WARRANTY_3}
                        alt={t('warrantyAlt3')}
                        className="warranty-image"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
