# Translation Guide for SimplyPrefab

This guide explains how to add and manage translations throughout the SimplyPrefab Next.js application.

## Overview

The application uses a centralized translation system with English as the master language. Translations are stored in `src/translations/` directory with separate files for each supported language:

- `en.ts` — English (master)
- `hi.ts` — Hindi
- `te.ts` — Telugu
- `ta.ts` — Tamil
- `kn.ts` — Kannada
- `ml.ts` — Malayalam

## Architecture

### Translation Context
The app provides translations through the `LanguageContext` and the `useLanguage()` hook:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t('componentName.heading')}</h1>;
}
```

### Translation Structure
Translations are organized in a hierarchical object structure in `src/translations/en.ts`:

```typescript
export const enTranslations = {
  nav: { ... },           // Navigation items
  common: { ... },        // Shared/common strings
  hero: { ... },          // Hero section
  features: { ... },      // Features section
  servicesPage: { ... },  // Services page
  blogPage: { ... },      // Blog page
  // ... more sections
  languages: { ... }      // Language names
};
```

## Adding New Translations

### Step 1: Add Keys to English Master (`en.ts`)

Add your new strings to the appropriate section or create a new section:

```typescript
// Add to existing section or create new:
myNewPage: {
  badge: "My Badge Text",
  heading: "My Heading",
  subtitle: "My Subtitle",
  cta: {
    button: "Click Me",
    description: "Description text"
  }
}
```

### Step 2: Use Translations in Components

Import `useLanguage` and call the translation function:

```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <>
      <h1>{t('myNewPage.heading')}</h1>
      <p>{t('myNewPage.subtitle')}</p>
      <button>{t('myNewPage.cta.button')}</button>
    </>
  );
}
```

### Step 3: Update Other Language Files (Later)

Add the same keys to other language translation files:

```typescript
// src/translations/hi.ts
export const hiTranslations = {
  myNewPage: {
    badge: "मेरी बैज टेक्स्ट",
    heading: "मेरी हेडिंग",
    // ...
  }
};
```

## Translation Blocks Added in Latest Sweep

The following translation blocks have been added to `en.ts` during the translation sweep:

### Core Sections
- **nav** — Navigation links and labels
- **common** — Shared UI strings (buttons, forms, etc.)
- **hero** — Hero section messaging
- **features** — Features section
- **services** — Services overview
- **homeModels** — Home model listings
- **footer** — Footer content

### Page-Specific Sections
- **servicesPage** — Services listing page
- **projectsPage** — Projects portfolio page
- **contactPage** — Contact page (including officesSection)
- **aboutPage** — About page
- **faqsPage** — FAQ page with category labels
- **blogPage** — Blog listing page
- **careersPage** — Careers/jobs page
- **allModelsPage** — All home models page
- **whySimplyPrefabPage** — Why SimplyPrefab page
- **priceAnalysisPage** — Price analysis calculator page

### Component Sections
- **servicesShowcase** — Services showcase component
- **testimonials** — Testimonials section
- **howItWorks** — How it works section
- **launch** — Launch animation messaging
- **contactForm** — Contact form labels
- **whatsapp** — WhatsApp widget
- **priceCalculator** — Price calculator

## Naming Conventions

Follow these conventions when adding new translation keys:

1. **Use camelCase** for keys: `myFeature`, `buttonLabel`
2. **Organize hierarchically** by feature/component: `pageName.sectionName.elementName`
3. **Keep keys short but descriptive**:
   - Good: `cta.scheduleCall`, `stats.happyCustomers`
   - Avoid: `the_button_that_users_click_to_schedule_a_call`
4. **Use plural for arrays**: `categories.all`, `options.items`

## Common Patterns

### Static Text
```typescript
heading: "Build Your Dream Home",
subtitle: "Sustainable prefab solutions"
```

### Form Labels
```typescript
form: {
  fullName: "Full Name",
  email: "Email Address",
  message: "Your Message"
}
```

### Button Text
```typescript
cta: {
  learnMore: "Learn More",
  getStarted: "Get Started",
  bookNow: "Book Consultation"
}
```

### Placeholder Text
```typescript
searchPlaceholder: "Search models...",
filterPlaceholder: "Filter by category..."
```

### Lists/Arrays
For dynamic content with multiple items, use arrays:

```typescript
features: [
  "Feature one",
  "Feature two",
  "Feature three"
]
```

Access in component:
```tsx
{t('myPage.features').map((feature, idx) => (
  <div key={idx}>{feature}</div>
))}
```

## Type Safety

The translation system includes TypeScript types. The `TranslationKey` type ensures you're using valid keys:

```typescript
export type TranslationKey = keyof typeof enTranslations;
```

For nested keys, TypeScript provides autocomplete when using the `t()` function.

## Best Practices

1. **Always use translations for user-facing text** — Never hardcode strings that users see
2. **Keep component logic separate** — Don't mix logic with translation strings
3. **Use consistent terminology** — If you call something "project" once, use "project" everywhere
4. **Add to master first** — Always add keys to `en.ts` first, then update other languages
5. **Keep keys organized** — Group related keys together in logical sections
6. **Use semantic naming** — Name keys by their purpose, not their content
7. **Document new sections** — Add comments explaining complex sections

## Debugging Missing Translations

If a translation key doesn't exist, the app will display the key name in the UI (e.g., `myPage.heading` will appear as text). To find missing keys:

1. Check browser console for any warnings
2. Search `en.ts` for the key using Ctrl+F
3. Verify the key path matches your component usage exactly

## Adding a New Language

To add a new language:

1. Create `src/translations/[lang-code].ts` (e.g., `gu.ts` for Gujarati)
2. Copy the structure from `en.ts`
3. Translate all strings to the new language
4. Add language code to `languages` object in `en.ts`:
   ```typescript
   languages: {
     en: "English",
     gu: "ગુજરાતી"
   }
   ```
5. Update `src/contexts/LanguageContext.tsx` to import and use the new language

## Example: Adding a New Page

Here's a complete example of adding translations for a new page:

### 1. Add to `en.ts`:
```typescript
// New Page
newExamplePage: {
  badge: "New Feature",
  heading: "Welcome to New Page",
  subtitle: "This is a new example page",
  sections: {
    section1: {
      title: "Section One",
      description: "Description of section one"
    },
    section2: {
      title: "Section Two",
      description: "Description of section two"
    }
  },
  cta: {
    primary: "Get Started",
    secondary: "Learn More"
  }
}
```

### 2. Use in component:
```tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

