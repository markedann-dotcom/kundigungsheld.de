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
    title: 'Verträge kündigen — einfach, schnell, kostenlos',
    subtitle: 'Erstellen Sie rechtssichere Kündigungsschreiben in wenigen Minuten. Kein Anwalt, keine Registrierung, keine Kosten — für alle gängigen Vertragsarten.',
    cta: 'Jetzt kostenlos kündigen',
    subtext: 'Keine Registrierung · Keine versteckten Kosten',
    badge: 'Über 300 Anbieter verfügbar',
    howItWorksCTA: "So funktioniert's",
    stats: {
      terminations: 'Kündigungen erstellt',
      companies: 'Anbieter verfügbar',
      rating: 'Kundenbewertung',
    },
    mockup: {
      secure: 'Rechtssicher',
      id: 'ID',
      pdfReady: 'PDF bereit',
      instantDownload: 'Sofort-Download',
      validated: 'Geprüft',
      legal: '100 % Legal',
    },
    features: {
      secure: 'Rechtssicher',
      fast: 'In 2 Minuten',
      free: '100 % kostenlos',
    },
  },
  features: {
    sectionLabel: 'Funktionen',
    title: 'Alles, was Sie für eine erfolgreiche Kündigung brauchen',
    subtitle: 'KündigungsHeld übernimmt die Arbeit für Sie — von der richtigen Vorlage bis zur korrekten Adresse. Sie müssen nur noch absenden.',
    feature1Title: '300+ Anbieter',
    feature1Desc: 'Von Telekom bis Netflix, von Allianz bis Trade Republic — korrekte Adressen und aktuelle Kündigungsfristen aller wichtigen deutschen Anbieter.',
    feature2Title: 'Rechtssichere Vorlagen',
    feature2Desc: 'Alle Vorlagen wurden von erfahrenen Juristen geprüft und decken jede Kündigungsart ab: ordentlich, außerordentlich, Sonderkündigung, Widerruf.',
    feature3Title: 'Fertig in 2 Minuten',
    feature3Desc: 'Anbieter auswählen, persönliche Daten eingeben, Schreiben generieren — und fertig. Schneller war Kündigen noch nie.',
    feature4Title: '100 % DSGVO-konform',
    feature4Desc: 'Ihre Daten verlassen niemals Ihren Browser. Keine Server-Übertragung, keine Speicherung, keine Weitergabe. Volle Datenkontrolle bei Ihnen.',
    feature5Title: 'Alle Kündigungsarten',
    feature5Desc: 'Ordentliche Kündigung, Sonderkündigung bei Preiserhöhung, Widerruf, fristlose Kündigung sowie Sonderfälle wie Umzug oder Todesfall.',
    feature6Title: 'PDF, Druck & E-Mail',
    feature6Desc: 'Schreiben als PDF herunterladen, direkt ausdrucken oder als E-Mail-Entwurf öffnen — Sie wählen, wie Sie es versenden.',
    statCompanies: 'Anbieter',
    statTerminations: 'Kündigungen',
    statRating: 'Bewertung',
    statFree: 'Kostenlos',
  },
  howItWorks: {
    sectionLabel: "So geht's",
    title: 'In drei Schritten zur fertigen Kündigung',
    subtitle: 'Kein Fachwissen nötig. Unser Generator führt Sie sicher durch jeden Schritt — vom Anbieter bis zum fertigen Schreiben.',
    step1Title: 'Anbieter auswählen',
    step1Desc: 'Suchen Sie Ihren Anbieter in unserer Datenbank mit über 300 deutschen Unternehmen. Adresse und Kündigungsfristen werden automatisch übernommen.',
    step2Title: 'Daten eingeben',
    step2Desc: 'Geben Sie Ihre persönlichen Daten und Vertragsinformationen ein. Wählen Sie die passende Kündigungsart — unser System erklärt jeden Schritt.',
    step3Title: 'Schreiben versenden',
    step3Desc: 'Ihr Kündigungsschreiben wird sofort generiert. Als PDF herunterladen, ausdrucken oder per E-Mail senden — am besten als Einschreiben mit Rückschein.',
  },
  testimonials: {
    sectionLabel: 'Kundenstimmen',
    title: 'Über 10.000 erfolgreiche Kündigungen',
    subtitle: 'Echte Nutzer, echte Ergebnisse — das sagen unsere Kunden über KündigungsHeld.',
    testimonial1Text: 'Ich wollte meinen Fitnessstudio-Vertrag kündigen, hatte aber keine Ahnung wie. Mit KündigungsHeld war das Schreiben in unter 2 Minuten fertig — und der Anbieter hat es problemlos akzeptiert!',
    testimonial2Text: 'Endlich ein Tool, das hält, was es verspricht. Habe damit Telekom, Vodafone und Sky gekündigt — jedes Mal reibungslos und ohne Stress.',
    testimonial3Text: 'Die Sonderkündigung wegen der Preiserhöhung war juristisch einwandfrei formuliert. Mein Versicherungsanbieter hat sofort reagiert und die Kündigung bestätigt.',
    testimonial4Text: 'Ich hätte nie gedacht, dass das so einfach ist. DAZN-Mitgliedschaft und Zeitungsabo gleichzeitig gekündigt — alles in unter 5 Minuten erledigt.',
    testimonial5Text: 'Nach meinem Umzug musste ich den DSL-Vertrag kündigen. Die Umzugs-Vorlage war exakt richtig und der Anbieter hat die Kündigung umgehend bestätigt.',
    testimonial6Text: 'Die Vorlagen sind wirklich durchdacht — sogar die Widerspruchsklausel gegen Werbung ist enthalten. Das zeigt, wie professionell das gemacht ist.',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Häufig gestellte Fragen',
    q1: 'Ist die Nutzung wirklich kostenlos?',
    a1: 'Ja, absolut und ohne Einschränkungen. KündigungsHeld ist zu 100 % kostenlos — keine versteckten Gebühren, kein Abo, keine Premium-Version. Sie können beliebig viele Kündigungen erstellen, ohne auch nur einen Cent zu zahlen.',
    q2: 'Sind die Kündigungsschreiben rechtlich gültig?',
    a2: 'Ja. Alle Vorlagen wurden von erfahrenen deutschen Juristen erstellt und entsprechen den aktuellen gesetzlichen Anforderungen. Sie enthalten alle notwendigen Pflichtangaben und sind für Gerichte sowie Unternehmen vollständig anerkannt.',
    q3: 'Werden meine Daten gespeichert oder weitergegeben?',
    a3: 'Nein, niemals. Alle Daten werden ausschließlich in Ihrem Browser verarbeitet und verlassen Ihr Gerät nicht. Wir haben keinen Zugriff auf Ihre persönlichen Informationen, Vertragsdaten oder Kündigungsschreiben.',
    q4: 'Was mache ich nach dem Erstellen des Schreibens?',
    a4: 'Laden Sie das Schreiben als PDF herunter und senden Sie es per Post an den Anbieter — am besten als Einschreiben mit Rückschein, damit Sie einen Nachweis über den Erhalt haben. Heben Sie den Einlieferungsbeleg gut auf.',
    q5: 'Was ist der Unterschied zwischen ordentlicher und außerordentlicher Kündigung?',
    a5: 'Bei einer ordentlichen Kündigung halten Sie die vereinbarte Kündigungsfrist ein — zum Beispiel 3 Monate zum Vertragsende. Eine außerordentliche (fristlose) Kündigung ist nur bei einem wichtigen Grund möglich, etwa einer erheblichen Preiserhöhung oder einem schwerwiegenden Vertragsbruch des Anbieters.',
    q6: 'Kann ich auch Verträge kündigen, die nicht in Ihrer Liste sind?',
    a6: 'Ja, selbstverständlich. Wählen Sie einfach die Option „Eigener Anbieter" und geben Sie Name und Adresse des Unternehmens manuell ein. Unsere allgemeinen Vorlagen funktionieren für jeden beliebigen Vertragspartner.',
    q7: 'Was ist das Archiv und wie funktioniert es?',
    a7: 'Im Archiv werden alle Ihre erstellten Kündigungen übersichtlich gespeichert. Sie können den Status jeder Kündigung verfolgen (erstellt, versendet, bestätigt), Notizen hinzufügen und alte Schreiben jederzeit erneut herunterladen. Alle Daten werden ausschließlich lokal in Ihrem Browser gespeichert.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Rechtstipps von Experten',
    subtitle: 'Aktuelle Artikel von deutschen Rechtsanwälten rund um Kündigung, Verbraucherrechte und Vertragsrecht.',
    readAll: 'Alle Artikel lesen',
  },
  generator: {
    title: 'Kündigung erstellen',
    step: 'Schritt',
    stepOf: 'von',
    nextStep: 'Weiter',
    previousStep: 'Zurück',
    selectCompany: 'Anbieter auswählen',
    customCompany: 'Eigener Anbieter',
    searchCompany: 'Anbieter suchen...',
    category: 'Kategorie',
    allCategories: 'Alle Kategorien',
    yourDetails: 'Ihre persönlichen Daten',
    salutation: 'Anrede',
    firstName: 'Vorname',
    lastName: 'Nachname',
    street: 'Straße und Hausnummer',
    postalCode: 'Postleitzahl',
    city: 'Ort',
    customerNumber: 'Kundennummer (optional)',
    contractNumber: 'Vertragsnummer (optional)',
    terminationType: 'Kündigungsart',
    terminationDate: 'Kündigung zum',
    nextPossible: 'Nächstmöglicher Termin',
    reason: 'Begründung (optional)',
    additionalInfo: 'Zusatzinformationen',
    preview: 'Vorschau',
    generating: 'Kündigung wird erstellt...',
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
    subtitle: 'Alle Ihre Kündigungen auf einen Blick',
    searchPlaceholder: 'Suche nach Anbieter, Name oder Kündigungsgrund...',
    filterAll: 'Alle',
    filterCreated: 'Erstellt',
    filterSent: 'Versendet',
    filterConfirmed: 'Bestätigt',
    statusCreated: 'Erstellt',
    statusSent: 'Versendet',
    statusConfirmed: 'Bestätigt',
    total: 'Gesamt',
    noResults: 'Keine Kündigungen gefunden',
    deleteConfirm: 'Möchten Sie diese Kündigung wirklich unwiderruflich löschen?',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    downloadPDF: 'PDF herunterladen',
    copyText: 'Text kopieren',
    changeStatus: 'Status aktualisieren',
    exportCSV: 'Archiv als CSV exportieren',
    backToHome: 'Zur Startseite',
    emptyStateTitle: 'Noch keine Kündigungen vorhanden',
    emptyStateDesc: 'Erstellen Sie jetzt Ihre erste Kündigung — in nur wenigen Minuten fertig.',
    emptyStateButton: 'Erste Kündigung erstellen',
    noSearchResultsTitle: 'Keine Treffer',
    noSearchResultsDesc: 'Versuchen Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück.',
    changeStatusLabel: 'Status ändern',
    noteLabel: 'Notiz',
    notePlaceholder: 'z. B. Versanddatum, Sendungsnummer, Reaktion des Anbieters...',
    save: 'Speichern',
    letterPreview: 'Kündigungsschreiben',
    copied: 'Kopiert!',
    privacyNotice: 'Alle Daten werden ausschließlich lokal in Ihrem Browser gespeichert.',
  },
  cta: {
    title: 'Bereit, endlich zu kündigen?',
    subtitle: 'Erstellen Sie Ihr rechtssicheres Kündigungsschreiben in weniger als 2 Minuten — völlig kostenlos und ohne Registrierung.',
    button: 'Jetzt Kündigung erstellen',
  },
  footer: {
    tagline: 'Verträge kündigen — einfach gemacht.',
    about: 'Über uns',
    aboutText: 'KündigungsHeld macht Vertragskündigungen einfach, schnell und rechtssicher — für jeden.',
    legal: 'Rechtliches',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    resources: 'Ressourcen',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Aktive Nutzer',
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
    loading: 'Wird geladen...',
    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    success: 'Erfolgreich!',
    close: 'Schließen',
  },
}

