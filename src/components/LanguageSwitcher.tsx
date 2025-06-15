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

  // Enhanced language data with proper flags and names
  const languageData = {
    ar: {
      flag: "🇸🇦",
      name: "العربية",
      shortName: "ع",
    },
    en: {
      flag: "🇺🇸",
      name: "English",
      shortName: "EN",
    },
  };

  return (
    <div className="relative" data-language-switcher>
      {/* Enhanced Language Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-neutral-50 to-white border border-neutral-200 hover:border-[#07D580]/30 rounded-xl text-neutral-700 hover:text-[#047C46] transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
        aria-label="Language Switcher"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">
            {languageData[currentLang].flag}
          </span>
          <span className="font-semibold text-sm">
            {languageData[currentLang].name}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-[#07D580]"
              : "text-neutral-400 group-hover:text-[#047C46]"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full mt-3 right-0 z-50 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] transform animate-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#F5FCF8] to-white border-b border-neutral-100">
              <h3 className="text-sm font-semibold text-neutral-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#07D580]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                {currentLang === "ar" ? "اختر اللغة" : "Choose Language"}
              </h3>
            </div>

            {/* Language Options */}
            <div className="py-2">
              {Object.entries(languages).map(([lang, label]) => (
                <button
                  key={lang}
                  onClick={() => {
                    handleLanguageSwitch(lang as keyof typeof languages);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-200 group ${
                    currentLang === lang
                      ? "bg-gradient-to-r from-[#07D580]/10 to-[#047C46]/5 text-[#047C46] font-semibold"
                      : "text-neutral-700 hover:bg-gradient-to-r hover:from-[#F5FCF8] hover:to-white hover:text-[#047C46]"
                  }`}
                >
                  {/* Flag and Language Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`text-xl group-hover:scale-110 transition-transform duration-200 ${
                        currentLang === lang ? "animate-pulse" : ""
                      }`}
                    >
                      {languageData[lang as keyof typeof languageData].flag}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-base leading-tight">
                        {label}
                      </span>
                      <span className="text-xs text-neutral-500 group-hover:text-[#07D580] transition-colors">
                        {lang === "ar" ? "العربية" : "English"}
                      </span>
                    </div>
                  </div>

                  {/* Current Language Indicator */}
                  {currentLang === lang && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#07D580] rounded-full animate-pulse"></div>
                      <svg
                        className="w-4 h-4 text-[#07D580]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Hover Arrow */}
                  {currentLang !== lang && (
                    <svg
                      className="w-4 h-4 text-neutral-400 group-hover:text-[#07D580] group-hover:translate-x-1 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Footer with subtle branding */}
            <div className="px-4 py-2 bg-gradient-to-r from-neutral-50 to-white border-t border-neutral-100">
              <div className="text-xs text-neutral-500 text-center">
                {currentLang === "ar"
                  ? "أركوم - شريكك في التميز"
                  : "ARCOM - Your Excellence Partner"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Enhanced outside click handling with improved performance
if (typeof window !== "undefined") {
  let timeoutId: number;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-language-switcher]")) {
      // Add small delay to prevent flickering
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        // This will be handled by the backdrop click in the component
      }, 50);
    }
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Let the component handle this
      const event = new CustomEvent("closelanguageswitcher");
      document.dispatchEvent(event);
    }
  });
}
