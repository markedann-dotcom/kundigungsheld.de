/**
 * i18n System for KündigungsHeld
 * Supports: German (de), Ukrainian (uk), English (en), Turkish (tr), Chinese (zh)
 * Note: Letter templates remain in German (legal requirement)
 */

export type Language = 'de' | 'uk' | 'en' | 'tr' | 'zh'

export const LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
]

export const DEFAULT_LANGUAGE: Language = 'de'

// Translation keys structure
export type TranslationKeys = {
  // Hero Section
  hero: {
    title: string
    subtitle: string
    cta: string
    subtext: string
  }
  // Features Section
  features: {
    sectionLabel: string
    title: string
    subtitle: string
    feature1Title: string
    feature1Desc: string
    feature2Title: string
    feature2Desc: string
    feature3Title: string
    feature3Desc: string
    feature4Title: string
    feature4Desc: string
    feature5Title: string
    feature5Desc: string
    feature6Title: string
    feature6Desc: string
    statCompanies: string
    statTerminations: string
    statRating: string
    statFree: string
  }
  // How It Works
  howItWorks: {
    sectionLabel: string
    title: string
    subtitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
  }
  // Generator Form
  generator: {
    title: string
    contractTypeLabel: string
    companyLabel: string
    companyPlaceholder: string
    customCompanyPlaceholder: string
    addressLabel: string
    addressPlaceholder: string
    membershipLabel: string
    membershipPlaceholder: string
    noticeLabel: string
    noticePlaceholder: string
    startDateLabel: string
    endDateLabel: string
    reasonLabel: string
    reasonPlaceholder: string
    generateButton: string
    downloadPDF: string
    print: string
    copyText: string
    copied: string
    preview: string
    pdfStyleLabel: string
    styleSwiss: string
    styleModern: string
    styleLegal: string
  }
  // Archive
  archive: {
    title: string
    subtitle: string
    searchPlaceholder: string
    filterAll: string
    filterCreated: string
    filterSent: string
    filterConfirmed: string
    statusCreated: string
    statusSent: string
    statusConfirmed: string
    total: string
    noResults: string
    deleteConfirm: string
    delete: string
    cancel: string
    downloadPDF: string
    copyText: string
    changeStatus: string
  }
  // CTA Section
  cta: {
    title: string
    subtitle: string
    button: string
  }
  // Footer
  footer: {
    tagline: string
    about: string
    aboutText: string
    legal: string
    impressum: string
    privacy: string
    terms: string
    resources: string
    blog: string
    faq: string
    support: string
    visitorCount: string
    visitors: string
    rights: string
  }
  // Navigation
  nav: {
    archive: string
    blog: string
  }
  // Blog
  blog: {
    title: string
    subtitle: string
    readMore: string
    backToBlog: string
    relatedArticles: string
  }
  // Common
  common: {
    loading: string
    error: string
    success: string
    close: string
  }
}

