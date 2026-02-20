# i18n Integration Update Plan

## Status: ✅ Core Infrastructure Complete

### Completed:
1. ✅ Created `/lib/i18n.ts` - Translation system with 5 languages
2. ✅ Created `/contexts/i18n-context.tsx` - React context provider
3. ✅ Created `/components/language-toggle.tsx` - Language switcher
4. ✅ Updated `/app/layout.tsx` - Added I18nProvider
5. ✅ Updated `/components/navbar.tsx` - Uses new i18n system

### Component Update Pattern:

**OLD (locale-provider):**
```tsx
import { useLocale } from "@/components/locale-provider"
const { t } = useLocale()
<h1>{t('hero.title')}</h1>
```

**NEW (i18n-context):**
```tsx
import { useI18n } from "@/contexts/i18n-context"
const { t } = useI18n()
<h1>{t.hero.title}</h1>
```

### Components to Update:
- [ ] /components/hero-section.tsx
- [ ] /components/features-section.tsx
- [ ] /components/how-it-works-section.tsx
- [ ] /components/kundigung-generator.tsx (LARGE - most critical)
- [ ] /components/cta-section.tsx
- [ ] /components/footer.tsx
- [ ] /components/archiv-client.tsx
- [ ] /app/blog/page.tsx
- [ ] /app/blog/[slug]/page.tsx

### Translation Coverage:
✅ Hero section
✅ Features section (6 features)
✅ How it works (3 steps)
✅ Generator form (all fields + buttons)
✅ Archive (search, filters, statuses)
✅ CTA section
✅ Footer (links, visitor counter)
✅ Navigation
✅ Blog
✅ Common strings

### Languages Supported:
- German (de) - DEFAULT
- Ukrainian (uk)
- English (en)
- Turkish (tr)
- Chinese (zh)

### Storage:
- Language stored in localStorage: 'kundigungsheld-language'
- Persists across sessions
- Default: German (de)

### Next Steps:
1. Update all components to use new i18n system
2. Remove old locale-provider dependency
3. Test all language switches
4. Verify letter templates stay in German

