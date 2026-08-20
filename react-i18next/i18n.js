import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./locales/en/translation.json";
import spanishTranslation from "./locales/es/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishTranslation,
      },
      es: {
        translation: spanishTranslation,
      },
    },

    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;