
import React from 'react';
import { useTranslation } from 'react-i18next';
import './CareerPage.css';
import { Header } from "../../components";
import { Footer } from "../../components";
import { FOOTER_IMAGE } from "../../resources";

export function CareerPage() {
    const { t } = useTranslation('footerLocale');

    return (
        <div>
            <Header />
            <div className="career-page__content">
                <h1>{t('careerPage.title')}</h1>
                <p>{t('careerPage.description')}</p>

                <img
                    src={FOOTER_IMAGE.CAREER}
                    alt={t('careerPage.imageAlt')}
                    className="career-page__image"
                />

                <h2 className="career-page__content__h2">{t('careerPage.vacanciesTitle')}</h2>
                <ul>
                    <li>{t('careerPage.vacancies.salesManager')}</li>
                    <li>{t('careerPage.vacancies.logistician')}</li>
                    <li>{t('careerPage.vacancies.webDeveloper')}</li>
                </ul>

                <h2 className="career-page__content__h2">{t('careerPage.howToApplyTitle')}</h2>
                <p>{t('careerPage.howToApply')}</p>

                <p>{t('careerPage.emailNote')}</p>
            </div>
            <Footer />
        </div>
    );
}