// German translations (default)
const de: TranslationKeys = {
  hero: {
    title: 'Verträge kündigen leicht gemacht',
    subtitle: 'Erstellen Sie rechtssichere Kündigungsschreiben in wenigen Minuten. Für alle gängigen Vertragsarten – einfach, schnell und kostenlos.',
    cta: 'Jetzt kostenlos kündigen',
    subtext: 'Keine Registrierung erforderlich',
  },
  features: {
    title: 'Warum KündigungsHeld?',
    subtitle: 'Die einfachste Art, Verträge professionell zu kündigen',
    feature1Title: 'Rechtssicher',
    feature1Desc: 'Alle Kündigungen entsprechen den aktuellen rechtlichen Anforderungen',
    feature2Title: 'Kostenlos',
    feature2Desc: 'Keine versteckten Gebühren oder Abonnements',
    feature3Title: 'Blitzschnell',
    feature3Desc: 'Kündigung in unter 2 Minuten erstellt',
    feature4Title: 'Professionell',
    feature4Desc: 'Wählen Sie aus 3 hochwertigen PDF-Designs',
    feature5Title: 'Alle Vertragsarten',
    feature5Desc: 'Von Handyvertrag bis Fitnessstudio',
    feature6Title: 'Automatisches Archiv',
    feature6Desc: 'Alle Kündigungen werden lokal gespeichert',
  },
  howItWorks: {
    title: 'So geht\'s',
    subtitle: 'In drei einfachen Schritten zur fertigen Kündigung',
    step1Title: 'Daten eingeben',
    step1Desc: 'Wählen Sie Vertragsart und Unternehmen aus',
    step2Title: 'Vorschau prüfen',
    step2Desc: 'Kontrollieren Sie den generierten Brief',
    step3Title: 'Herunterladen & Versenden',
    step3Desc: 'PDF herunterladen oder direkt drucken',
  },
  generator: {
    title: 'Kündigung erstellen',
    contractTypeLabel: 'Vertragsart',
    companyLabel: 'Unternehmen',
    companyPlaceholder: 'Unternehmen suchen...',
    customCompanyPlaceholder: 'Benutzerdefiniertes Unternehmen',
    addressLabel: 'Adresse des Unternehmens',
    addressPlaceholder: 'Straße, PLZ, Ort',
    membershipLabel: 'Mitgliedsnummer / Vertragsnummer',
    membershipPlaceholder: 'Optional',
    noticeLabel: 'Kündigungsfrist',
    noticePlaceholder: 'z.B. 3 Monate zum Monatsende',
    startDateLabel: 'Vertragsbeginn',
    endDateLabel: 'Gewünschtes Kündigungsdatum',
    reasonLabel: 'Kündigungsgrund (optional)',
    reasonPlaceholder: 'z.B. Umzug, Preiserhöhung',
    generateButton: 'Kündigung erstellen',
    downloadPDF: 'PDF herunterladen',
    print: 'Drucken',
    copyText: 'Text kopieren',
    copied: 'Kopiert!',
    preview: 'Vorschau',
    pdfStyleLabel: 'PDF-Design',
    styleSwiss: 'Swiss Precision',
    styleModern: 'Modern Executive',
    styleLegal: 'Legal Professional',
  },
  archive: {
    title: 'Kündigungs-Archiv',
    subtitle: 'Alle Ihre erstellten Kündigungen an einem Ort',
    searchPlaceholder: 'Kündigungen durchsuchen...',
    filterAll: 'Alle',
    filterCreated: 'Erstellt',
    filterSent: 'Gesendet',
    filterConfirmed: 'Bestätigt',
    statusCreated: 'Erstellt',
    statusSent: 'Gesendet',
    statusConfirmed: 'Bestätigt',
    total: 'Gesamt',
    noResults: 'Keine Kündigungen gefunden',
    deleteConfirm: 'Möchten Sie diese Kündigung wirklich löschen?',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    downloadPDF: 'PDF herunterladen',
    copyText: 'Text kopieren',
    changeStatus: 'Status ändern',
  },
  cta: {
    title: 'Bereit zum Kündigen?',
    subtitle: 'Erstellen Sie jetzt Ihr rechtssicheres Kündigungsschreiben',
    button: 'Jetzt kostenlos kündigen',
  },
  footer: {
    tagline: 'Verträge kündigen leicht gemacht',
    about: 'Über uns',
    aboutText: 'KündigungsHeld hilft Ihnen, rechtssichere Kündigungsschreiben zu erstellen – kostenlos, schnell und professionell.',
    legal: 'Rechtliches',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    resources: 'Ressourcen',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Besucherzähler',
    visitors: 'Besucher',
    rights: 'Alle Rechte vorbehalten',
  },
  nav: {
    archive: 'Archiv',
    blog: 'Blog',
  },
  blog: {
    title: 'Ratgeber & Tipps',
    subtitle: 'Alles Wissenswerte rund um Kündigungen',
    readMore: 'Weiterlesen',
    backToBlog: 'Zurück zum Blog',
    relatedArticles: 'Ähnliche Artikel',
  },
  common: {
    loading: 'Lädt...',
    error: 'Fehler',
    success: 'Erfolgreich',
    close: 'Schließen',
  },
}

