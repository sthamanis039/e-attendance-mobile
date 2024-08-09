import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../lang/en.json';
import np from '../lang/np.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translations: en,
      },
      np: {
        translations: np,
      },
    },
    lng: 'np', // if you're using a language detector, do not define the lng option
    fallbackLng: process.env.REACT_APP_LANGUAGE || 'np',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
