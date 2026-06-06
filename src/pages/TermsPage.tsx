import React from 'react';
import { motion } from 'framer-motion';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';

export const TermsPage: React.FC = () => {
  const sections = [
    {
      title: '1. المسؤولية عن حقوق الخطوط',
      content: 'المستخدم مسؤول بالكامل عن التأكد من أنه يمتلك حق تعديل الخطوط التي يرفعها على المنصة. يجب أن يكون المستخدم مالكًا للخط أو حاصلاً على ترخيص يسمح بالتعديل.',
    },
    {
      title: '2. حظر الاستخدام غير المصرح به',
      content: 'يُمنع منعًا باتًا رفع خطوط لا يملك المستخدم حق تعديلها. يتحمل المستخدم كامل المسؤولية القانونية عن أي انتهاك لحقوق الملكية الفكرية.',
    },
    {
      title: '3. ملكية الملفات',
      content: 'الموقع لا يمتلك ملفات المستخدم ولا يدّعي أي حق ملكية عليها. جميع الخطوط المرفوعة والمعدلة تبقى ملكًا لأصحابها.',
    },
    {
      title: '4. معالجة الخطوط',
      content: 'الموقع يعالج الخطوط فقط وفقًا لتعليمات المستخدم. يتم تجميد خصائص OpenType المختارة داخل ملف الخط ولا يتم إجراء أي تعديلات أخرى.',
    },
    {
      title: '5. الملفات المؤقتة',
      content: 'في هذا الإصدار، تتم جميع عمليات المعالجة محليًا في متصفح المستخدم ولا يتم رفع أي ملفات إلى خوادم خارجية. في الإصدارات المستقبلية، قد يتم حذف الملفات المؤقتة المخزنة على الخوادم بعد مدة زمنية محددة.',
    },
    {
      title: '6. عدم ضمان النتائج',
      content: 'لا نضمن نجاح تجميد كل خاصية OpenType بسبب اختلاف بنية الخطوط وتعقيد بعض الاستبدالات. بعض الخصائص (مثل البدائل السياقية) قد لا يتم تجميدها بشكل كامل.',
    },
    {
      title: '7. اختبار الخط الناتج',
      content: 'المستخدم مسؤول عن اختبار الخط الناتج والتأكد من صحته قبل استخدامه في الإنتاج. يُنصح باختبار الخط في بيئات متعددة.',
    },
    {
      title: '8. منع الاستخدام غير القانوني',
      content: 'يُمنع استخدام المنصة لأي أغراض غير قانونية أو مخالفة للقوانين المحلية والدولية. يحتفظ الموقع بحق تعليق أو إنهاء حساب أي مستخدم يخالف هذه الشروط.',
    },
    {
      title: '9. التعديلات على الشروط',
      content: 'نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pb-16">
      <TopHeader title="شروط الاستخدام" showBack backPage="landing" />

      <div className="max-w-3xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-2">شروط الاستخدام</h1>
          <p className="text-sm text-[#8A8A8A]">آخر تحديث: يناير 2025</p>
        </motion.div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <GlassCard key={index} delay={index * 0.05}>
              <h3 className="text-base font-semibold text-white mb-2">{section.title}</h3>
              <p className="text-sm text-[#8A8A8A] leading-relaxed">{section.content}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
