import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "../utils/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileNavigationProps {
  lang: "ar" | "en";
}

export default function MobileNavigation({ lang }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mounted, setMounted] = useState(false);
  const t = useTranslations(lang);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    {
      href: `/${lang}/`,
      label: t("nav.home"),
      description: lang === "ar" ? "الصفحة الرئيسية" : "Main page",
      gradient: "from-[#07D580] to-[#71F58C]",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/#about`,
      label: t("nav.about"),
      description: lang === "ar" ? "تعرف علينا" : "Learn about us",
      gradient: "from-[#71D9F5] to-[#71AFF5]",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/#services`,
      label: t("nav.services"),
      description: lang === "ar" ? "خدماتنا المتميزة" : "Our premium services",
      gradient: "from-[#71F5E6] to-[#07D580]",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
    },
    {
      href: `/${lang}/#partners`,
      label: t("nav.partners"),
      description: lang === "ar" ? "شركاء النجاح" : "Our partners",
      gradient: "from-[#07D580] to-[#71D9F5]",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // Floating action button
  const button = (
    <div className="lg:hidden flex items-center justify-center h-20">
      <button
        onClick={toggleMenu}
        className={`w-10 h-10 flex items-center justify-center rounded-lg text-neutral-700 transition-all duration-500 hover:bg-[#07D580]/10 hover:text-[#047C46] hover:scale-110 hover:shadow-lg hover:shadow-[#07D580]/20 active:scale-95 ${
          isMenuOpen ? "bg-neutral-600 text-white rotate-180" : ""
        }`}
        aria-label={lang === "ar" ? "فتح قائمة التنقل" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-current transform transition-all duration-500 ease-out ${
              isMenuOpen ? "rotate-45 translate-y-1.5 scale-110" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transform transition-all duration-500 ease-out ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5 scale-110" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );

  // Menu content
  const menu =
    isMenuOpen && mounted
      ? createPortal(
          <div
            className="lg:hidden fixed inset-0 overflow-hidden"
            style={{ zIndex: 999998 }}
            role="dialog"
            aria-modal="true"
            aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main Menu"}
          >
            {/* Premium backdrop with mesh gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#047C46]/98 via-[#047C46]/95 to-[#036541]/98 backdrop-blur-xl"
              onClick={closeMenu}
            >
              {/* Decorative mesh gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#07D580]/20 via-transparent to-[#71D9F5]/10 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#71AFF5]/10 via-transparent to-[#71F5E6]/20 opacity-30" />
            </div>

            {/* Content container */}
            <div className="relative h-full overflow-auto scrollbar-hide">
              {/* Premium header with brand identity */}
              <div className="px-6 sm:px-8 py-8 border-b border-[#F5FCF8]/10 bg-gradient-to-b from-black/20 to-transparent backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F5FCF8] to-white flex items-center justify-center shadow-2xl border border-white/30">
                    <img
                      src="/logos/green.png"
                      alt={lang === "ar" ? "شعار أركوم" : "Arcom Logo"}
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-lg relative z-[999999]">
                      <LanguageSwitcher />
                    </div>

                    {/* Premium close button */}
                    <button
                      onClick={closeMenu}
                      className="p-4 rounded-2xl bg-white/5 text-white transition-all duration-300 border border-white/10 shadow-xl backdrop-blur-lg hover:bg-white/10 hover:scale-110 active:scale-95"
                      aria-label={
                        lang === "ar" ? "إغلاق القائمة" : "Close menu"
                      }
                    >
                      <svg
                        className="w-7 h-7 transform transition-transform duration-500 hover:rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced navigation links */}
              <nav className="p-4 sm:p-6 pt-8 sm:pt-10 space-y-10" role="menu">
                {navLinks.map((link, index) => {
                  const isActive = link.href.includes(activeSection);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      role="menuitem"
                      className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#07D580]/10 bg-[#F5FCF8]/5 border border-[#F5FCF8]/10 hover:bg-[#F5FCF8]/10 ${
                        lang === "ar" ? "font-arabic" : "font-archivo"
                      }`}
                      style={{
                        animation: `slideInStagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
                          150 + index * 100
                        }ms`,
                      }}
                    >
                      {/* Premium gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl`}
                      />

                      <div className="relative p-6 sm:p-8 flex items-center gap-6">
                        {/* Enhanced icon container */}
                        <div
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/30`}
                        >
                          {link.icon}
                          {/* Premium icon glow */}
                          <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl`}
                          />
                        </div>

                        {/* Enhanced content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl font-bold text-white group-hover:text-[#F5FCF8] transition-all duration-300 mb-2">
                            {link.label}
                          </h3>
                          <p className="text-[#F5FCF8]/70 group-hover:text-[#F5FCF8]/90 transition-all duration-300 text-base sm:text-lg">
                            {link.description}
                          </p>
                        </div>

                        {/* Premium arrow indicator */}
                        <div
                          className={`flex-shrink-0 text-white/60 group-hover:text-white transition-all duration-500 ${
                            lang === "ar" ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className={`w-8 h-8 transform transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 group-hover:scale-125`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d={
                                lang === "ar"
                                  ? "M15 19l-7-7 7-7"
                                  : "M9 5l7 7-7 7"
                              }
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </nav>

              {/* Premium footer with contact info */}
              <div className="px-6 sm:px-8 py-8 mt-auto border-t border-[#F5FCF8]/10 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-xl">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Contact card */}
                  <a
                    href="mailto:info@arcom.sa"
                    className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-[#F5FCF8]/5 border border-[#F5FCF8]/10 backdrop-blur-lg group hover:bg-[#F5FCF8]/10 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#07D580] to-[#71F5E6] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-left rtl:text-right">
                      <span className="block text-white font-bold text-lg group-hover:text-[#07D580] transition-colors duration-300">
                        info@arcom.sa
                      </span>
                      <span
                        className={`block text-[#F5FCF8]/70 text-sm ${
                          lang === "ar" ? "font-arabic" : "font-archivo"
                        }`}
                      >
                        {lang === "ar"
                          ? "للتواصل والاستفسارات"
                          : "For inquiries & support"}
                      </span>
                    </div>
                  </a>

                  {/* Company tagline */}
                  <p
                    className={`text-[#F5FCF8]/80 text-center text-base sm:text-lg font-medium ${
                      lang === "ar" ? "font-arabic" : "font-archivo"
                    }`}
                  >
                    {lang === "ar"
                      ? "الشركة العربية المعتمدة لإدارة المرافق"
                      : "The Accredited Arabian Company for Facilities Management"}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {button}
      {menu}
    </>
  );
}
