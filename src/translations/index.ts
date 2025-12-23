import { enTranslations } from './en';
import { hiTranslations } from './hi';
import { teTranslations } from './te';
import { taTranslations } from './ta';
import { knTranslations } from './kn';
import { mlTranslations } from './ml';

export const translations = {
  en: enTranslations,
  hi: hiTranslations,
  te: teTranslations,
  ta: taTranslations,
  kn: knTranslations,
  ml: mlTranslations,
};

export type SupportedLanguage = keyof typeof translations;
export type TranslationKeys = keyof typeof enTranslations;

// Helper function to get nested translation values
export const getNestedTranslation = (
  translations: any,
  key: string
): string => {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key;
};