// Ukrainian translations
const uk: TranslationKeys = {
  hero: {
    title: 'Розірвання договорів стало простим',
    subtitle: 'Створюйте юридично правильні листи про розірвання за лічені хвилини. Для всіх типів договорів – просто, швидко та безкоштовно.',
    cta: 'Розірвати безкоштовно',
    subtext: 'Реєстрація не потрібна',
  },
  features: {
    title: 'Чому KündigungsHeld?',
    subtitle: 'Найпростіший спосіб професійно розірвати договори',
    feature1Title: 'Юридично правильно',
    feature1Desc: 'Всі розірвання відповідають чинним юридичним вимогам',
    feature2Title: 'Безкоштовно',
    feature2Desc: 'Ніяких прихованих платежів чи підписок',
    feature3Title: 'Блискавично швидко',
    feature3Desc: 'Розірвання створено менш ніж за 2 хвилини',
    feature4Title: 'Професійно',
    feature4Desc: 'Виберіть один із 3 високоякісних PDF-дизайнів',
    feature5Title: 'Всі типи договорів',
    feature5Desc: 'Від мобільного зв\'язку до фітнес-центру',
    feature6Title: 'Автоматичний архів',
    feature6Desc: 'Всі розірвання зберігаються локально',
  },
  howItWorks: {
    title: 'Як це працює',
    subtitle: 'Три прості кроки до готового розірвання',
    step1Title: 'Введіть дані',
    step1Desc: 'Виберіть тип договору та компанію',
    step2Title: 'Перевірте попередній перегляд',
    step2Desc: 'Перевірте згенерований лист',
    step3Title: 'Завантажте та надішліть',
    step3Desc: 'Завантажте PDF або роздрукуйте безпосередньо',
  },
  generator: {
    title: 'Створити розірвання',
    contractTypeLabel: 'Тип договору',
    companyLabel: 'Компанія',
    companyPlaceholder: 'Шукати компанію...',
    customCompanyPlaceholder: 'Власна компанія',
    addressLabel: 'Адреса компанії',
    addressPlaceholder: 'Вулиця, індекс, місто',
    membershipLabel: 'Номер членства / договору',
    membershipPlaceholder: 'Необов\'язково',
    noticeLabel: 'Термін попередження',
    noticePlaceholder: 'наприклад, 3 місяці до кінця місяця',
    startDateLabel: 'Початок договору',
    endDateLabel: 'Бажана дата розірвання',
    reasonLabel: 'Причина розірвання (необов\'язково)',
    reasonPlaceholder: 'наприклад, переїзд, підвищення ціни',
    generateButton: 'Створити розірвання',
    downloadPDF: 'Завантажити PDF',
    print: 'Друк',
    copyText: 'Копіювати текст',
    copied: 'Скопійовано!',
    preview: 'Попередній перегляд',
    pdfStyleLabel: 'Дизайн PDF',
    styleSwiss: 'Швейцарська точність',
    styleModern: 'Сучасний executive',
    styleLegal: 'Юридичний професіонал',
  },
  archive: {
    title: 'Архів розірвань',
    subtitle: 'Всі ваші створені розірвання в одному місці',
    searchPlaceholder: 'Шукати розірвання...',
    filterAll: 'Всі',
    filterCreated: 'Створено',
    filterSent: 'Надіслано',
    filterConfirmed: 'Підтверджено',
    statusCreated: 'Створено',
    statusSent: 'Надіслано',
    statusConfirmed: 'Підтверджено',
    total: 'Всього',
    noResults: 'Розірвання не знайдено',
    deleteConfirm: 'Ви дійсно хочете видалити це розірвання?',
    delete: 'Видалити',
    cancel: 'Скасувати',
    downloadPDF: 'Завантажити PDF',
    copyText: 'Копіювати текст',
    changeStatus: 'Змінити статус',
  },
  cta: {
    title: 'Готові розірвати?',
    subtitle: 'Створіть свій юридично правильний лист про розірвання зараз',
    button: 'Розірвати безкоштовно',
  },
  footer: {
    tagline: 'Розірвання договорів стало простим',
    about: 'Про нас',
    aboutText: 'KündigungsHeld допомагає вам створювати юридично правильні листи про розірвання – безкоштовно, швидко та професійно.',
    legal: 'Юридична інформація',
    impressum: 'Імпресум',
    privacy: 'Конфіденційність',
    terms: 'Умови',
    resources: 'Ресурси',
    blog: 'Блог',
    faq: 'FAQ',
    support: 'Підтримка',
    visitorCount: 'Лічильник відвідувачів',
    visitors: 'Відвідувачі',
    rights: 'Всі права захищено',
  },
  nav: {
    archive: 'Архів',
    blog: 'Блог',
  },
  blog: {
    title: 'Поради та рекомендації',
    subtitle: 'Все, що потрібно знати про розірвання договорів',
    readMore: 'Читати далі',
    backToBlog: 'Назад до блогу',
    relatedArticles: 'Схожі статті',
  },
  common: {
    loading: 'Завантаження...',
    error: 'Помилка',
    success: 'Успішно',
    close: 'Закрити',
  },
}

