export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: 'free' | 'pro' | 'studio' | 'enterprise';
  createdAt: Date;
}

export interface FontFile {
  id: string;
  userId: string;
  originalFilename: string;
  fontFamily: string;
  fontSubfamily: string;
  fontFullName: string;
  postScriptName: string;
  version: string;
  format: 'ttf' | 'otf';
  fileSize: number;
  glyphCount: number;
  unitsPerEm: number;
  ascender: number;
  descender: number;
  tables: string[];
  hasGSUB: boolean;
  hasGPOS: boolean;
  hasCmap: boolean;
  hasKern: boolean;
  hasName: boolean;
  hasOS2: boolean;
  status: 'uploaded' | 'analyzing' | 'ready' | 'error';
  createdAt: Date;
  file?: File;
  arrayBuffer?: ArrayBuffer;
}

export interface OpenTypeFeature {
  tag: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  tableType: 'GSUB' | 'GPOS';
  supported: boolean;
  canFreeze: boolean;
  lookupCount: number;
  scripts: string[];
}

export interface FontJob {
  id: string;
  userId: string;
  fontId: string;
  status: 'queued' | 'processing' | 'analyzing' | 'applying' | 'rebuilding' | 'validating' | 'completed' | 'failed';
  selectedFeatures: string[];
  log: string[];
  errorMessage?: string;
  outputFileName?: string;
  outputFileData?: ArrayBuffer;
  createdAt: Date;
  completedAt?: Date;
  progress: number;
}

export type Page = 'splash' | 'landing' | 'login' | 'dashboard' | 'upload' | 'analysis' | 'lab' | 'freeze' | 'job' | 'account' | 'terms' | 'privacy';

