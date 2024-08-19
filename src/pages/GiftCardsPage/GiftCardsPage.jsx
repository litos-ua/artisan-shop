
import React from 'react';
import './GiftCardsPage.css';
import { Header, Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function GiftCardsPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div className="gift-cards-page">
            <Header />

            <div className="gift-cards-page__content">
                <h1>{t('giftCardsTitle')}</h1>
                <p>{t('giftCardsText1')}</p>

                <img
                    src={FOOTER_IMAGE.GIFT_CARDS}
                    alt={t('giftCardsAlt')}
                    className="gift-cards-image"
                />

                <h2 className="gift-cards-page__content__h2">{t('giftCardsPurchaseTitle')}</h2>
                <ol>
                    <li>{t('giftCardsStep1')}</li>
                    <li>{t('giftCardsStep2')}</li>
                    <li>{t('giftCardsStep3')}</li>
                </ol>

                <h2 className="gift-cards-page__content__h2">{t('giftCardsBenefitsTitle')}</h2>
                <ul>
                    <li>{t('giftCardsBenefit1')}</li>
                    <li>{t('giftCardsBenefit2')}</li>
                    <li>{t('giftCardsBenefit3')}</li>
                </ul>
            </div>

            <p className="gift-cards-page__lastP">
                {t('giftCardsLastText')}
            </p>

            <Footer />
        </div>
    );
}
