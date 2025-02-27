import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";

// Function to get the language from the URL hash without reloading the page
const getLanguageFromURL = (): string => {
  const hash = window.location.hash.replace("#lang=", "");
  return hash === "de" ? "de" : "en"; // Default to "en" if invalid or not present
};

// Initialize i18n when the function is called
const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: getLanguageFromURL(), // Set language from URL hash
    fallbackLng: false, // No fallback (only "en" and "de")
    interpolation: {
      escapeValue: false,
    },
  });
};

export { i18n, initI18n };