const uk: TranslationKeys = {
  hero: {
    title: 'Розірвіть договір за 2 хвилини — безкоштовно',
    subtitle: 'Створюйте юридично правильні листи про розірвання без юриста та реєстрації. Для всіх типів договорів у Німеччині — просто, швидко та надійно.',
    cta: 'Розірвати договір зараз',
    subtext: 'Без реєстрації · Без прихованих витрат',
    badge: 'Понад 300 провайдерів у базі',
    howItWorksCTA: 'Як це працює',
    stats: {
      terminations: 'Листів створено',
      companies: 'Провайдерів у базі',
      rating: 'Оцінка користувачів',
    },
    mockup: {
      secure: 'Юридично правильно',
      id: 'ID',
      pdfReady: 'PDF готовий',
      instantDownload: 'Миттєве завантаження',
      validated: 'Перевірено юристом',
      legal: '100 % Законно',
    },
    features: {
      secure: 'Юридично правильно',
      fast: 'За 2 хвилини',
      free: '100 % безкоштовно',
    },
  },
  features: {
    sectionLabel: 'Можливості',
    title: 'Все необхідне для успішного розірвання договору',
    subtitle: 'KündigungsHeld виконує всю роботу за вас — правильний шаблон, точна адреса, дотримання строків. Вам залишається лише надіслати.',
    feature1Title: '300+ компаній',
    feature1Desc: 'Від Telekom до Netflix, від Allianz до Trade Republic — актуальні адреси та строки розірвання всіх провідних провайдерів Німеччини.',
    feature2Title: 'Юридично перевірені шаблони',
    feature2Desc: 'Всі шаблони розроблені досвідченими юристами та охоплюють усі типи розірвання: звичайне, позачергове, відкликання, за особливих обставин.',
    feature3Title: 'Готово за 2 хвилини',
    feature3Desc: 'Оберіть провайдера, введіть дані, отримайте готовий лист. Швидше та простіше, ніж будь-коли.',
    feature4Title: '100 % відповідність GDPR',
    feature4Desc: 'Ваші дані не залишають браузер. Жодної передачі на сервери, жодного зберігання, жодної передачі третім особам.',
    feature5Title: 'Всі типи розірвання',
    feature5Desc: 'Звичайне розірвання, позачергове при підвищенні ціни, відкликання, термінове розірвання, а також особливі випадки: переїзд або смерть.',
    feature6Title: 'PDF, друк та e-mail',
    feature6Desc: 'Завантажте лист як PDF, роздрукуйте або відкрийте як чернетку e-mail — ви вирішуєте, як його надіслати.',
    statCompanies: 'Провайдерів',
    statTerminations: 'Розірвань',
    statRating: 'Оцінка',
    statFree: 'Безкоштовно',
  },
  howItWorks: {
    sectionLabel: 'Як це працює',
    title: 'Три прості кроки до готового листа',
    subtitle: 'Жодних юридичних знань не потрібно. Наш генератор веде вас крок за кроком — від вибору провайдера до готового листа.',
    step1Title: 'Оберіть провайдера',
    step1Desc: 'Знайдіть свого провайдера у базі понад 300 німецьких компаній. Адреса та строки розірвання підставляються автоматично.',
    step2Title: 'Введіть свої дані',
    step2Desc: 'Заповніть персональні дані та інформацію про договір. Оберіть тип розірвання — система підкаже що і як.',
    step3Title: 'Надішліть лист',
    step3Desc: 'Ваш лист готовий миттєво. Завантажте як PDF, роздрукуйте або надішліть e-mail. Рекомендуємо відправити рекомендованим листом з повідомленням.',
  },
  testimonials: {
    sectionLabel: 'Відгуки користувачів',
    title: 'Понад 10 000 успішних розірвань',
    subtitle: 'Реальні люди, реальні результати — ось що кажуть користувачі KündigungsHeld.',
    testimonial1Text: 'Хотів розірвати договір із фітнес-клубом, але не знав як. З KündigungsHeld лист був готовий менш ніж за 2 хвилини — і провайдер одразу його прийняв!',
    testimonial2Text: 'Нарешті інструмент, який дійсно працює. Вже розірвав договори з Telekom, Vodafone та Sky — кожного разу без проблем і стресу.',
    testimonial3Text: 'Позачергове розірвання через підвищення ціни було сформульовано юридично бездоганно. Страхова компанія відповіла протягом доби та підтвердила розірвання.',
    testimonial4Text: 'Не думав, що це буде так просто. Членство у DAZN та газетну підписку розірвав одночасно — все зайняло менше 5 хвилин.',
    testimonial5Text: 'Після переїзду потрібно було розірвати DSL-договір. Шаблон для переїзду був саме те, що треба — провайдер підтвердив без зайвих питань.',
    testimonial6Text: 'Шаблони справді продумані до дрібниць — навіть застереження проти реклами включено. Видно, що над цим працювали справжні фахівці.',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Часті запитання',
    q1: 'Це дійсно безкоштовно?',
    a1: 'Так, повністю та без обмежень. KündigungsHeld — це 100 % безкоштовний сервіс. Жодних прихованих платежів, жодної підписки, жодної преміум-версії. Ви можете створювати скільки завгодно листів про розірвання абсолютно безкоштовно.',
    q2: 'Чи мають листи юридичну силу?',
    a2: 'Так. Усі шаблони розроблені досвідченими німецькими юристами та відповідають чинному законодавству. Вони містять усі обов\'язкові реквізити та повністю визнаються компаніями та судами.',
    q3: 'Чи зберігаються та передаються мої дані?',
    a3: 'Ні, жодним чином. Усі дані обробляються виключно у вашому браузері та не передаються на жодні сервери. Ми не маємо доступу до ваших особистих даних, інформації про договори чи самих листів.',
    q4: 'Що робити після створення листа?',
    a4: 'Завантажте лист у форматі PDF та надішліть його провайдеру поштою — обов\'язково рекомендованим листом із повідомленням про вручення. Зберігайте квитанцію про відправлення як доказ.',
    q5: 'У чому різниця між звичайним та позачерговим розірванням?',
    a5: 'Звичайне розірвання відбувається з дотриманням узгодженого строку попередження — наприклад, 3 місяці до закінчення терміну. Позачергове (термінове) розірвання можливе лише за наявності вагомої причини — наприклад, суттєвого підвищення ціни або серйозного порушення договору з боку провайдера.',
    q6: 'Чи можна розірвати договір з компанією, якої немає у вашій базі?',
    a6: 'Так, звісно. Оберіть опцію «Власний провайдер» та вкажіть назву й адресу компанії вручну. Наші універсальні шаблони підходять для будь-якого провайдера.',
    q7: 'Що таке архів і як він працює?',
    a7: 'У архіві зберігаються всі ваші листи про розірвання. Ви можете відстежувати статус кожного (створено, надіслано, підтверджено), додавати нотатки та в будь-який момент повторно завантажити старі листи. Всі дані зберігаються виключно локально у вашому браузері.',
  },
  blog: {
    sectionLabel: 'Блог',
    title: 'Юридичні поради від експертів',
    subtitle: 'Актуальні статті від німецьких правників про розірвання договорів та захист прав споживачів.',
    readAll: 'Читати всі статті',
  },
  generator: {
    title: 'Створити лист про розірвання',
    step: 'Крок',
    stepOf: 'з',
    nextStep: 'Далі',
    previousStep: 'Назад',
    selectCompany: 'Оберіть провайдера',
    customCompany: 'Власний провайдер',
    searchCompany: 'Пошук провайдера...',
    category: 'Категорія',
    allCategories: 'Всі категорії',
    yourDetails: 'Ваші особисті дані',
    salutation: 'Звертання',
    firstName: "Ім'я",
    lastName: 'Прізвище',
    street: 'Вулиця та номер будинку',
    postalCode: 'Поштовий індекс',
    city: 'Місто',
    customerNumber: 'Номер клієнта (необов\'язково)',
    contractNumber: 'Номер договору (необов\'язково)',
    terminationType: 'Тип розірвання',
    terminationDate: 'Дата розірвання',
    nextPossible: 'Найближча можлива дата',
    reason: 'Причина (необов\'язково)',
    additionalInfo: 'Додаткова інформація',
    preview: 'Попередній перегляд',
    generating: 'Створюємо лист...',
    copyToClipboard: 'Скопіювати текст',
    copied: 'Скопійовано!',
    downloadPDF: 'Завантажити PDF',
    print: 'Роздрукувати',
    sendEmail: 'Надіслати e-mail',
    saveToArchive: 'Зберегти в архів',
    saved: 'Збережено!',
  },
  archive: {
    title: 'Мій архів',
    subtitle: 'Усі ваші листи про розірвання в одному місці',
    searchPlaceholder: 'Пошук за провайдером, ім\'ям або причиною...',
    filterAll: 'Всі',
    filterCreated: 'Створено',
    filterSent: 'Надіслано',
    filterConfirmed: 'Підтверджено',
    statusCreated: 'Створено',
    statusSent: 'Надіслано',
    statusConfirmed: 'Підтверджено',
    total: 'Всього',
    noResults: 'Листів не знайдено',
    deleteConfirm: 'Ви впевнені, що хочете назавжди видалити цей лист?',
    delete: 'Видалити',
    cancel: 'Скасувати',
    downloadPDF: 'Завантажити PDF',
    copyText: 'Скопіювати текст',
    changeStatus: 'Оновити статус',
    exportCSV: 'Експортувати архів у CSV',
    backToHome: 'На головну',
    emptyStateTitle: 'Архів порожній',
    emptyStateDesc: 'Створіть свій перший лист про розірвання — це займе лише кілька хвилин.',
    emptyStateButton: 'Створити перший лист',
    noSearchResultsTitle: 'Нічого не знайдено',
    noSearchResultsDesc: 'Спробуйте інший пошуковий запит або скиньте фільтри.',
    changeStatusLabel: 'Змінити статус',
    noteLabel: 'Нотатка',
    notePlaceholder: 'Наприклад: дата відправлення, номер відстеження, відповідь провайдера...',
    save: 'Зберегти',
    letterPreview: 'Лист про розірвання',
    copied: 'Скопійовано!',
    privacyNotice: 'Всі дані зберігаються виключно локально у вашому браузері.',
  },
  cta: {
    title: 'Готові нарешті розірвати договір?',
    subtitle: 'Створіть юридично правильний лист менш ніж за 2 хвилини — повністю безкоштовно та без реєстрації.',
    button: 'Створити лист зараз',
  },
  footer: {
    tagline: 'Розірвання договорів — просто та надійно.',
    about: 'Про нас',
    aboutText: 'KündigungsHeld робить розірвання договорів доступним для кожного — швидко, просто та юридично правильно.',
    legal: 'Правова інформація',
    impressum: 'Імпресум',
    privacy: 'Конфіденційність',
    terms: 'Умови використання',
    resources: 'Ресурси',
    blog: 'Блог',
    faq: 'FAQ',
    support: 'Підтримка',
    visitorCount: 'Активних користувачів',
    visitors: 'Відвідувачів',
    rights: 'Всі права захищені',
  },
  nav: {
    features: 'Можливості',
    howItWorks: 'Як це працює',
    generator: 'Генератор',
    fristenrechner: 'Калькулятор строків',
    archive: 'Мій архів',
    blog: 'Блог',
    faq: 'FAQ',
  },
  common: {
    loading: 'Завантаження...',
    error: 'Сталася помилка. Будь ласка, спробуйте ще раз.',
    success: 'Успішно!',
    close: 'Закрити',
  },
}

