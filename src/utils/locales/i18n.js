
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { configObj2 } from "../../resources/configLocal";

const mode = configObj2.devMode;
const lang = configObj2.baseLanguage;

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: {
            'default': [lang],
            'ru-UA': ['ru'],
        },
        debug: mode,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',  // Use namespaces
        },
        ns: ['translation', 'formValidation', 'errorMessages', 'alertMessages', 'infoMessages', 'footerLocale'], // List of namespaces
        defaultNS: 'translation',  // Default namespace
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

