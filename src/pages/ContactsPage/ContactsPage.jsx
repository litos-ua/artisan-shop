import React from 'react';
import './ContactsPage.css';
import {Header} from "../../components";
import {Footer} from "../../components";

export function ContactsPage() {
    return (
        <div>
            <Header/>
            <div className="contacts-page__content">
                <h1>Наші контакти</h1>
                <p>
                    Ми завжди раді відповісти на ваші запитання та надати допомогу.
                    Зв'яжіться з нами за допомогою наступних контактних даних:
                </p>

                <h2 className="contacts-page__content__h2">Адреса:</h2>
                <a href="https://www.google.com.ua/maps/place/Hillel+IT+School/@50.4370536,30.530262,17z/data=!4m14!1m7!3m6!1s0x40d4cf07295b8e39:0x41f43bbd96473152!2sHillel+IT+School!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36!3m5!1s0x40d4cf07295b8e39:0x41f43bbd96473152!8m2!3d50.4370536!4d30.5328369!16s%2Fg%2F11bxfwtw36?hl=ru&entry=ttu">
                    Адреса: м. Реакт вул. Реактівська, 123
                </a>

                <h2 className="contacts-page__content__h2">Телефон:</h2>
                <a href="tel:0800000000" className="phone">0 800 000 000</a>

                <h2 className="contacts-page__content__h2">Електронна пошта:</h2>
                <a href="mailto:react@example.com">react@example.com</a>

                <h2 className="contacts-page__content__h2">Години роботи:</h2>
                <p>Понеділок - П'ятниця: 9:00 - 18:00</p>
            </div>
            <Footer/>
        </div>
    );
}