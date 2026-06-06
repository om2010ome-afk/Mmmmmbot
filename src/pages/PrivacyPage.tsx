import React from 'react';
import { motion } from 'framer-motion';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';

export const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: '1. المصادقة والهوية',
      content: 'نستخدم Firebase Authentication لإدارة تسجيل الدخول. يمكنك التسجيل عبر حسابات Google أو Facebook أو Apple أو Microsoft. لا نخزن كلمات مرور.',
    },
    {
      title: '2. البيانات التي نجمعها',
      content: 'نخزن البريد الإلكتروني والاسم المعروض وصورة الملف الشخصي المقدمة من مزود المصادقة. هذه البيانات ضرورية لتشغيل حسابك وتقديم الخدمة.',
    },
    {
      title: '3. ملفات الخطوط',
      content: 'في الإصدار الحالي، تتم جميع عمليات تحليل ومعالجة الخطوط محليًا في متصفحك. لا يتم رفع ملفات الخطوط إلى أي خادم خارجي. في الإصدارات المستقبلية، قد يتم تخزين الملفات مؤقتًا على خوادمنا لإجراء المعالجة.',
    },
    {
      title: '4. حذف الحساب والبيانات',
      content: 'يمكنك حذف حسابك وجميع بياناتك في أي وقت من صفحة الحساب. عند حذف الحساب، يتم حذف جميع البيانات المرتبطة به بشكل نهائي.',
    },
    {
      title: '5. عدم بيع البيانات',
      content: 'لا نبيع بيانات المستخدمين لأي طرف ثالث. بياناتك الشخصية مخصصة حصريًا لتشغيل الخدمة.',
    },
    {
      title: '6. عدم مشاركة الخطوط',
      content: 'لا نشارك خطوط المستخدمين مع أي طرف ثالث. ملفاتك خاصة بك ولا يمكن لأي مستخدم آخر الوصول إليها.',
    },
    {
      title: '7. السجلات التقنية',
      content: 'قد نحتفظ بسجلات تقنية (logs) لأغراض تحسين الخدمة وتشخيص المشكلات. هذه السجلات لا تحتوي على بيانات شخصية حساسة.',
    },
    {
      title: '8. ملفات تعريف الارتباط',
      content: 'نستخدم ملفات تعريف الارتباط (cookies) الضرورية فقط لتشغيل جلسة المستخدم والمصادقة. لا نستخدم ملفات تتبع أو إعلانات.',
    },
    {
      title: '9. الأمان',
      content: 'نتخذ إجراءات أمنية مناسبة لحماية بياناتك، بما في ذلك تشفير الاتصالات والتحقق من هوية المستخدم في كل طلب.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pb-16">
      <TopHeader title="سياسة الخصوصية" showBack backPage="landing" />

      <div className="max-w-3xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-2">سياسة الخصوصية</h1>
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
