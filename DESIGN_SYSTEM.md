# نظام التصميم لقالب Furniro (Furniro Design System Rules)

مستخرج مباشرة من ملف تصميم Figma:
`https://www.figma.com/design/tYqMYTtnT8xCcWssiwOcww/eCommerce-Website-%7C-Web-Page-Design-%7C-UI-KIT-%7C-Interior-Landing-Page--Community---Copy-?node-id=117-336`

---

## 1. لوحة الألوان (Color Palette & Design Tokens)

| الرمز / المتغير | القيمة اللونية | الاستخدام والغرض |
| :--- | :--- | :--- |
| `--color-primary` | `#B88E2F` | اللون الأساسي للعلامة التجارية، الأزرار الرئيسية، الروابط النشطة، العناوين البارزة |
| `--color-primary-dark` | `#9A7524` | حالة التمرير (Hover) للأزرار والعناصر الأساسية |
| `--color-primary-light` | `#FFF3E3` | لون خلفية بطاقة الـ Hero Banner والبطاقات المميزة |
| `--color-background` | `#FFFFFF` | لون خلفية الصفحة الافتراضي |
| `--color-background-soft` | `#FCF8F3` | لون خلفية الأقسام الترويجية (Inspiration / Rooms) |
| `--color-card-bg` | `#F4F5F7` | لون خلفية بطاقات المنتجات وتفاصيلها |
| `--color-heading` | `#3A3A3A` | لون عناوين المنتجات والأقسام الرئيسية |
| `--color-text` | `#333333` | لون النصوص والعناوين الفرعية |
| `--color-text-muted` | `#666666` | لون النصوص الوصفية والفقرات العامة |
| `--color-text-subtle` | `#898989` | تصنيفات المنتجات والمعلومات الإضافية |
| `--color-text-disabled` | `#B0B0B0` | السعر الأصلي قبل الخصم (line-through) وحالات التعطيل |
| `--color-badge-discount` | `#E97171` | شارة الخصم الدائرية (-30%, -50%) |
| `--color-badge-new` | `#2EC1AC` | شارة المنتجات الجديدة (New) |
| `--color-border` | `#E8E8E8` | خطوط التقسيم والحدود الرمادية الفاتحة |
| `--color-overlay` | `rgba(58, 58, 58, 0.72)` | طبقة التعتيم التفاعلية لبطاقة المنتج عند التمرير |

---

## 2. الطباعة والخطوط (Typography)

- **الخط الأساسي العربي:** `IBM Plex Sans Arabic` (متوافق مع Poppins في القياسات والأوزان).
- **الخط اللاتيني الإضافي:** `Plus Jakarta Sans` أو `Montserrat` لشعار Furniro.
- **تدرج الأحجام والارتفاعات:**
  - **Display (Hero):** 52px / Bold / Line Height: 1.2
  - **H1 / Section Titles:** 40px / Bold / Color: `#3A3A3A`
  - **H2 / Subsections:** 32px / SemiBold
  - **H3 / Product Titles:** 24px / SemiBold / Color: `#3A3A3A`
  - **H4 / Category Titles:** 24px / SemiBold / Color: `#333333`
  - **Body Large:** 18px-20px / Regular & Medium / Color: `#666666`
  - **Body Regular:** 16px / Regular & Medium
  - **Body Small / Captions:** 14px / Regular & Medium
  - **Badges & Micro:** 12px / Bold

---

## 3. الأبعاد والمسافات (Layout & Spacing)

- **أقصى عرض للحاوية (Max Container Width):** 1280px إلى 1440px (`max-w-7xl`).
- **الهوامش الجانبية (Page Padding):** `px-4 sm:px-6 lg:px-12`.
- **المسافات بين الأقسام (Section Spacing):** `py-14 sm:py-20 lg:py-24`.
- **شبكة المنتجات (Product Grid):** 4 أعمدة في الشاشات الكبيرة (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`).
- **شبكة الفئات (Browse The Range):** 3 أعمدة (`grid-cols-1 sm:grid-cols-3 gap-6`).

---

## 4. مكونات واجهة المستخدم (UI Components)

### أ. زر Furniro الأساسي (Primary Button)
- خلفية `#B88E2F`، نص أبيض عريض، بدون استدارة كبيرة (`rounded-none` أو `rounded-xs`).
- قياس افتراضي: `px-12 py-4` أو `px-8 py-3.5`، وزن خط `font-bold` وحجم `16px`.
- التمرير (Hover): خلفية `#9A7524`.

### ب. زر Furniro المفرغ (Outline Button)
- خلفية بيضاء أو شفافة، إطار صلب بعرض 1px بلون `#B88E2F`، نص بلون `#B88E2F`.
- التمرير (Hover): خلفية `#B88E2F` ونص أبيض.

### ج. بطاقة المنتج (Product Card)
- صورة علوية بنسبة مربعة أو 301px ارتفاع.
- شارة خصم دائرية حمراء `#E97171` أو شارة جديد خضراء `#2EC1AC` أعلى اليمين.
- خلفية التفاصيل السفلية بلون `#F4F5F7` مع تباعد متناسق (`p-4 sm:p-5`).
- طبقة Overlay داكنة تظهر عند الـ Hover مع زر أبيض للإضافة للسلة وروابط المشاركة والمفضلة.

### د. شريط المزايا (Features Bar)
- قسم عريض بخلفية `#FAF3EA` يضم:
  - جودة عالية (High Quality - crafted from top materials)
  - حماية الضمان (Warranty Protection - Over 2 years)
  - شحن مجاني (Free Shipping - Order over 150 $)
  - دعم 24/7 (24 / 7 Support - Dedicated support)

---

## 5. قواعد التنفيذ التقني (Implementation Rules)
- اتجاه الصفحة بالكامل **RTL** (`dir="rtl"`).
- النصوص باللغة العربية الفصحى الأنيقة والمعبرة.
- الالتزام التام بـ `@AGENTS.md`.
