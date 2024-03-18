import React from 'react';
import './CareerPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";
import {FOOTER_IMAGE} from "../../resources";

export function CareerPage() {
    return (
        <div>
            <Header/>
            <div className="career-page__content">
                <h1>Кар'єра</h1>
                <p>
                    Разом з нами ви зможете реалізувати свій потенціал та розвинути свої навички.
                    Ми шукаємо талановитих та мотивованих людей, які хочуть долучитися до нашої команди.
                </p>

                <img
                    src={FOOTER_IMAGE.CAREER}
                    alt="Про нас"
                    className="about-page__image"
                />

                <h2 className="career-page__content__h2">Вакансії:</h2>
                <ul>
                    <li>Менеджер з продажу</li>
                    <li>Маркетолог</li>
                    <li>Програміст</li>
                </ul>

                <h2 className="career-page__content__h2">Як подати заявку:</h2>
                <p>
                    Для подання заявки на вакансію, надішліть своє резюме на нашу електронну пошту
                    за адресою: hr@example.com.
                </p>

                <p>
                    Будь ласка, вкажіть в темі листа назву вакансії, на яку ви подаєте заявку.
                </p>
            </div>
            <Footer/>
        </div>
    );
}