import React from 'react';
import './ServiceCenterPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";
import {FOOTER_IMAGE} from "../../resources";

export function ServiceCenterPage() {
    return (
        <div>
            <Header/>
            <div className="service-center-page__content">
                <h1>Сервісний центр</h1>
                <p>
                    Наш сервісний центр готовий надати вам всебічну допомогу та вирішити будь-які
                    проблеми з вашими товарами. Ми пропонуємо широкий спектр послуг, включаючи
                    ремонт, технічну підтримку та консультації.
                </p>

                <img
                    src={FOOTER_IMAGE.SERVICE_CENTER}
                    alt="Про нас"
                    className="faq-page__image"
                />

                <h2 className="service-center-page__content__h2">Послуги сервісного центру:</h2>
                <ul>
                    <li>Діагностика несправностей</li>
                    <li>Ремонт та обслуговування</li>
                    <li>Консультації з експлуатації</li>
                    <li>Заміна комплектуючих</li>
                </ul>

                <h2 className="service-center-page__content__h2">Як звернутися до сервісного центру:</h2>
                <p>
                    Сервісний центр за телефоном 0800 000 000 або електронною поштою:{' '}
                    <span style={{color: 'lightcoral', fontWeight: 'bold'}}>service@example.com</span>
                </p>

                <p>
                    Наші фахівці з радістю допоможуть вам вирішити будь-які технічні питання.
                </p>
            </div>


            <Footer/>
        </div>
    );
}