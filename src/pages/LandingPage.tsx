import React from 'react';
import { motion } from 'framer-motion';
import {
  Upload, Search, Snowflake, Eye, Download, Shield,
  Sparkles, ArrowLeft, Zap, Layers
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { LuxuryButton } from '../components/LuxuryButton';
import { GlassCard } from '../components/GlassCard';
import { TopHeader } from '../components/TopHeader';

export const LandingPage: React.FC = () => {
  const { setPage } = useStore();

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'ارفع خطك',
      desc: 'ادعم ملفات TTF و OTF بكل سهولة مع تحقق تلقائي من صحة الملف',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'اكتشف خصائصه',
      desc: 'تحليل شامل لجميع خصائص OpenType الموجودة في جداول GSUB و GPOS',
    },
    {
      icon: <Snowflake className="w-6 h-6" />,
      title: 'جمّد الخصائص',
      desc: 'تجميد حقيقي داخل ملف الخط نفسه وليس مجرد CSS',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'المعاينة الحية',
      desc: 'شاهد الفرق بين قبل وبعد تفعيل كل خاصية في الوقت الحقيقي',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'حمّل نسخة جاهزة',
      desc: 'خط جديد جاهز للاستخدام في أي برنامج بدون تفعيل يدوي',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'حماية ملفاتك',
      desc: 'ملفاتك آمنة تمامًا ولا يتم مشاركتها مع أي طرف ثالث',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      <TopHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(201,168,106,0.05)_0%,transparent_60%)]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(201,168,106,0.08)] border border-[rgba(201,168,106,0.15)] text-[#C9A86A] text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>أول منصة عربية لتجميد خصائص OpenType</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            جمّد خصائص خطك
            <br />
            <span className="text-[#C9A86A]">بلمسة واحدة</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#8A8A8A] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ارفع ملف الخط، اختر خصائص OpenType التي تريدها، وحمّل نسخة جديدة
            بالخصائص مدمجة داخل الخط نفسه — جاهزة للاستخدام في أي برنامج.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <LuxuryButton
              variant="gold"
              size="lg"
              onClick={() => setPage('login')}
              icon={<Zap className="w-5 h-5" />}
            >
              ابدأ مجانًا
            </LuxuryButton>
            <LuxuryButton
              variant="secondary"
              size="lg"
              onClick={() => setPage('upload')}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              جرّب الآن بدون حساب
            </LuxuryButton>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard delay={0.1} padding="lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 text-lg">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">المشكلة</h3>
                <p className="text-[#8A8A8A] text-sm leading-relaxed">
                  الكثير من الخطوط تحتوي على خصائص OpenType رائعة مثل الربط والزخارف
                  والبدائل الأسلوبية، لكنها لا تظهر تلقائيًا في البرامج. يحتاج المستخدم
                  لتفعيلها يدويًا في كل مرة، وبعض البرامج لا تدعمها أصلاً.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.2} padding="lg">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">الحل</h3>
                <p className="text-[#8A8A8A] text-sm leading-relaxed">
                  مهندس الخطوط يقوم بتجميد الخصائص المختارة داخل ملف الخط نفسه.
                  يتم تطبيق الاستبدالات مباشرة على الحروف، فيصبح الخط الناتج
                  يعرض الأشكال المختارة تلقائيًا في أي برنامج بدون أي إعدادات إضافية.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="text-[#8A8A8A] max-w-xl mx-auto">
            منصة متكاملة لتحليل وتعديل وتجميد خصائص OpenType
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <GlassCard key={index} delay={index * 0.1} hoverable padding="lg">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,106,0.08)] flex items-center justify-center text-[#C9A86A] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-[#8A8A8A] leading-relaxed">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">كيف يعمل؟</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4">
          {[
            { step: '01', title: 'ارفع الخط', desc: 'ارفع ملف TTF أو OTF', icon: <Upload className="w-5 h-5" /> },
            { step: '02', title: 'اختر الخصائص', desc: 'حدد OpenType features', icon: <Layers className="w-5 h-5" /> },
            { step: '03', title: 'جمّد', desc: 'اضغط زر التجميد', icon: <Snowflake className="w-5 h-5" /> },
            { step: '04', title: 'حمّل', desc: 'نسخة جاهزة للاستخدام', icon: <Download className="w-5 h-5" /> },
          ].map((item, index) => (
            <GlassCard key={index} delay={index * 0.15} className="flex-1 text-center">
              <div className="text-[#C9A86A] text-xs font-mono mb-3">{item.step}</div>
              <div className="w-12 h-12 rounded-full bg-[rgba(201,168,106,0.08)] flex items-center justify-center text-[#C9A86A] mx-auto mb-3">
                {item.icon}
              </div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-[#8A8A8A] text-sm">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <GlassCard padding="lg" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              جاهز لتجميد خصائص خطك؟
            </h2>
            <p className="text-[#8A8A8A] mb-8 max-w-lg mx-auto">
              سجّل مجانًا وابدأ في هندسة خطوطك الآن
            </p>
            <LuxuryButton
              variant="gold"
              size="lg"
              onClick={() => setPage('login')}
              icon={<Sparkles className="w-5 h-5" />}
            >
              سجّل دخولك وابدأ
            </LuxuryButton>
          </motion.div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#C9A86A] to-[#8B6914] flex items-center justify-center">
              <span className="text-black font-bold text-xs">F</span>
            </div>
            <span className="text-sm text-[#8A8A8A]">مهندس الخطوط © 2025</span>
          </div>
          <div className="flex gap-6">
            <button onClick={() => setPage('terms')} className="text-sm text-[#666] hover:text-[#C9A86A] transition-colors">
              شروط الاستخدام
            </button>
            <button onClick={() => setPage('privacy')} className="text-sm text-[#666] hover:text-[#C9A86A] transition-colors">
              سياسة الخصوصية
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