// English translations
const en: TranslationKeys = {
  hero: {
    title: 'Contract Termination Made Easy',
    subtitle: 'Create legally compliant termination letters in minutes. For all common contract types – simple, fast, and free.',
    cta: 'Terminate for Free Now',
    subtext: 'No registration required',
  },
  features: {
    title: 'Why KündigungsHeld?',
    subtitle: 'The easiest way to terminate contracts professionally',
    feature1Title: 'Legally Compliant',
    feature1Desc: 'All terminations meet current legal requirements',
    feature2Title: 'Free',
    feature2Desc: 'No hidden fees or subscriptions',
    feature3Title: 'Lightning Fast',
    feature3Desc: 'Termination created in under 2 minutes',
    feature4Title: 'Professional',
    feature4Desc: 'Choose from 3 high-quality PDF designs',
    feature5Title: 'All Contract Types',
    feature5Desc: 'From mobile contracts to gym memberships',
    feature6Title: 'Automatic Archive',
    feature6Desc: 'All terminations saved locally',
  },
  howItWorks: {
    title: 'How It Works',
    subtitle: 'Three simple steps to your finished termination',
    step1Title: 'Enter Details',
    step1Desc: 'Select contract type and company',
    step2Title: 'Review Preview',
    step2Desc: 'Check the generated letter',
    step3Title: 'Download & Send',
    step3Desc: 'Download PDF or print directly',
  },
  generator: {
    title: 'Create Termination',
    contractTypeLabel: 'Contract Type',
    companyLabel: 'Company',
    companyPlaceholder: 'Search company...',
    customCompanyPlaceholder: 'Custom company',
    addressLabel: 'Company Address',
    addressPlaceholder: 'Street, ZIP, City',
    membershipLabel: 'Membership / Contract Number',
    membershipPlaceholder: 'Optional',
    noticeLabel: 'Notice Period',
    noticePlaceholder: 'e.g., 3 months to end of month',
    startDateLabel: 'Contract Start',
    endDateLabel: 'Desired Termination Date',
    reasonLabel: 'Termination Reason (optional)',
    reasonPlaceholder: 'e.g., relocation, price increase',
    generateButton: 'Create Termination',
    downloadPDF: 'Download PDF',
    print: 'Print',
    copyText: 'Copy Text',
    copied: 'Copied!',
    preview: 'Preview',
    pdfStyleLabel: 'PDF Design',
    styleSwiss: 'Swiss Precision',
    styleModern: 'Modern Executive',
    styleLegal: 'Legal Professional',
  },
  archive: {
    title: 'Termination Archive',
    subtitle: 'All your created terminations in one place',
    searchPlaceholder: 'Search terminations...',
    filterAll: 'All',
    filterCreated: 'Created',
    filterSent: 'Sent',
    filterConfirmed: 'Confirmed',
    statusCreated: 'Created',
    statusSent: 'Sent',
    statusConfirmed: 'Confirmed',
    total: 'Total',
    noResults: 'No terminations found',
    deleteConfirm: 'Do you really want to delete this termination?',
    delete: 'Delete',
    cancel: 'Cancel',
    downloadPDF: 'Download PDF',
    copyText: 'Copy Text',
    changeStatus: 'Change Status',
  },
  cta: {
    title: 'Ready to Terminate?',
    subtitle: 'Create your legally compliant termination letter now',
    button: 'Terminate for Free Now',
  },
  footer: {
    tagline: 'Contract termination made easy',
    about: 'About Us',
    aboutText: 'KündigungsHeld helps you create legally compliant termination letters – free, fast, and professional.',
    legal: 'Legal',
    impressum: 'Imprint',
    privacy: 'Privacy',
    terms: 'Terms',
    resources: 'Resources',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Visitor Counter',
    visitors: 'Visitors',
    rights: 'All rights reserved',
  },
  nav: {
    archive: 'Archive',
    blog: 'Blog',
  },
  blog: {
    title: 'Guides & Tips',
    subtitle: 'Everything you need to know about terminations',
    readMore: 'Read More',
    backToBlog: 'Back to Blog',
    relatedArticles: 'Related Articles',
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
  },
}

