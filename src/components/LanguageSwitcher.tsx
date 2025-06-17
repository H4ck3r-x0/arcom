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
    const url = new URL(window.location.href);
    const lang = getLangFromUrl(url);
    setCurrentLang(lang);
  }, []);

  const handleLanguageSwitch = (newLang: keyof typeof languages) => {
    const currentUrl = new URL(window.location.href);
    const pathSegments = currentUrl.pathname.split("/").filter(Boolean);

    // Remove current language from path if it exists
    if (pathSegments[0] === "ar" || pathSegments[0] === "en") {
      pathSegments.shift();
    }

    // Build new path with new language
    const newPath = `/${newLang}/${pathSegments.join("/")}`;
    window.location.href = newPath;
  };

  const languageData = {
    ar: { name: "عربي", code: "AR", flag: "🇸🇦" },
    en: { name: "English", code: "EN", flag: "🇺🇸" },
  };

  return (
    <div className="relative">
      {/* Simple Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-[#047C46] transition-colors duration-200 rounded-lg hover:bg-[#F5FCF8]/60"
        aria-label="Language Switcher"
        aria-expanded={isOpen}
      >
        <span className="text-base">{languageData[currentLang].flag}</span>
        <span>{languageData[currentLang].code}</span>
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

      {/* Simple Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[999998]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-[999999] bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
            {Object.entries(languages).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => {
                  handleLanguageSwitch(lang as keyof typeof languages);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${
                  currentLang === lang
                    ? "bg-[#F5FCF8] text-[#047C46] font-medium"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-[#047C46]"
                }`}
              >
                <span className="text-base">
                  {languageData[lang as keyof typeof languageData].flag}
                </span>
                <span>
                  {languageData[lang as keyof typeof languageData].name}
                </span>
              </button>
            ))}
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
