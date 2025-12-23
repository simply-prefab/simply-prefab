'use client'

import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode: "en" | "hi" | "te" | "ta" | "kn" | "ml") => {
    console.log('Language changing to:', langCode);
    setLanguage(langCode);
    setIsOpen(false);
    
    // Force a re-render by triggering a custom event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: langCode } 
      }));
    }, 50);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Dropdown toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={setDropdownRef}>
      <Button 
        variant="outline" 
        size="sm" 
        className="transition-all duration-200 min-w-[120px] justify-between border-2"
        onClick={toggleDropdown}
        type="button"
        style={{
          borderColor: '#E5D5B7',
          color: '#3C2414',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FDF8E8';
          e.currentTarget.style.borderColor = '#FDB515';
          e.currentTarget.style.color = '#FDB515';
          const globeIcon = e.currentTarget.querySelector('svg');
          if (globeIcon) {
            globeIcon.style.color = '#FDB515';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = '#E5D5B7';
          e.currentTarget.style.color = '#3C2414';
          const globeIcon = e.currentTarget.querySelector('svg');
          if (globeIcon) {
            globeIcon.style.color = '#FDB515';
          }
        }}
      >
        <div className="flex items-center">
          <Globe 
            className="h-4 w-4 mr-2"
            style={{ color: '#FDB515' }}
          />
          <span className="font-medium">{currentLang?.nativeName || 'English'}</span>
        </div>
        <ChevronDown 
          className={`h-3 w-3 ml-1 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: '#A0522D' }}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-xl z-[10000] origin-top-right border-0"
          style={{ 
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 10000,
            backgroundColor: 'white',
            border: '1px solid #E5D5B7',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="py-1 max-h-80 overflow-y-auto">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="w-full text-left px-4 py-3 transition-all duration-150 focus:outline-none"
                type="button"
                style={{
                  backgroundColor: currentLanguage === language.code ? '#FDF8E8' : 'transparent',
                  color: currentLanguage === language.code ? '#FDB515' : '#3C2414',
                  fontWeight: currentLanguage === language.code ? '600' : '500'
                }}
                onMouseEnter={(e) => {
                  if (currentLanguage !== language.code) {
                    e.currentTarget.style.backgroundColor = '#FDF8E8';
                    e.currentTarget.style.color = '#FDB515';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLanguage !== language.code) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#3C2414';
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-tight">{language.nativeName}</span>
                    <span 
                      className="text-xs leading-tight"
                      style={{ color: '#A0522D' }}
                    >
                      {language.name}
                    </span>
                  </div>
                  {currentLanguage === language.code && (
                    <Check 
                      className="w-4 h-4"
                      style={{ color: '#FDB515' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
