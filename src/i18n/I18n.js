// import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';
import vi from './vi/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        vi: {
            translation: vi,
        },
        en: {
            translation: en,
        },
    },
    lng: 'vi',
    // lng: language, // if you're using a language detector, do not define the lng option
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});
export default i18n;

// function I18n() {
//     return <span>Loading...</span>;
// }

// export default I18n;

// // export default configI18n;
// import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// i18n
//     // load translation using http -> see /public/locales
//     // learn more: https://github.com/i18next/i18next-http-backend
//     .use(Backend)
//     // detect user language
//     // learn more: https://github.com/i18next/i18next-browser-languageDetector
//     .use(LanguageDetector)
//     // pass the i18n instance to react-i18next.
//     .use(initReactI18next)
//     // init i18next
//     // for all options read: https://www.i18next.com/overview/configuration-options
//     .init({
//         debug: true,
//         fallbackLng: 'en',
//         interpolation: {
//             escapeValue: false, // not needed for react as it escapes by default
//         },

//         react: {
//             useSuspense: false,
//         },
//     });

// export default i18n;
