import { useState, useEffect } from "react";
import type { Language } from "../utils/i18n";

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSwitcher({
  currentLang,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-switcher")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const languages = [
    { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <div className="language-switcher relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-white"
        aria-label="Change language"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-fade-in">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                currentLang === language.code
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium whitespace-nowrap">
                {language.name}
              </span>
              {currentLang === language.code && (
                <svg
                  className="w-4 h-4 ml-auto text-primary-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