// Turkish translations
const tr: TranslationKeys = {
  hero: {
    title: 'Sözleşme İptali Kolaylaştı',
    subtitle: 'Dakikalar içinde yasal olarak uyumlu fesih mektupları oluşturun. Tüm yaygın sözleşme türleri için – basit, hızlı ve ücretsiz.',
    cta: 'Ücretsiz İptal Et',
    subtext: 'Kayıt gerekmez',
  },
  features: {
    title: 'Neden KündigungsHeld?',
    subtitle: 'Sözleşmeleri profesyonelce feshetmenin en kolay yolu',
    feature1Title: 'Yasal Uyum',
    feature1Desc: 'Tüm fesihler güncel yasal gerekliliklere uygundur',
    feature2Title: 'Ücretsiz',
    feature2Desc: 'Gizli ücret veya abonelik yok',
    feature3Title: 'Çok Hızlı',
    feature3Desc: 'Fesih 2 dakikadan kısa sürede oluşturulur',
    feature4Title: 'Profesyonel',
    feature4Desc: '3 yüksek kaliteli PDF tasarımı arasından seçim yapın',
    feature5Title: 'Tüm Sözleşme Türleri',
    feature5Desc: 'Cep telefonu sözleşmesinden spor salonuna',
    feature6Title: 'Otomatik Arşiv',
    feature6Desc: 'Tüm fesihler yerel olarak saklanır',
  },
  howItWorks: {
    title: 'Nasıl Çalışır',
    subtitle: 'Bitmiş feshine üç basit adım',
    step1Title: 'Bilgileri Girin',
    step1Desc: 'Sözleşme türünü ve şirketi seçin',
    step2Title: 'Önizlemeyi İnceleyin',
    step2Desc: 'Oluşturulan mektubu kontrol edin',
    step3Title: 'İndirin ve Gönderin',
    step3Desc: 'PDF indirin veya doğrudan yazdırın',
  },
  generator: {
    title: 'Fesih Oluştur',
    contractTypeLabel: 'Sözleşme Türü',
    companyLabel: 'Şirket',
    companyPlaceholder: 'Şirket ara...',
    customCompanyPlaceholder: 'Özel şirket',
    addressLabel: 'Şirket Adresi',
    addressPlaceholder: 'Sokak, Posta Kodu, Şehir',
    membershipLabel: 'Üyelik / Sözleşme Numarası',
    membershipPlaceholder: 'İsteğe bağlı',
    noticeLabel: 'Bildirim Süresi',
    noticePlaceholder: 'örn., ay sonuna kadar 3 ay',
    startDateLabel: 'Sözleşme Başlangıcı',
    endDateLabel: 'İstenen Fesih Tarihi',
    reasonLabel: 'Fesih Nedeni (isteğe bağlı)',
    reasonPlaceholder: 'örn., taşınma, fiyat artışı',
    generateButton: 'Fesih Oluştur',
    downloadPDF: 'PDF İndir',
    print: 'Yazdır',
    copyText: 'Metni Kopyala',
    copied: 'Kopyalandı!',
    preview: 'Önizleme',
    pdfStyleLabel: 'PDF Tasarımı',
    styleSwiss: 'İsviçre Hassasiyeti',
    styleModern: 'Modern Yönetici',
    styleLegal: 'Hukuk Profesyoneli',
  },
  archive: {
    title: 'Fesih Arşivi',
    subtitle: 'Oluşturduğunuz tüm fesihler tek yerde',
    searchPlaceholder: 'Fesihlerde ara...',
    filterAll: 'Tümü',
    filterCreated: 'Oluşturuldu',
    filterSent: 'Gönderildi',
    filterConfirmed: 'Onaylandı',
    statusCreated: 'Oluşturuldu',
    statusSent: 'Gönderildi',
    statusConfirmed: 'Onaylandı',
    total: 'Toplam',
    noResults: 'Fesih bulunamadı',
    deleteConfirm: 'Bu fesihi gerçekten silmek istiyor musunuz?',
    delete: 'Sil',
    cancel: 'İptal',
    downloadPDF: 'PDF İndir',
    copyText: 'Metni Kopyala',
    changeStatus: 'Durumu Değiştir',
  },
  cta: {
    title: 'Feshetmeye Hazır mısınız?',
    subtitle: 'Şimdi yasal olarak uyumlu fesih mektubunuzu oluşturun',
    button: 'Şimdi Ücretsiz Feshet',
  },
  footer: {
    tagline: 'Sözleşme iptali kolaylaştı',
    about: 'Hakkımızda',
    aboutText: 'KündigungsHeld, yasal olarak uyumlu fesih mektupları oluşturmanıza yardımcı olur – ücretsiz, hızlı ve profesyonel.',
    legal: 'Yasal',
    impressum: 'Künye',
    privacy: 'Gizlilik',
    terms: 'Şartlar',
    resources: 'Kaynaklar',
    blog: 'Blog',
    faq: 'SSS',
    support: 'Destek',
    visitorCount: 'Ziyaretçi Sayacı',
    visitors: 'Ziyaretçiler',
    rights: 'Tüm hakları saklıdır',
  },
  nav: {
    archive: 'Arşiv',
    blog: 'Blog',
  },
  blog: {
    title: 'Rehber ve İpuçları',
    subtitle: 'Fesihler hakkında bilmeniz gereken her şey',
    readMore: 'Devamını Oku',
    backToBlog: 'Bloga Dön',
    relatedArticles: 'İlgili Makaleler',
  },
  common: {
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    close: 'Kapat',
  },
}

