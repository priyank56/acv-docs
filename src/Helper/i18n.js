import i18n from "i18next";
import axios from "axios";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation-en.json";
import translationES from "./locales/es/translation-es.json";
import translationFR from "./locales/fr/translation-fr.json";
import translationHI from "./locales/hi/translation-hi.json";
import translationPT from "./locales/pt/translation-pt.json";

const init_i18n = (config) => {
  i18n.use(detector).use(initReactI18next).init(config);
};

const defaultConfig = {
  resources: {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
    hi: {
      translation: translationHI,
    },
    pt: {
      translation: translationPT,
    },
  },
  //   lng: "es",
  fallbackLng: "es",
  debug: true,
  returnObjects: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
};

const configFromServer = {
  resources: {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
    hi: {
      translation: translationHI,
    },
    pt: {
      translation: translationPT,
    },
  },
  fallbackLng: "es",
  debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
};

const fetchTranslation = (fileName) =>
  axios
    .get(
      `https://acvtimasistenciastg.blob.core.windows.net/docs/${fileName}.json`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    });

const initialize = () => {
  init_i18n(defaultConfig);
  setTimeout(async () => {
    const data_en = await fetchTranslation("translation-en");
    const data_es = await fetchTranslation("translation-es");
    const data_fr = await fetchTranslation("translation-fr");
    const data_hi = await fetchTranslation("translation-hi");
    const data_pt = await fetchTranslation("translation-pt");
    configFromServer.resources.en["translation"] = data_en;
    configFromServer.resources.es["translation"] = data_es;
    configFromServer.resources.fr["translation"] = data_fr;
    configFromServer.resources.hi["translation"] = data_hi;
    configFromServer.resources.pt["translation"] = data_pt;
    init_i18n(configFromServer);
  }, 1000);
};

initialize();

export default i18n;