export const FEATURE_INFO: Record<string, { name: string; nameAr: string; description: string; descriptionAr: string; tableType: 'GSUB' | 'GPOS'; canFreeze: boolean }> = {
  liga: { name: 'Standard Ligatures', nameAr: 'الربط القياسي', description: 'Standard ligature substitutions', descriptionAr: 'استبدالات الربط القياسية بين الحروف', tableType: 'GSUB', canFreeze: true },
  rlig: { name: 'Required Ligatures', nameAr: 'الربط الإلزامي', description: 'Required ligature substitutions', descriptionAr: 'ربط إلزامي مطلوب للغة', tableType: 'GSUB', canFreeze: true },
  dlig: { name: 'Discretionary Ligatures', nameAr: 'ربط اختياري', description: 'Optional decorative ligatures', descriptionAr: 'ربط زخرفي اختياري', tableType: 'GSUB', canFreeze: true },
  calt: { name: 'Contextual Alternates', nameAr: 'بدائل سياقية', description: 'Context-dependent alternates', descriptionAr: 'أشكال بديلة تعتمد على السياق', tableType: 'GSUB', canFreeze: true },
  salt: { name: 'Stylistic Alternates', nameAr: 'بدائل أسلوبية', description: 'Stylistic alternate forms', descriptionAr: 'أشكال بديلة أسلوبية', tableType: 'GSUB', canFreeze: true },
  swsh: { name: 'Swash', nameAr: 'زخرفة', description: 'Swash forms', descriptionAr: 'أشكال زخرفية مع ذيول وتمديدات', tableType: 'GSUB', canFreeze: true },
  cswh: { name: 'Contextual Swash', nameAr: 'زخرفة سياقية', description: 'Contextual swash alternates', descriptionAr: 'زخرفة تعتمد على السياق', tableType: 'GSUB', canFreeze: true },
  ss01: { name: 'Stylistic Set 1', nameAr: 'المجموعة الأسلوبية 1', description: 'Stylistic Set 1', descriptionAr: 'مجموعة أشكال بديلة رقم 1', tableType: 'GSUB', canFreeze: true },
  ss02: { name: 'Stylistic Set 2', nameAr: 'المجموعة الأسلوبية 2', description: 'Stylistic Set 2', descriptionAr: 'مجموعة أشكال بديلة رقم 2', tableType: 'GSUB', canFreeze: true },
  ss03: { name: 'Stylistic Set 3', nameAr: 'المجموعة الأسلوبية 3', description: 'Stylistic Set 3', descriptionAr: 'مجموعة أشكال بديلة رقم 3', tableType: 'GSUB', canFreeze: true },
  ss04: { name: 'Stylistic Set 4', nameAr: 'المجموعة الأسلوبية 4', description: 'Stylistic Set 4', descriptionAr: 'مجموعة أشكال بديلة رقم 4', tableType: 'GSUB', canFreeze: true },
  ss05: { name: 'Stylistic Set 5', nameAr: 'المجموعة الأسلوبية 5', description: 'Stylistic Set 5', descriptionAr: 'مجموعة أشكال بديلة رقم 5', tableType: 'GSUB', canFreeze: true },
  ss06: { name: 'Stylistic Set 6', nameAr: 'المجموعة الأسلوبية 6', description: 'Stylistic Set 6', descriptionAr: 'مجموعة أشكال بديلة رقم 6', tableType: 'GSUB', canFreeze: true },
  ss07: { name: 'Stylistic Set 7', nameAr: 'المجموعة الأسلوبية 7', description: 'Stylistic Set 7', descriptionAr: 'مجموعة أشكال بديلة رقم 7', tableType: 'GSUB', canFreeze: true },
  ss08: { name: 'Stylistic Set 8', nameAr: 'المجموعة الأسلوبية 8', description: 'Stylistic Set 8', descriptionAr: 'مجموعة أشكال بديلة رقم 8', tableType: 'GSUB', canFreeze: true },
  ss09: { name: 'Stylistic Set 9', nameAr: 'المجموعة الأسلوبية 9', description: 'Stylistic Set 9', descriptionAr: 'مجموعة أشكال بديلة رقم 9', tableType: 'GSUB', canFreeze: true },
  ss10: { name: 'Stylistic Set 10', nameAr: 'المجموعة الأسلوبية 10', description: 'Stylistic Set 10', descriptionAr: 'مجموعة أشكال بديلة رقم 10', tableType: 'GSUB', canFreeze: true },
  ss11: { name: 'Stylistic Set 11', nameAr: 'المجموعة الأسلوبية 11', description: 'Stylistic Set 11', descriptionAr: 'مجموعة أشكال بديلة رقم 11', tableType: 'GSUB', canFreeze: true },
  ss12: { name: 'Stylistic Set 12', nameAr: 'المجموعة الأسلوبية 12', description: 'Stylistic Set 12', descriptionAr: 'مجموعة أشكال بديلة رقم 12', tableType: 'GSUB', canFreeze: true },
  ss13: { name: 'Stylistic Set 13', nameAr: 'المجموعة الأسلوبية 13', description: 'Stylistic Set 13', descriptionAr: 'مجموعة أشكال بديلة رقم 13', tableType: 'GSUB', canFreeze: true },
  ss14: { name: 'Stylistic Set 14', nameAr: 'المجموعة الأسلوبية 14', description: 'Stylistic Set 14', descriptionAr: 'مجموعة أشكال بديلة رقم 14', tableType: 'GSUB', canFreeze: true },
  ss15: { name: 'Stylistic Set 15', nameAr: 'المجموعة الأسلوبية 15', description: 'Stylistic Set 15', descriptionAr: 'مجموعة أشكال بديلة رقم 15', tableType: 'GSUB', canFreeze: true },
  ss16: { name: 'Stylistic Set 16', nameAr: 'المجموعة الأسلوبية 16', description: 'Stylistic Set 16', descriptionAr: 'مجموعة أشكال بديلة رقم 16', tableType: 'GSUB', canFreeze: true },
  ss17: { name: 'Stylistic Set 17', nameAr: 'المجموعة الأسلوبية 17', description: 'Stylistic Set 17', descriptionAr: 'مجموعة أشكال بديلة رقم 17', tableType: 'GSUB', canFreeze: true },
  ss18: { name: 'Stylistic Set 18', nameAr: 'المجموعة الأسلوبية 18', description: 'Stylistic Set 18', descriptionAr: 'مجموعة أشكال بديلة رقم 18', tableType: 'GSUB', canFreeze: true },
  ss19: { name: 'Stylistic Set 19', nameAr: 'المجموعة الأسلوبية 19', description: 'Stylistic Set 19', descriptionAr: 'مجموعة أشكال بديلة رقم 19', tableType: 'GSUB', canFreeze: true },
  ss20: { name: 'Stylistic Set 20', nameAr: 'المجموعة الأسلوبية 20', description: 'Stylistic Set 20', descriptionAr: 'مجموعة أشكال بديلة رقم 20', tableType: 'GSUB', canFreeze: true },
  init: { name: 'Initial Forms', nameAr: 'الأشكال الأولية', description: 'Initial positional forms for Arabic', descriptionAr: 'أشكال الحروف العربية في بداية الكلمة', tableType: 'GSUB', canFreeze: true },
  medi: { name: 'Medial Forms', nameAr: 'الأشكال الوسطى', description: 'Medial positional forms for Arabic', descriptionAr: 'أشكال الحروف العربية في وسط الكلمة', tableType: 'GSUB', canFreeze: true },
  fina: { name: 'Final Forms', nameAr: 'الأشكال النهائية', description: 'Final positional forms for Arabic', descriptionAr: 'أشكال الحروف العربية في نهاية الكلمة', tableType: 'GSUB', canFreeze: true },
  isol: { name: 'Isolated Forms', nameAr: 'الأشكال المنفصلة', description: 'Isolated positional forms', descriptionAr: 'أشكال الحروف المنفصلة', tableType: 'GSUB', canFreeze: true },
  kern: { name: 'Kerning', nameAr: 'تقنين المسافات', description: 'Pair kerning adjustments', descriptionAr: 'ضبط المسافات بين أزواج الحروف', tableType: 'GPOS', canFreeze: false },
  mark: { name: 'Mark Positioning', nameAr: 'تموضع العلامات', description: 'Mark-to-base positioning', descriptionAr: 'تحديد مواقع الحركات والعلامات', tableType: 'GPOS', canFreeze: false },
  mkmk: { name: 'Mark-to-Mark', nameAr: 'علامة فوق علامة', description: 'Mark-to-mark positioning', descriptionAr: 'تموضع العلامات فوق علامات أخرى', tableType: 'GPOS', canFreeze: false },
  ccmp: { name: 'Glyph Composition', nameAr: 'تركيب الحروف', description: 'Glyph composition/decomposition', descriptionAr: 'تركيب وتفكيك الحروف', tableType: 'GSUB', canFreeze: true },
  locl: { name: 'Localized Forms', nameAr: 'أشكال محلية', description: 'Localized glyph forms', descriptionAr: 'أشكال حروف خاصة بلغة معينة', tableType: 'GSUB', canFreeze: true },
  numr: { name: 'Numerators', nameAr: 'البسط', description: 'Numerator forms', descriptionAr: 'أشكال أرقام البسط', tableType: 'GSUB', canFreeze: true },
  dnom: { name: 'Denominators', nameAr: 'المقام', description: 'Denominator forms', descriptionAr: 'أشكال أرقام المقام', tableType: 'GSUB', canFreeze: true },
  frac: { name: 'Fractions', nameAr: 'الكسور', description: 'Diagonal fractions', descriptionAr: 'أشكال الكسور', tableType: 'GSUB', canFreeze: true },
  sups: { name: 'Superscript', nameAr: 'حروف علوية', description: 'Superscript forms', descriptionAr: 'أشكال الحروف العلوية', tableType: 'GSUB', canFreeze: true },
  subs: { name: 'Subscript', nameAr: 'حروف سفلية', description: 'Subscript forms', descriptionAr: 'أشكال الحروف السفلية', tableType: 'GSUB', canFreeze: true },
  ordn: { name: 'Ordinals', nameAr: 'ترتيبية', description: 'Ordinal forms', descriptionAr: 'أشكال الأرقام الترتيبية', tableType: 'GSUB', canFreeze: true },
  case: { name: 'Case-Sensitive', nameAr: 'حساس لحالة الحرف', description: 'Case-sensitive forms', descriptionAr: 'أشكال تعتمد على حالة الحرف', tableType: 'GSUB', canFreeze: true },
  smcp: { name: 'Small Caps', nameAr: 'حروف صغيرة كبيرة', description: 'Small capital letters', descriptionAr: 'حروف كبيرة بحجم صغير', tableType: 'GSUB', canFreeze: true },
  c2sc: { name: 'Caps to Small Caps', nameAr: 'كبيرة إلى صغيرة', description: 'Capitals to small capitals', descriptionAr: 'تحويل الحروف الكبيرة إلى صغيرة كبيرة', tableType: 'GSUB', canFreeze: true },
  onum: { name: 'Oldstyle Numbers', nameAr: 'أرقام كلاسيكية', description: 'Oldstyle number figures', descriptionAr: 'أرقام بنمط كلاسيكي', tableType: 'GSUB', canFreeze: true },
  lnum: { name: 'Lining Numbers', nameAr: 'أرقام متساوية', description: 'Lining number figures', descriptionAr: 'أرقام بارتفاع متساوٍ', tableType: 'GSUB', canFreeze: true },
  pnum: { name: 'Proportional Numbers', nameAr: 'أرقام متناسبة', description: 'Proportional width numbers', descriptionAr: 'أرقام بعرض متناسب', tableType: 'GSUB', canFreeze: true },
  tnum: { name: 'Tabular Numbers', nameAr: 'أرقام جدولية', description: 'Tabular width numbers', descriptionAr: 'أرقام بعرض ثابت للجداول', tableType: 'GSUB', canFreeze: true },
  zero: { name: 'Slashed Zero', nameAr: 'صفر مشطوب', description: 'Slashed zero form', descriptionAr: 'شكل الصفر مع خط مائل', tableType: 'GSUB', canFreeze: true },
  aalt: { name: 'Access All Alternates', nameAr: 'كل البدائل', description: 'Access all available alternates', descriptionAr: 'الوصول لجميع البدائل المتاحة', tableType: 'GSUB', canFreeze: true },
  rclt: { name: 'Required Contextual', nameAr: 'سياقي إلزامي', description: 'Required contextual alternates', descriptionAr: 'بدائل سياقية إلزامية', tableType: 'GSUB', canFreeze: true },
  curs: { name: 'Cursive Positioning', nameAr: 'تموضع اتصالي', description: 'Cursive attachment positioning', descriptionAr: 'تحديد نقاط الاتصال بين الحروف', tableType: 'GPOS', canFreeze: false },
};
