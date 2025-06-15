import { useState, useEffect } from "react";
import { languages, getLangFromUrl } from "../utils/i18n";

interface LanguageSwitcherProps {
  currentPath?: string;
}

export default function LanguageSwitcher({
  currentPath = "/",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<keyof typeof languages>("ar");

  useEffect(() => {
    // Get current language from URL path
    const url = new URL(window.location.href);
    const lang = getLangFromUrl(url);
    setCurrentLang(lang);
    console.log("LanguageSwitcher: Current language is", lang);
  }, []);

  const handleLanguageSwitch = (newLang: keyof typeof languages) => {
    console.log("LanguageSwitcher: Switching to", newLang);

    // Get current path without language prefix
    const currentUrl = new URL(window.location.href);
    const pathSegments = currentUrl.pathname.split("/").filter(Boolean);

    // Remove current language from path if it exists
    if (pathSegments[0] === "ar" || pathSegments[0] === "en") {
      pathSegments.shift();
    }

    // Build new path with new language
    const newPath = `/${newLang}/${pathSegments.join("/")}`;

    // Navigate to new language path
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Language Switcher"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLang === "ar" ? "🇸🇦" : "🇺🇸"}</span>
        <span className="font-medium">{languages[currentLang]}</span>
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
          {Object.entries(languages).map(([lang, label]) => (
            <button
              key={lang}
              onClick={() => {
                handleLanguageSwitch(lang as keyof typeof languages);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors duration-200 ${
                currentLang === lang
                  ? "bg-primary-100 text-primary-700"
                  : "text-neutral-700 hover:text-primary-600"
              }`}
            >
              <span className="text-lg">{lang === "ar" ? "🇸🇦" : "🇺🇸"}</span>
              <span className="font-medium">{label}</span>
              {currentLang === lang && (
                <svg
                  className="w-4 h-4 ml-auto text-primary-600"
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

// Close dropdown when clicking outside
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-language-switcher]")) {
      // This will be handled by the backdrop click
    }
  });
}