// Chinese translations
const zh: TranslationKeys = {
  hero: {
    title: '轻松终止合同',
    subtitle: '在几分钟内创建符合法律要求的终止信函。适用于所有常见合同类型 - 简单、快速、免费。',
    cta: '立即免费终止',
    subtext: '无需注册',
  },
  features: {
    title: '为什么选择 KündigungsHeld?',
    subtitle: '专业终止合同的最简单方法',
    feature1Title: '符合法律',
    feature1Desc: '所有终止均符合现行法律要求',
    feature2Title: '免费',
    feature2Desc: '无隐藏费用或订阅',
    feature3Title: '极速',
    feature3Desc: '2分钟内创建终止信函',
    feature4Title: '专业',
    feature4Desc: '从3种高质量PDF设计中选择',
    feature5Title: '所有合同类型',
    feature5Desc: '从手机合同到健身房会员',
    feature6Title: '自动存档',
    feature6Desc: '所有终止信函本地保存',
  },
  howItWorks: {
    title: '如何使用',
    subtitle: '三个简单步骤完成终止',
    step1Title: '输入详情',
    step1Desc: '选择合同类型和公司',
    step2Title: '查看预览',
    step2Desc: '检查生成的信函',
    step3Title: '下载并发送',
    step3Desc: '下载PDF或直接打印',
  },
  generator: {
    title: '创建终止信函',
    contractTypeLabel: '合同类型',
    companyLabel: '公司',
    companyPlaceholder: '搜索公司...',
    customCompanyPlaceholder: '自定义公司',
    addressLabel: '公司地址',
    addressPlaceholder: '街道、邮编、城市',
    membershipLabel: '会员号/合同号',
    membershipPlaceholder: '可选',
    noticeLabel: '通知期',
    noticePlaceholder: '例如,月底前3个月',
    startDateLabel: '合同开始日期',
    endDateLabel: '期望终止日期',
    reasonLabel: '终止原因(可选)',
    reasonPlaceholder: '例如,搬家、涨价',
    generateButton: '创建终止信函',
    downloadPDF: '下载PDF',
    print: '打印',
    copyText: '复制文本',
    copied: '已复制!',
    preview: '预览',
    pdfStyleLabel: 'PDF设计',
    styleSwiss: '瑞士精准',
    styleModern: '现代商务',
    styleLegal: '法律专业',
  },
  archive: {
    title: '终止存档',
    subtitle: '您创建的所有终止信函集中在一处',
    searchPlaceholder: '搜索终止信函...',
    filterAll: '全部',
    filterCreated: '已创建',
    filterSent: '已发送',
    filterConfirmed: '已确认',
    statusCreated: '已创建',
    statusSent: '已发送',
    statusConfirmed: '已确认',
    total: '总计',
    noResults: '未找到终止信函',
    deleteConfirm: '您确定要删除此终止信函吗?',
    delete: '删除',
    cancel: '取消',
    downloadPDF: '下载PDF',
    copyText: '复制文本',
    changeStatus: '更改状态',
  },
  cta: {
    title: '准备好终止了吗?',
    subtitle: '立即创建符合法律要求的终止信函',
    button: '立即免费终止',
  },
  footer: {
    tagline: '轻松终止合同',
    about: '关于我们',
    aboutText: 'KündigungsHeld帮助您创建符合法律要求的终止信函 - 免费、快速、专业。',
    legal: '法律',
    impressum: '版权声明',
    privacy: '隐私',
    terms: '条款',
    resources: '资源',
    blog: '博客',
    faq: '常见问题',
    support: '支持',
    visitorCount: '访客计数器',
    visitors: '访客',
    rights: '保留所有权利',
  },
  nav: {
    archive: '存档',
    blog: '博客',
  },
  blog: {
    title: '指南与技巧',
    subtitle: '关于终止合同的一切知识',
    readMore: '阅读更多',
    backToBlog: '返回博客',
    relatedArticles: '相关文章',
  },
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    close: '关闭',
  },
}

// Translations object
export const translations: Record<Language, TranslationKeys> = {
  de,
  uk,
  en,
  tr,
  zh,
}

// Helper function to get nested translation
export function getTranslation(
  lang: Language,
  key: string
): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