const en: TranslationKeys = {
  hero: {
    title: 'Cancel Any Contract in 2 Minutes — Free',
    subtitle: 'Generate legally compliant termination letters instantly. No lawyer, no registration, no hidden costs — for all common German contract types.',
    cta: 'Cancel My Contract Now',
    subtext: 'No registration · No hidden fees',
    badge: 'Over 300 providers in our database',
    howItWorksCTA: 'See how it works',
    stats: {
      terminations: 'Letters created',
      companies: 'Providers available',
      rating: 'User rating',
    },
    mockup: {
      secure: 'Legally Secure',
      id: 'ID',
      pdfReady: 'PDF Ready',
      instantDownload: 'Instant Download',
      validated: 'Expert Verified',
      legal: '100% Legal',
    },
    features: {
      secure: 'Legally Secure',
      fast: 'Done in 2 min',
      free: '100% Free',
    },
  },
  features: {
    sectionLabel: 'Features',
    title: 'Everything you need to cancel contracts successfully',
    subtitle: 'KündigungsHeld does the heavy lifting — correct template, right address, proper deadlines. You just send it.',
    feature1Title: '300+ Providers',
    feature1Desc: 'From Telekom to Netflix, from Allianz to Trade Republic — accurate addresses and up-to-date cancellation deadlines for all major German providers.',
    feature2Title: 'Legally Verified Templates',
    feature2Desc: 'All templates are crafted by experienced German lawyers and cover every termination type: standard, extraordinary, special, and revocation.',
    feature3Title: 'Done in 2 Minutes',
    feature3Desc: 'Select provider, enter your details, get your letter. Canceling a contract has never been this fast or easy.',
    feature4Title: '100% GDPR Compliant',
    feature4Desc: 'Your data never leaves your browser. No server uploads, no storage, no third-party sharing. Full data control stays with you.',
    feature5Title: 'All Termination Types',
    feature5Desc: 'Standard termination, special termination due to price increases, revocation, immediate termination, as well as special cases like relocation or bereavement.',
    feature6Title: 'PDF, Print & Email',
    feature6Desc: 'Download as PDF, print directly, or open as an email draft — you choose how to send it.',
    statCompanies: 'Providers',
    statTerminations: 'Terminations',
    statRating: 'Rating',
    statFree: 'Free',
  },
  howItWorks: {
    sectionLabel: 'How it works',
    title: 'Three steps to your finished termination letter',
    subtitle: 'No legal knowledge required. Our generator guides you through every step — from selecting your provider to downloading your letter.',
    step1Title: 'Select Your Provider',
    step1Desc: 'Find your provider in our database of 300+ German companies. Address and cancellation deadlines are filled in automatically.',
    step2Title: 'Enter Your Details',
    step2Desc: 'Fill in your personal information and contract details. Choose the right termination type — our system explains everything along the way.',
    step3Title: 'Send Your Letter',
    step3Desc: 'Your termination letter is ready instantly. Download as PDF, print it, or send via email. We recommend sending by registered mail with return receipt.',
  },
  testimonials: {
    sectionLabel: 'User Reviews',
    title: 'Over 10,000 successful terminations',
    subtitle: 'Real users, real results — here\'s what people say about KündigungsHeld.',
    testimonial1Text: 'I needed to cancel my gym membership but had no idea how to write the letter. KündigungsHeld had it ready in under 2 minutes — and they accepted it without any issues!',
    testimonial2Text: 'Finally a tool that actually delivers. I\'ve used it to cancel Telekom, Vodafone, and Sky contracts — every single time, completely hassle-free.',
    testimonial3Text: 'The special termination letter for the price increase was legally spot-on. My insurance provider responded within a day and confirmed the cancellation.',
    testimonial4Text: 'I couldn\'t believe how easy this was. Canceled my DAZN subscription and newspaper at the same time — done in under 5 minutes.',
    testimonial5Text: 'When I moved, I needed to terminate my DSL contract on short notice. The relocation template was perfect and the provider confirmed it immediately.',
    testimonial6Text: 'The templates are incredibly well thought-out — they even include an objection clause against advertising. Truly professional work.',
  },
  faq: {
    sectionLabel: 'FAQ',
    title: 'Frequently Asked Questions',
    q1: 'Is it really completely free?',
    a1: 'Yes, completely and without any limitations. KündigungsHeld is 100% free — no hidden fees, no subscription, no premium tier. You can create as many termination letters as you need without spending a cent.',
    q2: 'Are the termination letters legally valid?',
    a2: 'Yes. All templates have been written and reviewed by experienced German lawyers and comply with current legal requirements. They include all mandatory elements and are fully recognized by companies and courts.',
    q3: 'Is my data stored or shared?',
    a3: 'Never. All data is processed exclusively in your browser and never leaves your device. We have no access to your personal information, contract details, or the letters you create.',
    q4: 'What should I do after creating my letter?',
    a4: 'Download it as a PDF and send it to the provider by post — ideally as registered mail with return receipt so you have proof of delivery. Keep the postage receipt in a safe place.',
    q5: 'What\'s the difference between standard and extraordinary termination?',
    a5: 'A standard termination respects the agreed notice period — for example, 3 months before the contract end date. An extraordinary (immediate) termination is only valid when there is an important reason, such as a significant price increase or a serious breach of contract by the provider.',
    q6: 'Can I cancel a contract with a provider not in your list?',
    a6: 'Absolutely. Just select "Custom Provider" and manually enter the company name and address. Our general templates work for any provider or contract type.',
    q7: 'What is the archive and how does it work?',
    a7: 'The archive stores all your termination letters in one place. You can track the status of each letter (created, sent, confirmed), add notes, and re-download any letter at any time. All data is stored exclusively in your browser — never on our servers.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Legal Tips from the Experts',
    subtitle: 'Up-to-date articles from German lawyers on contract termination, consumer rights, and more.',
    readAll: 'Read all articles',
    backToHome: 'Back to Home',
    searchPlaceholder: 'Search articles — e.g. cancellation, deadline, moving …',
    allCategories: 'All',
    articlesCount: 'articles',
    articlesFiltered: 'of',
    clearFilters: 'Clear filters',
    noResultsTitle: 'No articles found',
    noResultsDesc: 'Try a different search term.',
    showAll: 'Show all articles',
  },
  generator: {
    title: 'Create Termination Letter',
    step: 'Step',
    stepOf: 'of',
    nextStep: 'Continue',
    previousStep: 'Back',
    selectCompany: 'Select Provider',
    customCompany: 'Custom Provider',
    searchCompany: 'Search providers...',
    category: 'Category',
    allCategories: 'All Categories',
    yourDetails: 'Your Personal Details',
    salutation: 'Salutation',
    firstName: 'First Name',
    lastName: 'Last Name',
    street: 'Street and House Number',
    postalCode: 'Postal Code',
    city: 'City',
    customerNumber: 'Customer Number (optional)',
    contractNumber: 'Contract Number (optional)',
    terminationType: 'Termination Type',
    terminationDate: 'Terminate by',
    nextPossible: 'Earliest Possible Date',
    reason: 'Reason (optional)',
    additionalInfo: 'Additional Information',
    preview: 'Preview',
    generating: 'Generating your letter...',
    copyToClipboard: 'Copy to Clipboard',
    copied: 'Copied!',
    downloadPDF: 'Download PDF',
    print: 'Print',
    sendEmail: 'Send via Email',
    saveToArchive: 'Save to Archive',
    saved: 'Saved!',
  },
  archive: {
    title: 'My Archive',
    subtitle: 'All your termination letters in one place',
    searchPlaceholder: 'Search by provider, name, or reason...',
    filterAll: 'All',
    filterCreated: 'Created',
    filterSent: 'Sent',
    filterConfirmed: 'Confirmed',
    statusCreated: 'Created',
    statusSent: 'Sent',
    statusConfirmed: 'Confirmed',
    total: 'Total',
    noResults: 'No terminations found',
    deleteConfirm: 'Are you sure you want to permanently delete this termination letter?',
    delete: 'Delete',
    cancel: 'Cancel',
    downloadPDF: 'Download PDF',
    copyText: 'Copy Text',
    changeStatus: 'Update Status',
    exportCSV: 'Export Archive as CSV',
    backToHome: 'Back to Home',
    emptyStateTitle: 'No terminations yet',
    emptyStateDesc: 'Create your first termination letter now — it only takes a few minutes.',
    emptyStateButton: 'Create First Letter',
    noSearchResultsTitle: 'No results found',
    noSearchResultsDesc: 'Try a different search term or clear your filters.',
    changeStatusLabel: 'Change Status',
    noteLabel: 'Note',
    notePlaceholder: 'e.g. date sent, tracking number, provider response...',
    save: 'Save',
    letterPreview: 'Termination Letter',
    copied: 'Copied!',
    privacyNotice: 'All data is stored exclusively in your browser — never on our servers.',
  },
  cta: {
    title: 'Ready to finally cancel?',
    subtitle: 'Create your legally compliant termination letter in under 2 minutes — completely free, no registration needed.',
    button: 'Create My Letter Now',
  },
  footer: {
    tagline: 'Contract cancellation made simple.',
    about: 'About',
    aboutText: 'KündigungsHeld makes contract terminations simple, fast, and legally secure — for everyone.',
    legal: 'Legal',
    impressum: 'Imprint',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    resources: 'Resources',
    blog: 'Blog',
    faq: 'FAQ',
    support: 'Support',
    visitorCount: 'Active Users',
    visitors: 'Visitors',
    rights: 'All rights reserved',
  },
  nav: {
    features: 'Features',
    howItWorks: 'How It Works',
    generator: 'Generator',
    fristenrechner: 'Deadline Calculator',
    archive: 'My Archive',
    blog: 'Blog',
    faq: 'FAQ',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    success: 'Success!',
    close: 'Close',
  },
}

