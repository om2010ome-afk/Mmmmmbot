import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'جاري التحميل...' }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-[rgba(255,255,255,0.08)] border-t-[#C9A86A]"
        />
        <p className="text-[#8A8A8A] text-sm">{message}</p>
      </motion.div>
    </div>
  );
};
