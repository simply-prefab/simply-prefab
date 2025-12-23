'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
// Import translations directly to avoid potential issues
import { enTranslations } from '../translations/en';
import { hiTranslations } from '../translations/hi';
import { teTranslations } from '../translations/te';
import { taTranslations } from '../translations/ta';
import { knTranslations } from '../translations/kn';
import { mlTranslations } from '../translations/ml';

// Create translations object locally
const translations = {
  en: enTranslations,
  hi: hiTranslations,
  te: teTranslations,
  ta: taTranslations,
  kn: knTranslations,
  ml: mlTranslations,
} as const;

export type SupportedLanguage = keyof typeof translations;

// Helper function to get nested translation values with parameter replacement
const getNestedTranslation = (translations: any, key: string, params?: Record<string, string>): string => {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  let translation = typeof result === 'string' ? result : key;
  
  // Replace parameters if provided
  if (params && typeof translation === 'string') {
    Object.keys(params).forEach(paramKey => {
      translation = translation.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
    });
  }
  
  return translation;
};

// Language context interface
interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string>) => string;
  availableLanguages: { code: SupportedLanguage; name: string; nativeName: string }[];
}

// Available languages
const availableLanguages = [
  { code: 'en' as SupportedLanguage, name: 'English', nativeName: 'English' },
  { code: 'hi' as SupportedLanguage, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te' as SupportedLanguage, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta' as SupportedLanguage, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn' as SupportedLanguage, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml' as SupportedLanguage, name: 'Malayalam', nativeName: 'മലയാളം' }
] as const;

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved language from localStorage on client side only
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('simplyprefab-language') as SupportedLanguage;
      if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage;
      } else {
        // Set default language
        document.documentElement.lang = 'en';
      }
    } catch (error) {
      console.warn('Error loading saved language:', error);
      document.documentElement.lang = 'en';
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Update document language when current language changes
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage, isInitialized]);

  // Save language to localStorage when changed
  const setLanguage = (lang: SupportedLanguage) => {
    try {
      setCurrentLanguage(lang);
      localStorage.setItem('simplyprefab-language', lang);
      
      // Trigger a custom event to notify other components of language change
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
      }));
      
      // Update the document language attribute
      document.documentElement.lang = lang;
      
    } catch (error) {
      console.warn('Error saving language:', error);
    }
  };

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string>): string => {
    try {
      // Get current language translations
      const currentTranslations = translations[currentLanguage];
      if (currentTranslations) {
        const translation = getNestedTranslation(currentTranslations, key, params);
        if (translation && translation !== key) {
          return translation;
        }
      }
      
      // Fallback to English if translation not found
      const englishTranslations = translations.en;
      if (englishTranslations) {
        const englishTranslation = getNestedTranslation(englishTranslations, key, params);
        if (englishTranslation && englishTranslation !== key) {
          return englishTranslation;
        }
      }
      
      // Return key if no translation found (for debugging in development)
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation not found for key: ${key}`);
      }
      return key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages: [...availableLanguages]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
