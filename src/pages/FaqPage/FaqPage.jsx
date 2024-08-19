
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FaqPage.css';
import { Header } from "../../components";
import { Footer } from "../../components";
import { Dropdown } from "./DropDown";
import { FOOTER_IMAGE } from "../../resources";

export function FaqPage() {
    const { t } = useTranslation('footerLocale');
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const toggleDropdown1 = () => setIsOpen1(!isOpen1);
    const toggleDropdown2 = () => setIsOpen2(!isOpen2);
    const toggleDropdown3 = () => setIsOpen3(!isOpen3);

    return (
        <div>
            <Header />
            <div className="faq-page__content">
                <h1>{t('faqPage.title')}</h1>
                <p>{t('faqPage.description')}</p>

                <h2 className="faq-page__content__h2">{t('faqPage.faqTitle')}</h2>

                <img
                    src={FOOTER_IMAGE.FAQ}
                    alt={t('faqPage.imageAlt')}
                    className="faq-page__image"
                />

                <ul className="faq-page__arrow">
                    <Dropdown
                        question={t('faqPage.questions.browseProducts')}
                        isOpen={isOpen1}
                        toggle={toggleDropdown1}
                        answer={t('faqPage.answers.browseProducts')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.searchProduct')}
                        isOpen={isOpen1}
                        toggle={toggleDropdown1}
                        answer={t('faqPage.answers.searchProduct')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.purchaseProduct')}
                        isOpen={isOpen1}
                        toggle={toggleDropdown1}
                        answer={t('faqPage.answers.purchaseProduct')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.register')}
                        isOpen={isOpen1}
                        toggle={toggleDropdown1}
                        answer={t('faqPage.answers.register')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.paymentMethods')}
                        isOpen={isOpen1}
                        toggle={toggleDropdown1}
                        answer={t('faqPage.answers.paymentMethods')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.deliveryTime')}
                        isOpen={isOpen2}
                        toggle={toggleDropdown2}
                        answer={t('faqPage.answers.deliveryTime')}
                    />
                    <Dropdown
                        question={t('faqPage.questions.returnPolicy')}
                        isOpen={isOpen3}
                        toggle={toggleDropdown3}
                        answer={t('faqPage.answers.returnPolicy')}
                    />
                </ul>
            </div>
            <Footer />
        </div>
    );
}

