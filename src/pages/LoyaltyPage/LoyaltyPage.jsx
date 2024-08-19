
import React from 'react';
import './LoyaltyPage.css';
import { Header, Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function LoyaltyPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div className="loyalty-page">
            <Header />

            <div className="loyalty-page__content">
                <h1>{t('loyaltyTitle')}</h1>

                <img
                    src={FOOTER_IMAGE.LOYALTY}
                    alt={t('loyaltyAlt')}
                    className="loyalty-image"
                />

                <p>{t('loyaltyText1')}</p>

                <h2>{t('loyaltyBenefitsTitle')}</h2>
                <ul>
                    <li>{t('loyaltyBenefit1')}</li>
                    <li>{t('loyaltyBenefit2')}</li>
                    <li>{t('loyaltyBenefit3')}</li>
                </ul>

                <h2>{t('loyaltyHowToEarnTitle')}</h2>
                <ol>
                    <li>{t('loyaltyStep1')}</li>
                    <li>{t('loyaltyStep2')}</li>
                    <li>{t('loyaltyStep3')}</li>
                </ol>

                <h2>{t('loyaltyRulesTitle')}</h2>
                <ul>
                    <li>{t('loyaltyRule1')}</li>
                    <li>{t('loyaltyRule2')}</li>
                    <li>{t('loyaltyRule3')}</li>
                </ul>
            </div>

            <p className="loyalty-page__content__lastP">
                {t('loyaltyLastText')}
            </p>

            <Footer />
        </div>
    );
}