const tr: TranslationKeys = {
  hero: {
    title: 'Sözleşmenizi 2 Dakikada Feshedin — Ücretsiz',
    subtitle: 'Avukat, kayıt veya ücret olmadan yasal fesih mektupları oluşturun. Almanya\'daki tüm yaygın sözleşme türleri için — hızlı, güvenli ve tamamen ücretsiz.',
    cta: 'Şimdi Ücretsiz Feshet',
    subtext: 'Kayıt yok · Gizli ücret yok',
    badge: 'Veritabanında 300\'den fazla sağlayıcı',
    howItWorksCTA: 'Nasıl çalıştığını gör',
    stats: {
      terminations: 'Oluşturulan mektup',
      companies: 'Mevcut sağlayıcı',
      rating: 'Kullanıcı puanı',
    },
    mockup: {
      secure: 'Yasal Güvenceli',
      id: 'ID',
      pdfReady: 'PDF Hazır',
      instantDownload: 'Anında İndir',
      validated: 'Uzman Onaylı',
      legal: '%100 Yasal',
    },
    features: {
      secure: 'Yasal Güvenceli',
      fast: '2 Dakikada Hazır',
      free: '%100 Ücretsiz',
    },
  },
  features: {
    sectionLabel: 'Özellikler',
    title: 'Başarılı bir fesih için ihtiyacınız olan her şey',
    subtitle: 'KündigungsHeld tüm işi sizin için yapar — doğru şablon, doğru adres, doğru son tarihler. Tek yapmanız gereken göndermek.',
    feature1Title: '300+ Sağlayıcı',
    feature1Desc: 'Telekom\'dan Netflix\'e, Allianz\'dan Trade Republic\'e — Almanya\'nın önde gelen tüm sağlayıcılarının güncel adresleri ve fesih süreleri.',
    feature2Title: 'Hukuken Onaylı Şablonlar',
    feature2Desc: 'Tüm şablonlar deneyimli Alman avukatlar tarafından hazırlanmış ve her fesih türünü kapsamaktadır: olağan, olağanüstü, özel ve cayma.',
    feature3Title: '2 Dakikada Tamamlandı',
    feature3Desc: 'Sağlayıcı seçin, bilgilerinizi girin, mektubunuzu alın. Bir sözleşmeyi feshetmek hiç bu kadar hızlı ve kolay olmamıştı.',
    feature4Title: '%100 GDPR Uyumlu',
    feature4Desc: 'Verileriniz tarayıcınızı asla terk etmez. Sunucu aktarımı yok, depolama yok, üçüncü taraf paylaşımı yok. Tam veri kontrolü sizde.',
    feature5Title: 'Tüm Fesih Türleri',
    feature5Desc: 'Olağan fesih, fiyat artışı nedeniyle özel fesih, cayma, anlık fesih ve ayrıca taşınma veya vefat gibi özel durumlar.',
    feature6Title: 'PDF, Yazdırma ve E-posta',
    feature6Desc: 'PDF olarak indirin, doğrudan yazdırın veya e-posta taslağı olarak açın — nasıl göndereceğinizi siz seçin.',
    statCompanies: 'Sağlayıcı',
    statTerminations: 'Fesih',
    statRating: 'Puan',
    statFree: 'Ücretsiz',
  },
  howItWorks: {
    sectionLabel: 'Nasıl Çalışır',
    title: 'Hazır fesih mektubuna üç adımda ulaşın',
    subtitle: 'Hukuki bilgiye gerek yok. Jeneratörümüz sizi sağlayıcı seçiminden mektup indirmeye kadar adım adım yönlendirir.',
    step1Title: 'Sağlayıcınızı Seçin',
    step1Desc: '300\'den fazla Alman şirketi içeren veritabanımızda sağlayıcınızı bulun. Adres ve fesih süreleri otomatik olarak doldurulur.',
    step2Title: 'Bilgilerinizi Girin',
    step2Desc: 'Kişisel bilgilerinizi ve sözleşme detaylarınızı doldurun. Doğru fesih türünü seçin — sistem her adımda size rehberlik eder.',
    step3Title: 'Mektubunuzu Gönderin',
    step3Desc: 'Fesih mektubunuz anında hazır. PDF olarak indirin, yazdırın veya e-posta ile gönderin. İade alındısıyla taahhütlü posta önerilir.',
  },
  testimonials: {
    sectionLabel: 'Kullanıcı Yorumları',
    title: '10.000\'den fazla başarılı fesih',
    subtitle: 'Gerçek kullanıcılar, gerçek sonuçlar — işte KündigungsHeld hakkında söyledikleri.',
    testimonial1Text: 'Spor salonu sözleşmemi feshetmem gerekiyordu ama nasıl yazacağımı bilmiyordum. KündigungsHeld ile mektup 2 dakikadan kısa sürede hazır oldu — ve hiçbir sorun çıkmadan kabul edildi!',
    testimonial2Text: 'Nihayet gerçekten işe yarayan bir araç. Telekom, Vodafone ve Sky sözleşmelerimi feshettim — her seferinde sorunsuz ve stressiz.',
    testimonial3Text: 'Fiyat artışı gerekçesiyle yazılan özel fesih mektubu hukuki açıdan kusursuzdu. Sigorta şirketim bir gün içinde yanıt verdi ve feshi onayladı.',
    testimonial4Text: 'Bu kadar kolay olacağını hiç düşünmemiştim. DAZN üyeliğimi ve gazete aboneliğimi aynı anda feshettim — 5 dakikadan az sürdü.',
    testimonial5Text: 'Taşındıktan sonra DSL sözleşmemi feshetmem gerekiyordu. Taşınma şablonu tam da ihtiyacım olan şeydi ve sağlayıcı hiç soru sormadan onayladı.',
    testimonial6Text: 'Şablonlar gerçekten çok iyi düşünülmüş — reklam itiraz maddesi bile dahil edilmiş. Bu kadar profesyonel bir çalışma beni çok etkiledi.',
  },
  faq: {
    sectionLabel: 'SSS',
    title: 'Sıkça Sorulan Sorular',
    q1: 'Gerçekten tamamen ücretsiz mi?',
    a1: 'Evet, hiçbir kısıtlama olmaksızın tamamen ücretsiz. KündigungsHeld %100 ücretsizdir — gizli ücret yok, abonelik yok, premium sürüm yok. İstediğiniz kadar fesih mektubu oluşturabilirsiniz.',
    q2: 'Fesih mektupları hukuken geçerli mi?',
    a2: 'Evet. Tüm şablonlar deneyimli Alman avukatlar tarafından hazırlanmış ve güncel yasal gerekliliklere uymaktadır. Tüm zorunlu unsurları içerir ve şirketler ile mahkemeler tarafından tam olarak tanınır.',
    q3: 'Verilerim saklanıyor veya paylaşılıyor mu?',
    a3: 'Asla. Tüm veriler yalnızca tarayıcınızda işlenir ve cihazınızı asla terk etmez. Kişisel bilgilerinize, sözleşme detaylarınıza veya oluşturduğunuz mektuplara erişimimiz yoktur.',
    q4: 'Mektubu oluşturduktan sonra ne yapmalıyım?',
    a4: 'PDF olarak indirin ve sağlayıcıya posta yoluyla gönderin — teslimat kanıtınız olması için iade alındısıyla taahhütlü posta olarak göndermenizi öneririz. Posta fişini güvenli bir yerde saklayın.',
    q5: 'Olağan ve olağanüstü fesih arasındaki fark nedir?',
    a5: 'Olağan fesihte kararlaştırılan ihbar süresine uyulur — örneğin sözleşme bitiminden 3 ay önce. Olağanüstü (anlık) fesih, yalnızca önemli bir neden olduğunda geçerlidir; örneğin önemli bir fiyat artışı veya sağlayıcının sözleşmeyi ciddi şekilde ihlal etmesi.',
    q6: 'Listenizdeki olmayan bir sağlayıcıyla sözleşmemi feshedebilir miyim?',
    a6: 'Kesinlikle. Sadece "Özel Sağlayıcı" seçeneğini seçin ve şirket adını ile adresini manuel olarak girin. Genel şablonlarımız her sağlayıcı ve sözleşme türü için uygundur.',
    q7: 'Arşiv nedir ve nasıl çalışır?',
    a7: 'Arşiv, tüm fesih mektuplarınızı tek bir yerde saklar. Her mektubun durumunu takip edebilir (oluşturuldu, gönderildi, onaylandı), notlar ekleyebilir ve istediğiniz zaman eski mektupları tekrar indirebilirsiniz. Tüm veriler yalnızca tarayıcınızda saklanır.',
  },
  blog: {
    sectionLabel: 'Blog',
    title: 'Uzmanlardan Hukuki Tavsiyeler',
    subtitle: 'Alman avukatlarından sözleşme feshi, tüketici hakları ve daha fazlası hakkında güncel makaleler.',
    readAll: 'Tüm makaleleri oku',
    backToHome: 'Ana Sayfaya Dön',
    searchPlaceholder: 'Makale ara — örn. fesih, süre, taşınma …',
    allCategories: 'Tümü',
    articlesCount: 'makale',
    articlesFiltered: '/',
    clearFilters: 'Filtreleri temizle',
    noResultsTitle: 'Makale bulunamadı',
    noResultsDesc: 'Farklı bir arama terimi deneyin.',
    showAll: 'Tüm makaleleri göster',
  },
  generator: {
    title: 'Fesih Mektubu Oluştur',
    step: 'Adım',
    stepOf: '/',
    nextStep: 'Devam Et',
    previousStep: 'Geri',
    selectCompany: 'Sağlayıcı Seçin',
    customCompany: 'Özel Sağlayıcı',
    searchCompany: 'Sağlayıcı ara...',
    category: 'Kategori',
    allCategories: 'Tüm Kategoriler',
    yourDetails: 'Kişisel Bilgileriniz',
    salutation: 'Hitap',
    firstName: 'Ad',
    lastName: 'Soyad',
    street: 'Sokak ve Numara',
    postalCode: 'Posta Kodu',
    city: 'Şehir',
    customerNumber: 'Müşteri Numarası (isteğe bağlı)',
    contractNumber: 'Sözleşme Numarası (isteğe bağlı)',
    terminationType: 'Fesih Türü',
    terminationDate: 'Fesih Tarihi',
    nextPossible: 'En Erken Mümkün Tarih',
    reason: 'Gerekçe (isteğe bağlı)',
    additionalInfo: 'Ek Bilgi',
    preview: 'Önizleme',
    generating: 'Mektubunuz oluşturuluyor...',
    copyToClipboard: 'Panoya Kopyala',
    copied: 'Kopyalandı!',
    downloadPDF: 'PDF İndir',
    print: 'Yazdır',
    sendEmail: 'E-posta ile Gönder',
    saveToArchive: 'Arşive Kaydet',
    saved: 'Kaydedildi!',
  },
  archive: {
    title: 'Arşivim',
    subtitle: 'Tüm fesih mektuplarınız tek bir yerde',
    searchPlaceholder: 'Sağlayıcı, isim veya gerekçeye göre ara...',
    filterAll: 'Tümü',
    filterCreated: 'Oluşturuldu',
    filterSent: 'Gönderildi',
    filterConfirmed: 'Onaylandı',
    statusCreated: 'Oluşturuldu',
    statusSent: 'Gönderildi',
    statusConfirmed: 'Onaylandı',
    total: 'Toplam',
    noResults: 'Fesih mektubu bulunamadı',
    deleteConfirm: 'Bu fesih mektubunu kalıcı olarak silmek istediğinizden emin misiniz?',
    delete: 'Sil',
    cancel: 'İptal',
    downloadPDF: 'PDF İndir',
    copyText: 'Metni Kopyala',
    changeStatus: 'Durumu Güncelle',
    exportCSV: 'Arşivi CSV Olarak Dışa Aktar',
    backToHome: 'Ana Sayfaya Dön',
    emptyStateTitle: 'Henüz fesih mektubu yok',
    emptyStateDesc: 'İlk fesih mektubunuzu şimdi oluşturun — yalnızca birkaç dakika sürer.',
    emptyStateButton: 'İlk Mektubumu Oluştur',
    noSearchResultsTitle: 'Sonuç bulunamadı',
    noSearchResultsDesc: 'Farklı bir arama terimi deneyin veya filtrelerinizi temizleyin.',
    changeStatusLabel: 'Durumu Değiştir',
    noteLabel: 'Not',
    notePlaceholder: 'Örn. gönderim tarihi, takip numarası, sağlayıcı yanıtı...',
    save: 'Kaydet',
    letterPreview: 'Fesih Mektubu',
    copied: 'Kopyalandı!',
    privacyNotice: 'Tüm veriler yalnızca tarayıcınızda saklanır — sunucularımızda asla değil.',
  },
  cta: {
    title: 'Sonunda feshetmeye hazır mısınız?',
    subtitle: '2 dakikadan kısa sürede yasal fesih mektubunuzu oluşturun — tamamen ücretsiz, kayıt gerekmez.',
    button: 'Mektubumu Şimdi Oluştur',
  },
  footer: {
    tagline: 'Sözleşme feshi artık kolay.',
    about: 'Hakkımızda',
    aboutText: 'KündigungsHeld, sözleşme feshini herkes için basit, hızlı ve yasal güvenceli hale getirir.',
    legal: 'Yasal Bilgiler',
    impressum: 'Künye',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
    resources: 'Kaynaklar',
    blog: 'Blog',
    faq: 'SSS',
    support: 'Destek',
    visitorCount: 'Aktif Kullanıcı',
    visitors: 'Ziyaretçi',
    rights: 'Tüm hakları saklıdır',
  },
  nav: {
    features: 'Özellikler',
    howItWorks: 'Nasıl Çalışır',
    generator: 'Oluşturucu',
    fristenrechner: 'Süre Hesaplayıcı',
    archive: 'Arşivim',
    blog: 'Blog',
    faq: 'SSS',
  },
  common: {
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    success: 'Başarılı!',
    close: 'Kapat',
  },
}

