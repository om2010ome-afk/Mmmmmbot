import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LuxuryButton } from '../components/LuxuryButton';

export const SplashPage: React.FC = () => {
  const { setPage, showSplash, setShowSplash } = useStore();

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background ambient */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.06)_0%,transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(201,168,106,0.03)_0%,transparent_50%)]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C9A86A] to-[#8B6914] flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(201,168,106,0.15)]"
            >
              <span className="text-black text-3xl font-bold" style={{ fontFamily: 'Inter' }}>F</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-3 text-center"
            >
              مهندس الخطوط
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-[#C9A86A] font-medium mb-2 text-center"
              style={{ fontFamily: 'Inter' }}
            >
              FontEngineer
            </motion.p>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-md text-center mt-6 mb-10"
            >
              <p className="text-[#D8D8D8] text-base leading-relaxed mb-2">
                جمّد خصائص OpenType داخل خطك بلمسة واحدة
              </p>
              <p className="text-[#8A8A8A] text-sm leading-relaxed">
                ارفع الخط، اختر الخصائص، حمّل نسخة جديدة جاهزة للاستخدام
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 items-center"
            >
              <LuxuryButton
                variant="gold"
                size="lg"
                onClick={() => {
                  setShowSplash(false);
                  setPage('landing');
                }}
                icon={<Sparkles className="w-5 h-5" />}
              >
                ابدأ الآن
              </LuxuryButton>

              <LuxuryButton
                variant="ghost"
                size="lg"
                onClick={() => {
                  setShowSplash(false);
                  setPage('upload');
                }}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                جرّب بدون حساب
              </LuxuryButton>
            </motion.div>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 text-center"
          >
            <p className="text-[#444] text-xs">
              Freeze OpenType Features • تجميد خصائص الخط
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
