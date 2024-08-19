
import React from 'react';
import './ReturnsPage.css';
import { Header } from "../../components";
import { Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";
import { useTranslation } from 'react-i18next';

export function ReturnsPage() {
    const { t } = useTranslation('footerLocale');

    const returnConditions = t('returnsPage.returnConditions', { returnObjects: true });
    const returnInstructions = t('returnsPage.returnInstructions', { returnObjects: true });

    return (
        <div>
            <Header />
            <div className="return-policy-page__content">
                <h1>{t('returnsPage.title')}</h1>
                <p>{t('returnsPage.description')}</p>

                <img
                    src={FOOTER_IMAGE.RETURNS}
                    alt={t('returnsPage.imageAlt')}
                    className="return-policy-page__image"
                />

                <h2 className="return-policy-page__content__h2">{t('returnsPage.returnConditionsTitle')}</h2>
                <ul>
                    {returnConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                    ))}
                </ul>

                <h2 className="return-policy-page__content__h2">{t('returnsPage.returnInstructionsTitle')}</h2>
                {returnInstructions.map((instruction, index) => (
                    <p key={index}>{instruction}</p>
                ))}
            </div>
            <Footer />
        </div>
    );
}
