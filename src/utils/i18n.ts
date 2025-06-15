export const languages = {
  ar: "العربية",
  en: "English",
};

export const defaultLang = "ar";

// Get language from URL path (e.g., /ar/ or /en/)
export function getLangFromUrl(url: URL): keyof typeof languages {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

// Translation function
export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}

// All translations
export const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.contact": "اتصل بنا",
    "nav.language": "اللغة",

    // Hero Section
    "hero.title": "أركوم",
    "hero.subtitle": "الشركة العربية المعتمدة لإدارة المرافق",
    "hero.description":
      "نقدم حلول شاملة لإدارة المرافق والخدمات المتخصصة منذ عام 2015، مع التزامنا بأعلى معايير الجودة والاحترافية في المملكة العربية السعودية.",
    "hero.cta.primary": "اطلب خدمة",
    "hero.cta.secondary": "تعرف علينا",
    "hero.stats.projects": "مشروع مكتمل",
    "hero.stats.established": "تأسست",
    "hero.stats.services": "خدمات",
    "hero.stats.support": "دعم على مدار الساعة",

    // About Section
    "about.title": "من نحن",
    "about.vision.title": "رؤيتنا",
    "about.vision.description":
      "أن نكون الشركة الرائدة في مجال إدارة المرافق والخدمات المتخصصة في المملكة العربية السعودية والمنطقة.",
    "about.mission.title": "مهمتنا",
    "about.mission.description":
      "تقديم حلول مبتكرة وخدمات عالية الجودة لإدارة المرافق مع الالتزام بأعلى معايير الاحترافية والاستدامة.",
    "about.values.title": "قيمنا",
    "about.values.description":
      "الجودة، الاحترافية، الابتكار، والالتزام بتحقيق رضا عملائنا من خلال فريق عمل مؤهل وخبرات متراكمة.",

    // Services Section
    "services.title": "خدماتنا",
    "services.operations.title": "التشغيل والصيانة",
    "services.operations.description":
      "خدمات شاملة للتشغيل والصيانة الوقائية والعلاجية لجميع أنواع المرافق والمباني.",
    "services.hospitality.title": "الضيافة والفعاليات",
    "services.hospitality.description":
      "تنظيم وإدارة الفعاليات وخدمات الضيافة المتميزة للشركات والمؤسسات.",
    "services.housekeeping.title": "التنظيف والنظافة",
    "services.housekeeping.description":
      "خدمات التنظيف الشاملة والمتخصصة للمكاتب والمرافق التجارية والسكنية.",
    "services.airport.title": "خدمات المطارات",
    "services.airport.description":
      "خدمات متخصصة لإدارة وتشغيل مرافق المطارات وخدمات الدعم الأرضي.",
    "services.landscaping.title": "تنسيق الحدائق",
    "services.landscaping.description":
      "تصميم وتنفيذ وصيانة المساحات الخضراء والحدائق بأحدث التقنيات.",
    "services.homecare.title": "العناية المنزلية الشاملة",
    "services.homecare.description":
      "خدمات العناية المنزلية الشاملة والصيانة المنزلية المتخصصة.",
    "services.renovations.title": "التجديد والترميم",
    "services.renovations.description":
      "خدمات التجديد والترميم للمباني والمرافق بأعلى معايير الجودة.",
    "services.pest.title": "مكافحة الآفات",
    "services.pest.description":
      "خدمات مكافحة الآفات والحشرات باستخدام أحدث التقنيات الآمنة والفعالة.",

    // Contact Section
    "contact.title": "تواصل معنا",
    "contact.subtitle": "نحن هنا لخدمتك",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "رقم الهاتف",
    "contact.form.service": "الخدمة المطلوبة",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال",
    "contact.info.address": "الرياض، المملكة العربية السعودية",
    "contact.info.phone": "+966 XX XXX XXXX",
    "contact.info.email": "info@arcom.sa",
    "contact.info.hours": "الأحد - الخميس: 8:00 ص - 6:00 م",

    // Footer
    "footer.company": "الشركة",
    "footer.services": "الخدمات",
    "footer.contact": "التواصل",
    "footer.social": "تابعنا",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.about": "من نحن",
    "footer.careers": "الوظائف",
    "footer.news": "الأخبار",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.language": "Language",

    // Hero Section
    "hero.title": "Arcom",
    "hero.subtitle": "The Accredited Arabian Company for Facilities Management",
    "hero.description":
      "We provide comprehensive facility management solutions and specialized services since 2015, committed to the highest standards of quality and professionalism in Saudi Arabia.",
    "hero.cta.primary": "Request Service",
    "hero.cta.secondary": "Learn More",
    "hero.stats.projects": "Completed Projects",
    "hero.stats.established": "Established",
    "hero.stats.services": "Services",
    "hero.stats.support": "24/7 Support",

    // About Section
    "about.title": "About Us",
    "about.vision.title": "Our Vision",
    "about.vision.description":
      "To be the leading company in facility management and specialized services in Saudi Arabia and the region.",
    "about.mission.title": "Our Mission",
    "about.mission.description":
      "Providing innovative solutions and high-quality services for facility management while adhering to the highest standards of professionalism and sustainability.",
    "about.values.title": "Our Values",
    "about.values.description":
      "Quality, professionalism, innovation, and commitment to achieving customer satisfaction through qualified teams and accumulated expertise.",

    // Services Section
    "services.title": "Our Services",
    "services.operations.title": "Operations & Maintenance",
    "services.operations.description":
      "Comprehensive operation and preventive/corrective maintenance services for all types of facilities and buildings.",
    "services.hospitality.title": "Hospitality & Events",
    "services.hospitality.description":
      "Event organization and management with distinguished hospitality services for companies and institutions.",
    "services.housekeeping.title": "Housekeeping",
    "services.housekeeping.description":
      "Comprehensive and specialized cleaning services for offices, commercial and residential facilities.",
    "services.airport.title": "Airport Services",
    "services.airport.description":
      "Specialized services for airport facility management and ground support services.",
    "services.landscaping.title": "Landscaping",
    "services.landscaping.description":
      "Design, implementation, and maintenance of green spaces and gardens using the latest technologies.",
    "services.homecare.title": "Total Home Care",
    "services.homecare.description":
      "Comprehensive home care services and specialized home maintenance.",
    "services.renovations.title": "Renovations",
    "services.renovations.description":
      "Building and facility renovation services with the highest quality standards.",
    "services.pest.title": "Pest Control",
    "services.pest.description":
      "Pest and insect control services using the latest safe and effective technologies.",

    // Contact Section
    "contact.title": "Contact Us",
    "contact.subtitle": "We are here to serve you",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.service": "Required Service",
    "contact.form.message": "Message",
    "contact.form.submit": "Send",
    "contact.info.address": "Riyadh, Saudi Arabia",
    "contact.info.phone": "+966 XX XXX XXXX",
    "contact.info.email": "info@arcom.sa",
    "contact.info.hours": "Sunday - Thursday: 8:00 AM - 6:00 PM",

    // Footer
    "footer.company": "Company",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.social": "Follow Us",
    "footer.rights": "All rights reserved",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.news": "News",
  },
} as const;

export function t(key: string, lang: keyof typeof languages): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  if (value && typeof value === "object" && value[lang]) {
    return value[lang];
  }

  // Fallback to Arabic if translation not found
  if (value && typeof value === "object" && value[defaultLang]) {
    return value[defaultLang];
  }

  return key; // Return key if no translation found
}

export function getTranslation(
  key: keyof typeof translations,
  lang: keyof typeof languages = defaultLang
): string {
  return translations[lang][key] || key;
}

export function isRTL(lang: keyof typeof languages): boolean {
  return lang === "ar";
}

export function getDirection(lang: keyof typeof languages): "rtl" | "ltr" {
  return isRTL(lang) ? "rtl" : "ltr";
}

export function getLanguageClass(lang: keyof typeof languages): string {
  return isRTL(lang) ? "font-arabic" : "font-archivo";
}
