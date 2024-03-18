import React from 'react';
import './ReturnsPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";
import {FOOTER_IMAGE} from "../../resources";

export function ReturnsPage() {
    return (
        <div>
            <Header/>
            <div className="return-policy-page__content">
                <h1>Повернення товарів</h1>
                <p>
                    Ми робимо все можливе, щоб ваше задоволення від покупок було максимальним.
                    Якщо ви не задоволені товаром, ви можете повернути його відповідно до нашої
                    політики повернення.
                </p>

                <img
                    src={FOOTER_IMAGE.RETURNS}
                    alt="Про нас"
                    className="faq-page__image"
                />

                <h2 className="return-policy-page__content__h2">Умови повернення:</h2>
                <ul>
                    <li>Товар повинен бути повернутий у незмінному стані.</li>
                    <li>Повернення приймаються протягом 30 днів з моменту покупки.</li>
                    <li>Повернення можливе лише за умови наявності чека або іншого доказу покупки.</li>
                </ul>

                <h2 className="return-policy-page__content__h2">Як повернути товар:</h2>
                <p>
                    Для повернення товару зверніться до нашого відділу обслуговування клієнтів
                    за телефоном 0 800 000 000 або електронною поштою support@example.com.
                </p>

                <p>
                    Будь ласка, вкажіть причину повернення та номер вашого замовлення.
                </p>
            </div>
            <Footer/>
        </div>
    );
}