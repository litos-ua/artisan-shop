import React from 'react';
import './WarrantyPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";
import {FOOTER_IMAGE} from "../../resources";

export function WarrantyPage() {
    return (
        <div>
            <Header/>
            <h1>Гарантія та повернення</h1>
            <div className="warranty-page">
                <div className="warranty-section">
                    <p>
                        Наша компанія гарантує вам високу якість продукції та надає можливість
                        повернення товарів у випадку невдоволеності або дефектів.
                    </p>

                    <img
                        src={FOOTER_IMAGE.WARRANTY_1}
                        alt="Якість"
                        className="warranty-image"
                    />
                </div>

                <div className="warranty-section">
                    <p>
                        Ми дбаємо про наших клієнтів і готові вирішити всі питання, щоб ваш
                        досвід покупок був максимально приємним.
                    </p>

                    <img
                        src={FOOTER_IMAGE.WARRANTY_2}
                        alt="Стандарти"
                        className="warranty-image"
                    />
                </div>

                <div className="warranty-section">
                    <p>
                        Якщо ви не задоволені придбаною продукцією, звертайтеся до нашої
                        служби підтримки для повернення або обміну товару.
                    </p>

                    <img
                        src={FOOTER_IMAGE.WARRANTY_3}
                        alt="Стандарти"
                        className="warranty-image"
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
}