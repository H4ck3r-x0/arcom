export type Language = "ar" | "en";

export const DEFAULT_LANGUAGE: Language = "ar";

export interface Translation {
  ar: string;
  en: string;
}

export const translations = {
  // Navigation
  home: { ar: "الرئيسية", en: "Home" },
  about: { ar: "من نحن", en: "About" },
  services: { ar: "الخدمات", en: "Services" },
  contact: { ar: "اتصل بنا", en: "Contact" },

  // Hero Section
  heroTitle: {
    ar: "الشركة العربية المعتمدة لإدارة المرافق",
    en: "The Accredited Arabian Company for Facilities Management",
  },
  heroSubtitle: {
    ar: "شريكك في التميز - حلول مبتكرة وموثوقة لإدارة وصيانة المرافق",
    en: "Your Excellence Partner - Innovative and Reliable Facilities Management Solutions",
  },
  getStarted: { ar: "ابدأ معنا", en: "Get Started" },
  learnMore: { ar: "اعرف المزيد", en: "Learn More" },

  // About Section
  vision: { ar: "الرؤية", en: "Vision" },
  mission: { ar: "الرسالة", en: "Mission" },
  values: { ar: "القيم", en: "Values" },

  visionText: {
    ar: "نسعى لأن نكون روادًا في تقديم حلول تشغيل وإدارة وصيانة مبتكرة وموثوقة تعزز الكفاءة والاستدامة في المملكة العربية السعودية.",
    en: "To be pioneers in innovative and reliable operation, management, and maintenance solutions that enhance efficiency and sustainability in Saudi Arabia.",
  },

  missionText: {
    ar: "تقديم خدمات تشغيل وإدارة وصيانة متميزة ومتكاملة، باستخدام التقنية الحديثة وفهم احتياجات العميل وتوفير بيئات صحية وآمنة.",
    en: "Deliver outstanding, tailored services with smart technology, deep client understanding, and safe, sustainable environments.",
  },

  // Values
  credibility: { ar: "المصداقية", en: "Credibility" },
  commitment: { ar: "الالتزام", en: "Commitment" },
  innovation: { ar: "الابتكار", en: "Innovation" },
  sustainability: { ar: "الاستدامة", en: "Sustainability" },

  credibilityDesc: { ar: "الشفافية والثقة", en: "Transparency and trust" },
  commitmentDesc: { ar: "الجودة والثبات", en: "Quality and consistency" },
  innovationDesc: { ar: "حلول ذكية وحديثة", en: "Smart, modern solutions" },
  sustainabilityDesc: {
    ar: "مسؤولية بيئية",
    en: "Environmental responsibility",
  },

  // Services
  servicesTitle: { ar: "خدماتنا", en: "Our Services" },
  serviceCount: { ar: "+١٥٠٠ خدمة مقدمة", en: "1500+ Services Delivered" },

  operationsMaintenance: {
    ar: "خدمات الصيانة والتشغيل",
    en: "Operations & Maintenance",
  },
  hospitalityEvents: {
    ar: "خدمات الضيافة والفعاليات",
    en: "Hospitality & Events",
  },
  housekeeping: { ar: "خدمات النظافة", en: "Housekeeping" },
  airportServices: { ar: "خدمات المطارات", en: "Airport Services" },
  landscaping: { ar: "خدمات البستنة وتنسيق الحدائق", en: "Landscaping" },
  totalHomeCare: {
    ar: "خدمات الصيانة المنزلية الشاملة",
    en: "Total Home Care",
  },
  renovations: { ar: "خدمات الترميمات والتجديدات", en: "Renovations" },
  pestControl: { ar: "خدمات مكافحة الآفات", en: "Pest Control" },

  // Contact
  contactUs: { ar: "تواصل معنا", en: "Contact Us" },
  getInTouch: { ar: "ابق على تواصل", en: "Get In Touch" },

  // Footer
  allRightsReserved: { ar: "جميع الحقوق محفوظة", en: "All Rights Reserved" },

  // Common
  readMore: { ar: "اقرأ المزيد", en: "Read More" },
  viewAll: { ar: "عرض الكل", en: "View All" },

  // Vision 2030
  vision2030: { ar: "رؤية ٢٠٣٠", en: "Vision 2030" },
  vision2030Text: {
    ar: "أركوم تساهم في تحقيق رؤية المملكة 2030 من خلال الاستثمار في الحلول الذكية، والشراكات الاستراتيجية، والتنمية المستدامة.",
    en: "Arcom supports Saudi Vision 2030 by investing in smart facilities, eco-partnerships, and sustainable development.",
  },
};

export function getTranslation(
  key: keyof typeof translations,
  lang: Language = DEFAULT_LANGUAGE
): string {
  return translations[key]?.[lang] || key;
}

export function isRTL(lang: Language): boolean {
  return lang === "ar";
}

export function getDirection(lang: Language): "rtl" | "ltr" {
  return isRTL(lang) ? "rtl" : "ltr";
}

export function getLanguageClass(lang: Language): string {
  return isRTL(lang) ? "font-arabic" : "font-archivo";
}
