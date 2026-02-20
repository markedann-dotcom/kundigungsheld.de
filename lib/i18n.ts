/**
 * Complete i18n System for KündigungsHeld
 * Supports: German (de), Ukrainian (uk), English (en), Turkish (tr), Chinese (zh)
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

export type TranslationKeys = {
  hero: {
    title: string
    subtitle: string
    cta: string
    subtext: string
    badge: string
    howItWorksCTA: string
    stats: {
      terminations: string
      companies: string
      rating: string
    }
    mockup: {
      secure: string
      id: string
      pdfReady: string
      instantDownload: string
      validated: string
      legal: string
    }
    features: {
      secure: string
      fast: string
      free: string
    }
  }
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
  testimonials: {
    sectionLabel: string
    title: string
    subtitle: string
    testimonial1Text: string
    testimonial2Text: string
    testimonial3Text: string
    testimonial4Text: string
    testimonial5Text: string
    testimonial6Text: string
  }
  faq: {
    sectionLabel: string
    title: string
    q1: string
    a1: string
    q2: string
    a2: string
    q3: string
    a3: string
    q4: string
    a4: string
    q5: string
    a5: string
    q6: string
    a6: string
    q7: string
    a7: string
  }
  blog: {
    sectionLabel: string
    title: string
    subtitle: string
    readAll: string
  }
  generator: {
    title: string
    step: string
    stepOf: string
    nextStep: string
    previousStep: string
    selectCompany: string
    customCompany: string
    searchCompany: string
    category: string
    allCategories: string
    yourDetails: string
    salutation: string
    firstName: string
    lastName: string
    street: string
    postalCode: string
    city: string
    customerNumber: string
    contractNumber: string
    terminationType: string
    terminationDate: string
    nextPossible: string
    reason: string
    additionalInfo: string
    preview: string
    generating: string
    copyToClipboard: string
    copied: string
    downloadPDF: string
    print: string
    sendEmail: string
    saveToArchive: string
    saved: string
  }
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
    exportCSV: string
    backToHome: string
    emptyStateTitle: string
    emptyStateDesc: string
    emptyStateButton: string
    noSearchResultsTitle: string
    noSearchResultsDesc: string
    changeStatusLabel: string
    noteLabel: string
    notePlaceholder: string
    save: string
    letterPreview: string
    copied: string
    privacyNotice: string
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
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
  nav: {
    features: string
    howItWorks: string
    archive: string
    blog: string
    faq: string
  }
  common: {
    loading: string
    error: string
    success: string
    close: string
  }
}

const de: TranslationKeys = {
  hero: {
    title: 'Verträge kündigen leicht gemacht',
    subtitle: 'Erstellen Sie rechtssichere Kündigungsschreiben in wenigen Minuten. Für alle gängigen Vertragsarten – einfach, schnell und kostenlos.',
    cta: 'Jetzt kostenlos kündigen',
    subtext: 'Keine Registrierung erforderlich',
    badge: 'Über 300 Anbieter verfügbar',
    howItWorksCTA: "So funktioniert's",
    stats: {
      terminations: 'Kündigungen',
      companies: 'Anbieter',
      rating: 'Bewertung',
    },
    mockup: {
      secure: 'Rechtssicher',
      id: 'ID',
      pdfReady: 'PDF Ready',
      instantDownload: 'Sofort Download',
      validated: 'Validiert',
      legal: '100% Legal',
    },
    features: {
      secure: 'Rechtssicher',
      fast: 'In 2 Minuten',
      free: '100% kostenlos',
    },
  },
  features: {
    sectionLabel: 'Funktionen',
    title: 'Alles was Sie brauchen, um Verträge zu kündigen',
    subtitle: 'KündigungsHeld vereinfacht den gesamten Kündigungsprozess mit intelligenten Vorlagen und einer umfangreichen Unternehmensdatenbank.',
    feature1Title: '150+ Unternehmen',
    feature1Desc: 'Von Telekom bis Netflix, von Allianz bis Trade Republic — Adressen und Fristen aller wichtigen Anbieter.',
    feature2Title: 'Rechtssichere Vorlagen',
    feature2Desc: 'Unsere Vorlagen werden von Experten erstellt und decken alle Kündigungsarten ab: ordentlich, außerordentlich, Widerruf.',
    feature3Title: 'Fertig in 2 Minuten',
    feature3Desc: 'Anbieter auswählen, Daten eingeben, Schreiben generieren. So einfach war Kündigen noch nie.',
    feature4Title: 'DSGVO-konform',
    feature4Desc: 'Ihre Daten werden nicht gespeichert und nicht an Dritte weitergegeben. Alles passiert direkt in Ihrem Browser.',
    feature5Title: 'Alle Kündigungsarten',
    feature5Desc: 'Ordentliche Kündigung, Sonderkündigung, Widerruf, fristlose Kündigung, Umzug oder Todesfall.',
    feature6Title: 'PDF, Druck & E-Mail',
    feature6Desc: 'Laden Sie Ihr Schreiben als PDF herunter, drucken Sie es direkt aus, oder senden Sie es per E-Mail.',
    statCompanies: 'Unternehmen',
    statTerminations: 'Kündigungen',
    statRating: 'Bewertung',
    statFree: 'Kostenlos',
  },
  howItWorks: {
    sectionLabel: "So geht's",
    title: 'In drei einfachen Schritten zur Kündigung',
    subtitle: 'Kein Anwalt, kein Fachwissen nötig. Unser Generator führt Sie Schritt für Schritt durch den Prozess.',
    step1Title: 'Anbieter auswählen',
    step1Desc: 'Suchen Sie Ihren Anbieter aus unserer Datenbank mit über 150 deutschen Unternehmen. Alle wichtigen Informationen wie Adresse und Kündigungsfristen werden automatisch eingefügt.',
    step2Title: 'Formular ausfüllen',
    step2Desc: 'Geben Sie Ihre persönlichen Daten und Vertragsinformationen ein. Wählen Sie die passende Kündigungsart — von ordentlich bis Sonderkündigung.',
    step3Title: 'Kündigung versenden',
    step3Desc: 'Ihr Kündigungsschreiben wird sofort generiert. Kopieren Sie es in die Zwischenablage oder laden Sie es herunter. Dann nur noch per Post versenden!',
  },
  testimonials: {
    sectionLabel: 'Kundenstimmen',
    title: 'Über 10.000 zufriedene Nutzer',
    subtitle: 'Erfahren Sie, was unsere Nutzer über KündigungsHeld sagen.',
    testimonial1Text: 'Ich musste meinen Fitnessstudio-Vertrag kündigen und wusste nicht wie. Mit KündigungsHeld war das Schreiben in 2 Minuten fertig. Absolut empfehlenswert!',
    testimonial2Text: 'Endlich ein Tool, das wirklich funktioniert. Habe schon drei Verträge damit gekündigt - Telekom, Vodafone und Sky. Jedes Mal problemlos.',
    testimonial3Text: 'Die Sonderkündigung wegen Preiserhöhung war perfekt formuliert. Mein Versicherungsanbieter hat sofort akzeptiert. Danke!',
    testimonial4Text: 'Super einfach zu bedienen. Habe meine DAZN-Mitgliedschaft und mein Zeitungsabo gleichzeitig gekündigt. Alles in unter 5 Minuten.',
    testimonial5Text: 'Als ich umgezogen bin, musste ich meinen DSL-Vertrag kündigen. Die Umzugs-Vorlage war genau richtig. Der Anbieter hat sofort bestätigt.',
    testimonial6Text: 'Dass man sogar an die Widerspruchsklausel gegen Werbung gedacht hat, zeigt wie durchdacht die Vorlagen sind. Klasse Service!',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Häufig gestellte Fragen',
    q1: 'Ist die Nutzung wirklich kostenlos?',
    a1: 'Ja, absolut! KündigungsHeld ist zu 100% kostenlos. Es gibt keine versteckten Kosten, keine Limits und keine Premium-Versionen.',
    q2: 'Sind die Kündigungsschreiben rechtlich gültig?',
    a2: 'Unsere Vorlagen sind von juristischen Experten erstellt und entsprechen den Anforderungen des deutschen Rechts.',
    q3: 'Werden meine Daten gespeichert?',
    a3: 'Ihre Kündigungsdaten werden ausschließlich in Ihrem Browser verarbeitet und nicht an unsere Server übermittelt.',
    q4: 'Was mache ich nach dem Erstellen des Schreibens?',
    a4: 'Drucken Sie das Schreiben aus und senden Sie es per Post — am besten als Einschreiben mit Rückschein.',
    q5: 'Was ist der Unterschied zwischen ordentlicher und außerordentlicher Kündigung?',
    a5: 'Eine ordentliche Kündigung erfolgt unter Einhaltung der Kündigungsfrist. Eine außerordentliche ist nur bei wichtigem Grund möglich.',
    q6: 'Kann ich auch Verträge kündigen, die nicht in Ihrer Liste sind?',
    a6: 'Ja! Sie können unsere allgemeinen Vorlagen verwenden und die Anbieteradresse selbst eintragen.',
    q7: 'Was ist das Archiv und wie funktioniert es?',
    a7: 'Im Archiv verwalten Sie alle Kündigungen und verfolgen den Status. Alle Daten werden lokal gespeichert.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Rechtstipps von Experten',
    subtitle: 'Aktuelle Artikel von deutschen Rechtsanwälten rund um das Thema Kündigung.',
    readAll: 'Alle Artikel lesen',
  },
  generator: {
    title: 'Kündigung erstellen',
    step: 'Schritt',
    stepOf: 'von',
    nextStep: 'Weiter',
    previousStep: 'Zurück',
    selectCompany: 'Unternehmen auswählen',
    customCompany: 'Benutzerdefiniertes Unternehmen',
    searchCompany: 'Unternehmen suchen...',
    category: 'Kategorie',
    allCategories: 'Alle Kategorien',
    yourDetails: 'Ihre Daten',
    salutation: 'Anrede',
    firstName: 'Vorname',
    lastName: 'Nachname',
    street: 'Straße und Hausnummer',
    postalCode: 'Postleitzahl',
    city: 'Ort',
    customerNumber: 'Kundennummer',
    contractNumber: 'Vertragsnummer',
    terminationType: 'Kündigungsart',
    terminationDate: 'Kündigung zum',
    nextPossible: 'Nächstmöglicher Termin',
    reason: 'Grund (optional)',
    additionalInfo: 'Zusatzinformationen',
    preview: 'Vorschau',
    generating: 'Erstelle Kündigung...',
    copyToClipboard: 'In Zwischenablage kopieren',
    copied: 'Kopiert!',
    downloadPDF: 'Als PDF herunterladen',
    print: 'Drucken',
    sendEmail: 'Per E-Mail senden',
    saveToArchive: 'Im Archiv speichern',
    saved: 'Gespeichert!',
  },
  archive: {
    title: 'Mein Archiv',
    subtitle: 'Übersicht über alle erstellten Kündigungen',
    searchPlaceholder: 'Suchen nach Unternehmen, Name oder Grund...',
    filterAll: 'Alle',
    filterCreated: 'Erstellt',
    filterSent: 'Versendet',
    filterConfirmed: 'Bestätigt',
    statusCreated: 'Erstellt',
    statusSent: 'Versendet',
    statusConfirmed: 'Bestätigt',
    total: 'Gesamt',
    noResults: 'Keine Kündigungen gefunden',
    deleteConfirm: 'Möchten Sie diese Kündigung wirklich löschen?',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    downloadPDF: 'PDF herunterladen',
    copyText: 'Text kopieren',
    changeStatus: 'Status ändern',
    exportCSV: 'Archiv als CSV exportieren',
    backToHome: 'Zur Startseite',
    emptyStateTitle: 'Noch keine Kündigungen',
    emptyStateDesc: 'Erstellen Sie Ihre erste Kündigung mit unserem Generator.',
    emptyStateButton: 'Kündigung erstellen',
    noSearchResultsTitle: 'Keine Ergebnisse',
    noSearchResultsDesc: 'Versuchen Sie einen anderen Suchbegriff oder Filter.',
    changeStatusLabel: 'Status ändern',
    noteLabel: 'Notiz',
    notePlaceholder: 'Notiz hinzufügen (z.B. Versanddatum, Tracking-Nummer...)',
    save: 'Speichern',
    letterPreview: 'Kündigungsschreiben',
    copied: 'Kopiert!',
    privacyNotice: 'Alle Daten werden lokal in Ihrem Browser gespeichert.',
  },
  cta: {
    title: 'Bereit zum Kündigen?',
    subtitle: 'Erstellen Sie Ihr rechtssicheres Kündigungsschreiben in weniger als 2 Minuten — komplett kostenlos.',
    button: 'Jetzt Kündigung erstellen',
  },
  footer: {
    tagline: 'Verträge kündigen leicht gemacht',
    about: 'Über uns',
    aboutText: 'KündigungsHeld macht Vertragskündigungen einfach, schnell und rechtssicher.',
    legal: 'Rechtliches',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    resources: 'Ressourcen',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Besucher',
    visitors: 'Besucher',
    rights: 'Alle Rechte vorbehalten',
  },
  nav: {
    features: 'Funktionen',
    howItWorks: "So geht's",
    archive: 'Mein Archiv',
    blog: 'Blog',
    faq: 'FAQ',
  },
  common: {
    loading: 'Lädt...',
    error: 'Ein Fehler ist aufgetreten',
    success: 'Erfolgreich!',
    close: 'Schließen',
  },
}

const uk: TranslationKeys = {
  hero: {
    title: 'Розірвання договорів стало простим',
    subtitle: 'Створюйте юридично правильні листи про розірвання за лічені хвилини. Для всіх типів договорів — просто, швидко та безкоштовно.',
    cta: 'Розірвати договір зараз',
    subtext: 'Без реєстрації',
    badge: 'Понад 300 провайдерів',
    howItWorksCTA: 'Як це працює',
    stats: {
      terminations: 'Розірвань',
      companies: 'Провайдерів',
      rating: 'Рейтинг',
    },
    mockup: {
      secure: 'Юридично правильно',
      id: 'ID',
      pdfReady: 'PDF готовий',
      instantDownload: 'Миттєве завантаження',
      validated: 'Перевірено',
      legal: '100% Legal',
    },
    features: {
      secure: 'Юридично правильно',
      fast: 'За 2 хвилини',
      free: '100% безкоштовно',
    },
  },
  features: {
    sectionLabel: 'Функції',
    title: 'Все що потрібно для розірвання договорів',
    subtitle: 'KündigungsHeld спрощує весь процес розірвання з розумними шаблонами та великою базою компаній.',
    feature1Title: '150+ компаній',
    feature1Desc: 'Від Telekom до Netflix, від Allianz до Trade Republic — адреси та терміни всіх важливих провайдерів.',
    feature2Title: 'Юридично правильні шаблони',
    feature2Desc: 'Наші шаблони створені експертами та охоплюють всі типи розірвання.',
    feature3Title: 'Готово за 2 хвилини',
    feature3Desc: 'Виберіть провайдера, введіть дані, згенеруйте лист.',
    feature4Title: 'GDPR-сумісність',
    feature4Desc: 'Ваші дані не зберігаються і не передаються третім особам.',
    feature5Title: 'Всі типи розірвання',
    feature5Desc: 'Звичайне розірвання, спеціальне, відкликання, негайне, переїзд або смерть.',
    feature6Title: 'PDF, друк та email',
    feature6Desc: 'Завантажте як PDF, роздрукуйте або надішліть електронною поштою.',
    statCompanies: 'Компанії',
    statTerminations: 'Розірвання',
    statRating: 'Рейтинг',
    statFree: 'Безкоштовно',
  },
  howItWorks: {
    sectionLabel: 'Як це працює',
    title: 'Три прості кроки до розірвання',
    subtitle: 'Не потрібен адвокат чи спеціальні знання. Наш генератор проведе вас крок за кроком.',
    step1Title: 'Виберіть провайдера',
    step1Desc: 'Знайдіть свого провайдера в нашій базі з понад 150 німецьких компаній.',
    step2Title: 'Заповніть форму',
    step2Desc: 'Введіть свої персональні дані та інформацію про договір.',
    step3Title: 'Надішліть розірвання',
    step3Desc: 'Ваш лист створюється миттєво. Скопіюйте або завантажте, потім надішліть поштою!',
  },
  testimonials: {
    sectionLabel: 'Відгуки клієнтів',
    title: 'Понад 10,000 задоволених користувачів',
    subtitle: 'Дізнайтеся, що наші користувачі кажуть про KündigungsHeld.',
    testimonial1Text: 'Мені потрібно було розірвати договір з фітнес-клубом. З KündigungsHeld лист був готовий за 2 хвилини!',
    testimonial2Text: 'Нарешті інструмент, який дійсно працює. Вже розірвав три договори без проблем.',
    testimonial3Text: 'Спеціальне розірвання через підвищення ціни було ідеально сформульоване. Дякую!',
    testimonial4Text: 'Супер просто. Розірвав членство DAZN та газетну підписку за 5 хвилин.',
    testimonial5Text: 'Шаблон для переїзду був ідеальним. Провайдер одразу підтвердив.',
    testimonial6Text: 'Дуже продумані шаблони. Чудовий сервіс!',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Часті запитання',
    q1: 'Це дійсно безкоштовно?',
    a1: 'Так, абсолютно! KündigungsHeld на 100% безкоштовний.',
    q2: 'Чи юридично дійсні листи про розірвання?',
    a2: 'Наші шаблони створені юридичними експертами відповідно до німецького права.',
    q3: 'Чи зберігаються мої дані?',
    a3: 'Ваші дані обробляються виключно у вашому браузері і не передаються на сервери.',
    q4: 'Що робити після створення листа?',
    a4: 'Роздрукуйте та надішліть поштою на вказану адресу — краще рекомендованим листом.',
    q5: 'Яка різниця між звичайним та надзвичайним розірванням?',
    a5: 'Звичайне дотримується терміну повідомлення. Надзвичайне — лише за важливої причини.',
    q6: 'Чи можу я розірвати договори, яких немає у вашому списку?',
    a6: 'Так! Використовуйте загальні шаблони і введіть адресу провайдера самостійно.',
    q7: 'Що таке архів і як він працює?',
    a7: 'В архіві керуйте всіма розірваннями та відстежуйте статус. Дані зберігаються локально.',
  },
  blog: {
    sectionLabel: 'Блог',
    title: 'Юридичні поради експертів',
    subtitle: 'Актуальні статті про розірвання договорів та захист прав споживачів.',
    readAll: 'Читати всі статті',
  },
  generator: {
    title: 'Створити розірвання',
    step: 'Крок',
    stepOf: 'з',
    nextStep: 'Далі',
    previousStep: 'Назад',
    selectCompany: 'Вибрати компанію',
    customCompany: 'Власна компанія',
    searchCompany: 'Шукати компанію...',
    category: 'Категорія',
    allCategories: 'Всі категорії',
    yourDetails: 'Ваші дані',
    salutation: 'Звертання',
    firstName: "Ім'я",
    lastName: 'Прізвище',
    street: 'Вулиця та номер будинку',
    postalCode: 'Поштовий індекс',
    city: 'Місто',
    customerNumber: 'Номер клієнта',
    contractNumber: 'Номер договору',
    terminationType: 'Тип розірвання',
    terminationDate: 'Розірвання до',
    nextPossible: 'Найближча можлива дата',
    reason: "Причина (необов'язково)",
    additionalInfo: 'Додаткова інформація',
    preview: 'Попередній перегляд',
    generating: 'Створюю розірвання...',
    copyToClipboard: 'Копіювати',
    copied: 'Скопійовано!',
    downloadPDF: 'Завантажити PDF',
    print: 'Друкувати',
    sendEmail: 'Надіслати email',
    saveToArchive: 'Зберегти в архів',
    saved: 'Збережено!',
  },
  archive: {
    title: 'Мій архів',
    subtitle: 'Керуйте всіма своїми розірваннями в одному місці',
    searchPlaceholder: "Шукати компанію, ім'я або причину...",
    filterAll: 'Всі',
    filterCreated: 'Створено',
    filterSent: 'Надіслано',
    filterConfirmed: 'Підтверджено',
    statusCreated: 'Створено',
    statusSent: 'Надіслано',
    statusConfirmed: 'Підтверджено',
    total: 'Всього',
    noResults: 'Розірвань не знайдено',
    deleteConfirm: 'Ви впевнені, що хочете видалити це розірвання?',
    delete: 'Видалити',
    cancel: 'Скасувати',
    downloadPDF: 'Завантажити PDF',
    copyText: 'Копіювати текст',
    changeStatus: 'Змінити статус',
    exportCSV: 'Експортувати архів як CSV',
    backToHome: 'На головну сторінку',
    emptyStateTitle: 'Ще немає розірвань',
    emptyStateDesc: 'Створіть свій перший лист про розірвання за допомогою нашого генератора.',
    emptyStateButton: 'Створити розірвання',
    noSearchResultsTitle: 'Немає результатів',
    noSearchResultsDesc: 'Спробуйте інший пошуковий запит або фільтр.',
    changeStatusLabel: 'Змінити статус',
    noteLabel: 'Примітка',
    notePlaceholder: 'Додати примітку (наприклад, дату відправки, трек-номер...)',
    save: 'Зберегти',
    letterPreview: 'Лист про розірвання',
    copied: 'Скопійовано!',
    privacyNotice: 'Всі дані зберігаються локально у вашому браузері.',
  },
  cta: {
    title: 'Готові розірвати?',
    subtitle: 'Створіть юридично правильний лист менше ніж за 2 хвилини — повністю безкоштовно.',
    button: 'Створити розірвання зараз',
  },
  footer: {
    tagline: 'Розірвання договорів стало простим',
    about: 'Про нас',
    aboutText: 'KündigungsHeld робить розірвання договорів простим, швидким та юридично правильним.',
    legal: 'Юридична інформація',
    impressum: 'Імпресум',
    privacy: 'Конфіденційність',
    terms: 'Умови',
    resources: 'Ресурси',
    blog: 'Блог',
    faq: 'FAQ',
    support: 'Підтримка',
    visitorCount: 'Відвідувачів',
    visitors: 'Відвідувачі',
    rights: 'Всі права захищені',
  },
  nav: {
    features: 'Функції',
    howItWorks: 'Як працює',
    archive: 'Мій архів',
    blog: 'Блог',
    faq: 'FAQ',
  },
  common: {
    loading: 'Завантаження...',
    error: 'Сталася помилка',
    success: 'Успішно!',
    close: 'Закрити',
  },
}

const en: TranslationKeys = {
  hero: {
    title: 'Cancel Contracts Made Easy',
    subtitle: 'Create legally compliant termination letters in minutes. For all common contract types — simple, fast, and free.',
    cta: 'Cancel Now for Free',
    subtext: 'No registration required',
    badge: 'Over 300 providers available',
    howItWorksCTA: 'How it works',
    stats: {
      terminations: 'Terminations',
      companies: 'Providers',
      rating: 'Rating',
    },
    mockup: {
      secure: 'Legally Secure',
      id: 'ID',
      pdfReady: 'PDF Ready',
      instantDownload: 'Instant Download',
      validated: 'Validated',
      legal: '100% Legal',
    },
    features: {
      secure: 'Legally Secure',
      fast: 'In 2 Minutes',
      free: '100% Free',
    },
  },
  features: {
    sectionLabel: 'Features',
    title: 'Everything you need to cancel contracts',
    subtitle: 'KündigungsHeld simplifies the entire termination process with smart templates and an extensive company database.',
    feature1Title: '150+ Companies',
    feature1Desc: 'From Telekom to Netflix, from Allianz to Trade Republic — addresses and deadlines of all major providers.',
    feature2Title: 'Legally Compliant Templates',
    feature2Desc: 'Our templates are created by experts and cover all termination types.',
    feature3Title: 'Done in 2 Minutes',
    feature3Desc: 'Select provider, enter data, generate letter. Canceling has never been this easy.',
    feature4Title: 'GDPR Compliant',
    feature4Desc: 'Your data is not stored and not shared with third parties.',
    feature5Title: 'All Termination Types',
    feature5Desc: 'Ordinary termination, special termination, revocation, immediate termination, relocation or death.',
    feature6Title: 'PDF, Print & Email',
    feature6Desc: 'Download your letter as PDF, print it directly, or send it via email.',
    statCompanies: 'Companies',
    statTerminations: 'Terminations',
    statRating: 'Rating',
    statFree: 'Free',
  },
  howItWorks: {
    sectionLabel: 'How it works',
    title: 'Three simple steps to termination',
    subtitle: 'No lawyer, no expertise needed. Our generator guides you step by step.',
    step1Title: 'Select Provider',
    step1Desc: 'Find your provider in our database of over 150 German companies.',
    step2Title: 'Fill Form',
    step2Desc: 'Enter your personal data and contract information.',
    step3Title: 'Send Termination',
    step3Desc: 'Your termination letter is generated instantly. Copy or download, then mail it!',
  },
  testimonials: {
    sectionLabel: 'Customer Reviews',
    title: 'Over 10,000 satisfied users',
    subtitle: 'Learn what our users say about KündigungsHeld.',
    testimonial1Text: 'I had to cancel my gym contract and didn\'t know how. With KündigungsHeld the letter was ready in 2 minutes!',
    testimonial2Text: 'Finally a tool that really works. Already canceled three contracts without problems.',
    testimonial3Text: 'The special termination due to price increase was perfectly worded. Thanks!',
    testimonial4Text: 'Super easy to use. Canceled my DAZN membership and newspaper subscription in under 5 minutes.',
    testimonial5Text: 'The relocation template was perfect. The provider confirmed immediately.',
    testimonial6Text: 'Very well thought out templates. Great service!',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Frequently Asked Questions',
    q1: 'Is it really free?',
    a1: 'Yes, absolutely! KündigungsHeld is 100% free with no hidden costs.',
    q2: 'Are the termination letters legally valid?',
    a2: 'Our templates are created by legal experts and comply with German law.',
    q3: 'Is my data stored?',
    a3: 'Your data is processed exclusively in your browser and not transmitted to our servers.',
    q4: 'What do I do after creating the letter?',
    a4: 'Print and mail it to the specified address — best as registered mail.',
    q5: 'What\'s the difference between ordinary and extraordinary termination?',
    a5: 'Ordinary termination follows the notice period. Extraordinary is only possible for important reasons.',
    q6: 'Can I cancel contracts not in your list?',
    a6: 'Yes! Use our general templates and enter the provider address yourself.',
    q7: 'What is the archive and how does it work?',
    a7: 'Manage all your terminations and track status. All data is stored locally.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Legal Tips from Experts',
    subtitle: 'Current articles from German lawyers about termination and consumer protection.',
    readAll: 'Read all articles',
  },
  generator: {
    title: 'Create Termination',
    step: 'Step',
    stepOf: 'of',
    nextStep: 'Next',
    previousStep: 'Back',
    selectCompany: 'Select Company',
    customCompany: 'Custom Company',
    searchCompany: 'Search company...',
    category: 'Category',
    allCategories: 'All Categories',
    yourDetails: 'Your Details',
    salutation: 'Salutation',
    firstName: 'First Name',
    lastName: 'Last Name',
    street: 'Street and Number',
    postalCode: 'Postal Code',
    city: 'City',
    customerNumber: 'Customer Number',
    contractNumber: 'Contract Number',
    terminationType: 'Termination Type',
    terminationDate: 'Termination to',
    nextPossible: 'Next Possible Date',
    reason: 'Reason (optional)',
    additionalInfo: 'Additional Information',
    preview: 'Preview',
    generating: 'Creating termination...',
    copyToClipboard: 'Copy to Clipboard',
    copied: 'Copied!',
    downloadPDF: 'Download PDF',
    print: 'Print',
    sendEmail: 'Send Email',
    saveToArchive: 'Save to Archive',
    saved: 'Saved!',
  },
  archive: {
    title: 'My Archive',
    subtitle: 'Manage all your terminations in one place',
    searchPlaceholder: 'Search company, name or reason...',
    filterAll: 'All',
    filterCreated: 'Created',
    filterSent: 'Sent',
    filterConfirmed: 'Confirmed',
    statusCreated: 'Created',
    statusSent: 'Sent',
    statusConfirmed: 'Confirmed',
    total: 'Total',
    noResults: 'No terminations found',
    deleteConfirm: 'Are you sure you want to delete this termination?',
    delete: 'Delete',
    cancel: 'Cancel',
    downloadPDF: 'Download PDF',
    copyText: 'Copy Text',
    changeStatus: 'Change Status',
    exportCSV: 'Export Archive as CSV',
    backToHome: 'Back to Start',
    emptyStateTitle: 'No terminations yet',
    emptyStateDesc: 'Create your first termination letter with our generator.',
    emptyStateButton: 'Create Termination',
    noSearchResultsTitle: 'No results',
    noSearchResultsDesc: 'Try a different search term or filter.',
    changeStatusLabel: 'Change Status',
    noteLabel: 'Note',
    notePlaceholder: 'Add a note (e.g. shipping date, tracking number...)',
    save: 'Save',
    letterPreview: 'Termination Letter',
    copied: 'Copied!',
    privacyNotice: 'All data is stored locally in your browser.',
  },
  cta: {
    title: 'Ready to Cancel?',
    subtitle: 'Create your legally compliant termination letter in less than 2 minutes — completely free.',
    button: 'Create Termination Now',
  },
  footer: {
    tagline: 'Cancel contracts made easy',
    about: 'About',
    aboutText: 'KündigungsHeld makes contract terminations simple, fast, and legally compliant.',
    legal: 'Legal',
    impressum: 'Imprint',
    privacy: 'Privacy',
    terms: 'Terms',
    resources: 'Resources',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Visitors',
    visitors: 'Visitors',
    rights: 'All rights reserved',
  },
  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    archive: 'My Archive',
    blog: 'Blog',
    faq: 'FAQ',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    close: 'Close',
  },
}

const tr: TranslationKeys = {
  hero: {
    title: 'Sözleşme İptali Kolaylaştı',
    subtitle: 'Dakikalar içinde yasal olarak uygun fesih mektupları oluşturun. Tüm yaygın sözleşme türleri için — basit, hızlı ve ücretsiz.',
    cta: 'Şimdi Ücretsiz İptal Et',
    subtext: 'Kayıt gerektirmez',
    badge: '300\'den fazla sağlayıcı mevcut',
    howItWorksCTA: 'Nasıl çalışır',
    stats: {
      terminations: 'İptaller',
      companies: 'Sağlayıcılar',
      rating: 'Değerlendirme',
    },
    mockup: {
      secure: 'Yasal Güvenli',
      id: 'ID',
      pdfReady: 'PDF Hazır',
      instantDownload: 'Anında İndir',
      validated: 'Doğrulandı',
      legal: '%100 Yasal',
    },
    features: {
      secure: 'Yasal Güvenli',
      fast: '2 Dakikada',
      free: '%100 Ücretsiz',
    },
  },
  features: {
    sectionLabel: 'Özellikler',
    title: 'Sözleşme iptali için ihtiyacınız olan her şey',
    subtitle: 'KündigungsHeld, akıllı şablonlar ve kapsamlı şirket veritabanı ile tüm fesih sürecini basitleştirir.',
    feature1Title: '150+ Şirket',
    feature1Desc: 'Telekom\'dan Netflix\'e — tüm önemli sağlayıcıların adresleri ve son tarihleri.',
    feature2Title: 'Yasal Uyumlu Şablonlar',
    feature2Desc: 'Şablonlarımız uzmanlar tarafından oluşturulmuştur.',
    feature3Title: '2 Dakikada Hazır',
    feature3Desc: 'Sağlayıcı seçin, verileri girin, mektubu oluşturun.',
    feature4Title: 'GDPR Uyumlu',
    feature4Desc: 'Verileriniz saklanmaz ve üçüncü taraflarla paylaşılmaz.',
    feature5Title: 'Tüm Fesih Türleri',
    feature5Desc: 'Olağan fesih, özel fesih, geri alma, acil fesih, taşınma veya ölüm.',
    feature6Title: 'PDF, Yazdırma ve E-posta',
    feature6Desc: 'PDF olarak indirin, yazdırın veya e-posta ile gönderin.',
    statCompanies: 'Şirketler',
    statTerminations: 'İptaller',
    statRating: 'Değerlendirme',
    statFree: 'Ücretsiz',
  },
  howItWorks: {
    sectionLabel: 'Nasıl çalışır',
    title: 'Fesihe üç basit adım',
    subtitle: 'Avukata veya uzmanlığa gerek yok. Jeneratörümüz sizi adım adım yönlendirir.',
    step1Title: 'Sağlayıcı Seçin',
    step1Desc: '150\'den fazla Alman şirketinden oluşan veritabanımızda sağlayıcınızı bulun.',
    step2Title: 'Formu Doldurun',
    step2Desc: 'Kişisel verilerinizi ve sözleşme bilgilerinizi girin.',
    step3Title: 'Fesih Gönderin',
    step3Desc: 'Fesih mektubunuz anında oluşturulur. Kopyalayın veya indirin, sonra posta ile gönderin!',
  },
  testimonials: {
    sectionLabel: 'Müşteri Yorumları',
    title: '10.000\'den fazla memnun kullanıcı',
    subtitle: 'Kullanıcılarımızın KündigungsHeld hakkında ne söylediğini öğrenin.',
    testimonial1Text: 'Spor salonu sözleşmemi iptal etmem gerekiyordu. KündigungsHeld ile mektup 2 dakikada hazırdı!',
    testimonial2Text: 'Sonunda gerçekten işe yarayan bir araç. Üç sözleşmeyi sorunsuz iptal ettim.',
    testimonial3Text: 'Fiyat artışı nedeniyle özel fesih mükemmel ifade edilmişti. Teşekkürler!',
    testimonial4Text: 'Kullanımı çok kolay. DAZN üyeliğimi ve gazete aboneliğimi 5 dakikada iptal ettim.',
    testimonial5Text: 'Taşınma şablonu mükemmeldi. Sağlayıcı hemen onayladı.',
    testimonial6Text: 'Çok iyi düşünülmüş şablonlar. Harika hizmet!',
  },
  faq: {
    sectionLabel: 'SSS',
    title: 'Sık Sorulan Sorular',
    q1: 'Gerçekten ücretsiz mi?',
    a1: 'Evet, kesinlikle! KündigungsHeld %100 ücretsizdir.',
    q2: 'Fesih mektupları yasal olarak geçerli mi?',
    a2: 'Şablonlarımız hukuk uzmanları tarafından oluşturulmuştur.',
    q3: 'Verilerim saklanıyor mu?',
    a3: 'Verileriniz yalnızca tarayıcınızda işlenir ve sunuculara aktarılmaz.',
    q4: 'Mektubu oluşturduktan sonra ne yapmalıyım?',
    a4: 'Yazdırın ve belirtilen adrese taahhütlü mektup ile gönderin.',
    q5: 'Olağan ve olağanüstü fesih arasındaki fark nedir?',
    a5: 'Olağan fesih ihbar süresine uyar. Olağanüstü yalnızca önemli nedenlerle mümkündür.',
    q6: 'Listenizdeki olmayan sözleşmeleri iptal edebilir miyim?',
    a6: 'Evet! Genel şablonlarımızı kullanın ve sağlayıcı adresini kendiniz girin.',
    q7: 'Arşiv nedir ve nasıl çalışır?',
    a7: 'Tüm fesihleri yönetin ve durumu takip edin. Veriler yerel olarak saklanır.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Uzmanlardan Hukuki İpuçları',
    subtitle: 'Alman avukatlarından fesih ve tüketici koruma hakkında güncel makaleler.',
    readAll: 'Tüm makaleleri oku',
  },
  generator: {
    title: 'Fesih Oluştur',
    step: 'Adım',
    stepOf: '/',
    nextStep: 'İleri',
    previousStep: 'Geri',
    selectCompany: 'Şirket Seç',
    customCompany: 'Özel Şirket',
    searchCompany: 'Şirket ara...',
    category: 'Kategori',
    allCategories: 'Tüm Kategoriler',
    yourDetails: 'Bilgileriniz',
    salutation: 'Hitap',
    firstName: 'Ad',
    lastName: 'Soyad',
    street: 'Sokak ve Numara',
    postalCode: 'Posta Kodu',
    city: 'Şehir',
    customerNumber: 'Müşteri Numarası',
    contractNumber: 'Sözleşme Numarası',
    terminationType: 'Fesih Türü',
    terminationDate: 'Fesih tarihi',
    nextPossible: 'Bir Sonraki Mümkün Tarih',
    reason: 'Neden (isteğe bağlı)',
    additionalInfo: 'Ek Bilgi',
    preview: 'Önizleme',
    generating: 'Fesih oluşturuluyor...',
    copyToClipboard: 'Panoya Kopyala',
    copied: 'Kopyalandı!',
    downloadPDF: 'PDF İndir',
    print: 'Yazdır',
    sendEmail: 'E-posta Gönder',
    saveToArchive: 'Arşive Kaydet',
    saved: 'Kaydedildi!',
  },
  archive: {
    title: 'Arşivim',
    subtitle: 'Tüm fesihlerinizi tek yerde yönetin',
    searchPlaceholder: 'Şirket, isim veya neden ara...',
    filterAll: 'Tümü',
    filterCreated: 'Oluşturuldu',
    filterSent: 'Gönderildi',
    filterConfirmed: 'Onaylandı',
    statusCreated: 'Oluşturuldu',
    statusSent: 'Gönderildi',
    statusConfirmed: 'Onaylandı',
    total: 'Toplam',
    noResults: 'Fesih bulunamadı',
    deleteConfirm: 'Bu fesihi silmek istediğinizden emin misiniz?',
    delete: 'Sil',
    cancel: 'İptal',
    downloadPDF: 'PDF İndir',
    copyText: 'Metni Kopyala',
    changeStatus: 'Durumu Değiştir',
    exportCSV: 'Arşivi CSV Olarak Dışa Aktar',
    backToHome: 'Ana Sayfaya Dön',
    emptyStateTitle: 'Henüz fesih yok',
    emptyStateDesc: 'Jeneratörümüzle ilk fesih mektubunuzu oluşturun.',
    emptyStateButton: 'Fesih Oluştur',
    noSearchResultsTitle: 'Sonuç bulunamadı',
    noSearchResultsDesc: 'Farklı bir arama terimi veya filtre deneyin.',
    changeStatusLabel: 'Durumu Değiştir',
    noteLabel: 'Not',
    notePlaceholder: 'Not ekle (örn. gönderim tarihi, takip numarası...)',
    save: 'Kaydet',
    letterPreview: 'Fesih Mektubu',
    copied: 'Kopyalandı!',
    privacyNotice: 'Tüm veriler tarayıcınızda yerel olarak saklanır.',
  },
  cta: {
    title: 'İptal Etmeye Hazır mısınız?',
    subtitle: 'Yasal olarak uygun fesih mektubunuzu 2 dakikadan kısa sürede oluşturun — tamamen ücretsiz.',
    button: 'Şimdi Fesih Oluştur',
  },
  footer: {
    tagline: 'Sözleşme iptali kolaylaştı',
    about: 'Hakkında',
    aboutText: 'KündigungsHeld, sözleşme fesihlerini basit, hızlı ve yasal olarak uyumlu hale getirir.',
    legal: 'Yasal',
    impressum: 'Künye',
    privacy: 'Gizlilik',
    terms: 'Şartlar',
    resources: 'Kaynaklar',
    blog: 'Blog',
    faq: 'SSS',
    support: 'Destek',
    visitorCount: 'Ziyaretçiler',
    visitors: 'Ziyaretçi',
    rights: 'Tüm hakları saklıdır',
  },
  nav: {
    features: 'Özellikler',
    howItWorks: 'Nasıl çalışır',
    archive: 'Arşivim',
    blog: 'Blog',
    faq: 'SSS',
  },
  common: {
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    success: 'Başarılı!',
    close: 'Kapat',
  },
}

const zh: TranslationKeys = {
  hero: {
    title: '轻松取消合同',
    subtitle: '在几分钟内创建符合法律的终止信函。适用于所有常见合同类型——简单、快速且免费。',
    cta: '立即免费取消',
    subtext: '无需注册',
    badge: '超过300个提供商',
    howItWorksCTA: '工作原理',
    stats: {
      terminations: '终止',
      companies: '提供商',
      rating: '评分',
    },
    mockup: {
      secure: '法律安全',
      id: 'ID',
      pdfReady: 'PDF就绪',
      instantDownload: '即时下载',
      validated: '已验证',
      legal: '100%合法',
    },
    features: {
      secure: '法律安全',
      fast: '2分钟内',
      free: '100%免费',
    },
  },
  features: {
    sectionLabel: '功能',
    title: '取消合同所需的一切',
    subtitle: 'KündigungsHeld通过智能模板和广泛的公司数据库简化整个终止流程。',
    feature1Title: '150+公司',
    feature1Desc: '从电信到Netflix——所有主要提供商的地址和截止日期。',
    feature2Title: '符合法律的模板',
    feature2Desc: '我们的模板由专家创建，涵盖所有终止类型。',
    feature3Title: '2分钟完成',
    feature3Desc: '选择提供商，输入数据，生成信函。',
    feature4Title: '符合GDPR',
    feature4Desc: '您的数据不会被存储也不会与第三方共享。',
    feature5Title: '所有终止类型',
    feature5Desc: '普通终止、特殊终止、撤销、立即终止、搬迁或死亡。',
    feature6Title: 'PDF、打印和电子邮件',
    feature6Desc: '下载为PDF，打印或通过电子邮件发送。',
    statCompanies: '公司',
    statTerminations: '终止',
    statRating: '评分',
    statFree: '免费',
  },
  howItWorks: {
    sectionLabel: '工作原理',
    title: '三个简单步骤完成终止',
    subtitle: '无需律师，无需专业知识。我们的生成器会逐步指导您。',
    step1Title: '选择提供商',
    step1Desc: '在我们超过150家德国公司的数据库中找到您的提供商。',
    step2Title: '填写表格',
    step2Desc: '输入您的个人数据和合同信息。',
    step3Title: '发送终止',
    step3Desc: '您的终止信函会立即生成。复制或下载，然后邮寄！',
  },
  testimonials: {
    sectionLabel: '客户评价',
    title: '超过10,000名满意用户',
    subtitle: '了解我们的用户对KündigungsHeld的评价。',
    testimonial1Text: '我必须取消健身房合同。使用KündigungsHeld，信函在2分钟内就准备好了！',
    testimonial2Text: '终于有一个真正有效的工具。已经取消了三份合同，每次都没有问题。',
    testimonial3Text: '由于价格上涨的特殊终止措辞完美。谢谢！',
    testimonial4Text: '使用非常简单。5分钟内取消了DAZN会员和报纸订阅。',
    testimonial5Text: '搬迁模板非常完美。提供商立即确认了。',
    testimonial6Text: '模板非常周到。很棒的服务！',
  },
  faq: {
    sectionLabel: '常见问题',
    title: '常见问题解答',
    q1: '真的免费吗？',
    a1: '是的，绝对免费！KündigungsHeld是100%免费的。',
    q2: '终止信函在法律上有效吗？',
    a2: '我们的模板由法律专家创建，符合德国法律要求。',
    q3: '我的数据会被存储吗？',
    a3: '您的数据仅在您的浏览器中处理，不会传输到我们的服务器。',
    q4: '创建信函后我该怎么做？',
    a4: '打印并邮寄到指定地址——最好使用挂号信。',
    q5: '普通终止和特殊终止有什么区别？',
    a5: '普通终止遵循通知期。特殊终止仅在重要原因下才可能。',
    q6: '我可以取消不在您列表中的合同吗？',
    a6: '可以！使用我们的通用模板并自己输入提供商地址。',
    q7: '什么是存档，它是如何工作的？',
    a7: '管理所有终止并跟踪状态。所有数据都在本地存储。',
  },
  blog: {
    sectionLabel: '博客',
    title: '专家法律建议',
    subtitle: '德国律师关于终止和消费者保护的最新文章。',
    readAll: '阅读所有文章',
  },
  generator: {
    title: '创建终止',
    step: '步骤',
    stepOf: '/',
    nextStep: '下一步',
    previousStep: '返回',
    selectCompany: '选择公司',
    customCompany: '自定义公司',
    searchCompany: '搜索公司...',
    category: '类别',
    allCategories: '所有类别',
    yourDetails: '您的详细信息',
    salutation: '称呼',
    firstName: '名',
    lastName: '姓',
    street: '街道和门牌号',
    postalCode: '邮政编码',
    city: '城市',
    customerNumber: '客户编号',
    contractNumber: '合同编号',
    terminationType: '终止类型',
    terminationDate: '终止日期',
    nextPossible: '下一个可能的日期',
    reason: '原因（可选）',
    additionalInfo: '附加信息',
    preview: '预览',
    generating: '正在创建终止...',
    copyToClipboard: '复制到剪贴板',
    copied: '已复制！',
    downloadPDF: '下载PDF',
    print: '打印',
    sendEmail: '发送电子邮件',
    saveToArchive: '保存到存档',
    saved: '已保存！',
  },
  archive: {
    title: '我的存档',
    subtitle: '在一个地方管理您的所有终止',
    searchPlaceholder: '搜索公司，名称或原因...',
    filterAll: '全部',
    filterCreated: '已创建',
    filterSent: '已发送',
    filterConfirmed: '已确认',
    statusCreated: '已创建',
    statusSent: '已发送',
    statusConfirmed: '已确认',
    total: '总计',
    noResults: '未找到终止',
    deleteConfirm: '您确定要删除此终止吗？',
    delete: '删除',
    cancel: '取消',
    downloadPDF: '下载PDF',
    copyText: '复制文本',
    changeStatus: '更改状态',
    exportCSV: '导出档案为CSV',
    backToHome: '返回主页',
    emptyStateTitle: '暂无终止信函',
    emptyStateDesc: '使用我们的生成器创建您的第一封终止信函。',
    emptyStateButton: '创建终止',
    noSearchResultsTitle: '无结果',
    noSearchResultsDesc: '尝试其他搜索词或过滤器。',
    changeStatusLabel: '更改状态',
    noteLabel: '备注',
    notePlaceholder: '添加备注（例如发货日期、运单号...）',
    save: '保存',
    letterPreview: '终止信函',
    copied: '已复制！',
    privacyNotice: '所有数据都本地存储在您的浏览器中。',
  },
  cta: {
    title: '准备好取消了吗？',
    subtitle: '在不到2分钟内创建符合法律的终止信函——完全免费。',
    button: '立即创建终止',
  },
  footer: {
    tagline: '轻松取消合同',
    about: '关于',
    aboutText: 'KündigungsHeld使合同终止变得简单、快速且符合法律。',
    legal: '法律',
    impressum: '版本说明',
    privacy: '隐私',
    terms: '条款',
    resources: '资源',
    blog: '博客',
    faq: '常见问题',
    support: '支持',
    visitorCount: '访客',
    visitors: '访客数',
    rights: '版权所有',
  },
  nav: {
    features: '功能',
    howItWorks: '工作原理',
    archive: '我的存档',
    blog: '博客',
    faq: '常见问题',
  },
  common: {
    loading: '加载中...',
    error: '发生错误',
    success: '成功！',
    close: '关闭',
  },
}

export const translations: Record<Language, TranslationKeys> = {
  de,
  uk,
  en,
  tr,
  zh,
}

export function getTranslations(lang: Language): TranslationKeys {
  return translations[lang] || translations.de
}