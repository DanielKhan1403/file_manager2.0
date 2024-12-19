import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN,
        },
        ru: {
            translation: translationRU,
        },
    },
    lng: 'en', // Устанавливаем язык по умолчанию
    fallbackLng: 'en', // Язык, на который будет переключаться при отсутствии перевода
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