const zh: TranslationKeys = {
  hero: {
    title: '2分钟解除任何合同——完全免费',
    subtitle: '无需律师、无需注册、无任何费用，即可生成符合德国法律要求的合同解除函。快速、安全、可靠。',
    cta: '立即免费解除合同',
    subtext: '无需注册 · 无隐藏费用',
    badge: '数据库收录超过300家供应商',
    howItWorksCTA: '了解使用方法',
    stats: {
      terminations: '已生成解除函',
      companies: '收录供应商',
      rating: '用户评分',
    },
    mockup: {
      secure: '法律合规',
      id: 'ID',
      pdfReady: 'PDF已就绪',
      instantDownload: '即时下载',
      validated: '专家审核',
      legal: '100%合法',
    },
    features: {
      secure: '法律合规',
      fast: '2分钟完成',
      free: '100%免费',
    },
  },
  features: {
    sectionLabel: '功能特色',
    title: '成功解除合同所需的一切',
    subtitle: 'KündigungsHeld为您完成所有繁琐工作——正确的模板、准确的地址、规范的期限。您只需发送即可。',
    feature1Title: '300+家供应商',
    feature1Desc: '从Telekom到Netflix，从Allianz到Trade Republic——德国所有主要供应商的最新地址和解约期限，一应俱全。',
    feature2Title: '经法律审核的模板',
    feature2Desc: '所有模板均由经验丰富的德国律师起草，涵盖所有解约类型：普通解约、特别解约、撤销权声明及即时解约。',
    feature3Title: '2分钟即可完成',
    feature3Desc: '选择供应商、填写信息、获取解除函。解除合同从未如此快速简便。',
    feature4Title: '100%符合GDPR',
    feature4Desc: '您的数据从不离开浏览器。无服务器上传、无数据存储、不与第三方共享。数据完全由您掌控。',
    feature5Title: '支持所有解约类型',
    feature5Desc: '普通解约、因涨价的特别解约、撤销权声明、即时解约，以及搬迁、亲属去世等特殊情况。',
    feature6Title: 'PDF、打印与邮件',
    feature6Desc: '以PDF格式下载、直接打印或作为邮件草稿打开——由您选择发送方式。',
    statCompanies: '供应商',
    statTerminations: '解约数量',
    statRating: '评分',
    statFree: '免费',
  },
  howItWorks: {
    sectionLabel: '使用方法',
    title: '三步获得完整的解约函',
    subtitle: '无需法律知识。我们的生成器从选择供应商到下载解除函，全程一步步指引您。',
    step1Title: '选择供应商',
    step1Desc: '在我们收录300多家德国公司的数据库中找到您的供应商。地址和解约期限自动填入。',
    step2Title: '填写您的信息',
    step2Desc: '填写个人信息和合同详情。选择适合的解约类型——系统会在每个步骤为您提供说明。',
    step3Title: '发送解除函',
    step3Desc: '您的解约函立即生成。以PDF下载、打印或通过邮件发送。建议通过挂号信附回执的方式寄送。',
  },
  testimonials: {
    sectionLabel: '用户评价',
    title: '超过10,000次成功解约',
    subtitle: '真实用户，真实结果——这是他们对KündigungsHeld的评价。',
    testimonial1Text: '我需要解除健身房合同，但完全不知道如何写信。KündigungsHeld在不到2分钟内就准备好了解约函——对方毫无异议地接受了！',
    testimonial2Text: '终于找到一个真正有效的工具。我用它解除了Telekom、Vodafone和Sky的合同——每次都顺利完成，没有任何麻烦。',
    testimonial3Text: '因涨价提出的特别解约函在法律措辞上无懈可击。我的保险公司当天就回复并确认了解约。',
    testimonial4Text: '没想到会这么简单。我同时解除了DAZN会员资格和报纸订阅——全程不到5分钟。',
    testimonial5Text: '搬家后我需要解除DSL合同。搬迁模板完全符合我的需求，供应商二话没说就确认了。',
    testimonial6Text: '模板真的考虑得非常周全——甚至包含了拒绝广告的异议条款。这体现了极高的专业水准。',
  },
  faq: {
    sectionLabel: '常见问题',
    title: '常见问题解答',
    q1: '真的完全免费吗？',
    a1: '是的，完全免费且无任何限制。KündigungsHeld是100%免费的——没有隐藏费用、没有订阅制度、没有付费版本。您可以无限次生成解约函，无需支付任何费用。',
    q2: '解约函具有法律效力吗？',
    a2: '是的。所有模板均由经验丰富的德国律师编写和审核，符合现行法律要求。模板包含所有必要要素，完全获得公司和法院的认可。',
    q3: '我的数据会被存储或共享吗？',
    a3: '绝对不会。所有数据仅在您的浏览器中处理，从不离开您的设备。我们无法访问您的个人信息、合同详情或您生成的解约函。',
    q4: '生成解约函后我该怎么做？',
    a4: '以PDF格式下载后，将其邮寄给供应商——建议通过挂号信附回执的方式，以便您有收件证明。请妥善保管邮寄凭证。',
    q5: '普通解约和特别解约有什么区别？',
    a5: '普通解约需遵守约定的提前通知期——例如合同到期前3个月。特别解约（即时解约）仅在存在重要理由时才有效，例如供应商大幅涨价或严重违约。',
    q6: '我可以解除您列表中没有的供应商的合同吗？',
    a6: '当然可以。只需选择"自定义供应商"，手动输入公司名称和地址即可。我们的通用模板适用于任何供应商和合同类型。',
    q7: '档案是什么？如何使用？',
    a7: '档案将您所有的解约函集中存储在一处。您可以追踪每封信的状态（已创建、已发送、已确认），添加备注，并随时重新下载旧版解约函。所有数据仅存储在您的浏览器中，从不上传至我们的服务器。',
  },
  blog: {
    sectionLabel: '博客',
    title: '专家法律建议',
    subtitle: '德国律师撰写的关于合同解除、消费者权益等主题的最新文章。',
    readAll: '查看全部文章',
    backToHome: '返回首页',
    searchPlaceholder: '搜索文章 — 例如：解约、期限、搬迁 …',
    allCategories: '全部',
    articlesCount: '篇文章',
    articlesFiltered: '共',
    clearFilters: '清除筛选',
    noResultsTitle: '未找到文章',
    noResultsDesc: '请尝试其他关键词。',
    showAll: '显示全部文章',
  },
  generator: {
    title: '生成解约函',
    step: '第',
    stepOf: '步，共',
    nextStep: '继续',
    previousStep: '返回',
    selectCompany: '选择供应商',
    customCompany: '自定义供应商',
    searchCompany: '搜索供应商...',
    category: '类别',
    allCategories: '全部类别',
    yourDetails: '您的个人信息',
    salutation: '称谓',
    firstName: '名',
    lastName: '姓',
    street: '街道和门牌号',
    postalCode: '邮政编码',
    city: '城市',
    customerNumber: '客户编号（选填）',
    contractNumber: '合同编号（选填）',
    terminationType: '解约类型',
    terminationDate: '解约日期',
    nextPossible: '最早可能日期',
    reason: '理由（选填）',
    additionalInfo: '补充信息',
    preview: '预览',
    generating: '正在生成解约函...',
    copyToClipboard: '复制到剪贴板',
    copied: '已复制！',
    downloadPDF: '下载PDF',
    print: '打印',
    sendEmail: '通过邮件发送',
    saveToArchive: '保存到档案',
    saved: '已保存！',
  },
  archive: {
    title: '我的档案',
    subtitle: '所有解约函集中管理',
    searchPlaceholder: '按供应商、姓名或理由搜索...',
    filterAll: '全部',
    filterCreated: '已创建',
    filterSent: '已发送',
    filterConfirmed: '已确认',
    statusCreated: '已创建',
    statusSent: '已发送',
    statusConfirmed: '已确认',
    total: '共计',
    noResults: '未找到解约函',
    deleteConfirm: '您确定要永久删除此解约函吗？',
    delete: '删除',
    cancel: '取消',
    downloadPDF: '下载PDF',
    copyText: '复制文本',
    changeStatus: '更新状态',
    exportCSV: '导出档案为CSV',
    backToHome: '返回首页',
    emptyStateTitle: '档案暂无内容',
    emptyStateDesc: '现在生成您的第一封解约函——只需几分钟。',
    emptyStateButton: '生成第一封解约函',
    noSearchResultsTitle: '未找到结果',
    noSearchResultsDesc: '请尝试其他关键词或清除筛选条件。',
    changeStatusLabel: '更改状态',
    noteLabel: '备注',
    notePlaceholder: '例如：发送日期、快递单号、供应商回复...',
    save: '保存',
    letterPreview: '解约函',
    copied: '已复制！',
    privacyNotice: '所有数据仅存储在您的浏览器中，从不上传至我们的服务器。',
  },
  cta: {
    title: '准备好终于解除合同了吗？',
    subtitle: '在不到2分钟内生成符合法律要求的解约函——完全免费，无需注册。',
    button: '立即生成我的解约函',
  },
  footer: {
    tagline: '合同解除，从未如此简单。',
    about: '关于我们',
    aboutText: 'KündigungsHeld让合同解除变得简单、快速且符合法律——人人皆可使用。',
    legal: '法律信息',
    impressum: '版权声明',
    privacy: '隐私政策',
    terms: '服务条款',
    resources: '资源',
    blog: '博客',
    faq: '常见问题',
    support: '客服支持',
    visitorCount: '活跃用户',
    visitors: '访客数',
    rights: '版权所有',
  },
  nav: {
    features: '功能特色',
    howItWorks: '使用方法',
    generator: '生成器',
    fristenrechner: '期限计算器',
    archive: '我的档案',
    blog: '博客',
    faq: '常见问题',
  },
  common: {
    loading: '加载中...',
    error: '出现错误，请重试。',
    success: '操作成功！',
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