export default function NewExamplePage() {
  const { t } = useLanguage();
  
  return (
    <div>
      <Badge>{t('newExamplePage.badge')}</Badge>
      <h1>{t('newExamplePage.heading')}</h1>
      <p>{t('newExamplePage.subtitle')}</p>
      
      <section>
        <h2>{t('newExamplePage.sections.section1.title')}</h2>
        <p>{t('newExamplePage.sections.section1.description')}</p>
      </section>
      
      <button>{t('newExamplePage.cta.primary')}</button>
    </div>
  );
}
```

### 3. Update other language files accordingly

## Translation File Size

Keep translation files organized and manageable. If a file grows very large, consider:

1. Splitting related sections into separate files
2. Creating a translation namespace system
3. Using lazy loading for language files

Currently, all translations are in single files per language. Monitor file size and refactor if needed.

## Testing Translations

To verify translations are working:

1. Switch languages in the app UI
2. Verify text changes on all pages
3. Check browser console for any warnings
4. Test with special characters and long text

## Common Issues

### Issue: Translation key not found
- **Solution**: Check key spelling and path in component vs `en.ts`
- Use exact camelCase matching

### Issue: Missing key displays in UI
- **Solution**: Key exists but likely not added to `en.ts`
- Add the key to `en.ts` and redeploy

### Issue: TypeScript error on translation usage
- **Solution**: Ensure `useLanguage` is imported and component is marked `'use client'`

### Issue: Language not switching
- **Solution**: Check `LanguageContext` is wrapping the app in `src/pages/_app.tsx`
- Verify language selection triggers context update

## Resources

- **Translation Context**: `src/contexts/LanguageContext.tsx`
- **Translation Files**: `src/translations/`
- **Master English File**: `src/translations/en.ts`
- **Provider Setup**: `src/pages/_app.tsx`

---

**Last Updated**: November 2025  
**Maintained by**: Development Team
