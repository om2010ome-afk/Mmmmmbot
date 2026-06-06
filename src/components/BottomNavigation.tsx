import React from 'react';
import { motion } from 'framer-motion';
import { Home, Upload, FlaskConical, FolderOpen, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Page } from '../types';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  page: Page;
}

export const BottomNavigation: React.FC = () => {
  const { currentPage, setPage, isAuthenticated } = useStore();

  if (!isAuthenticated) return null;

  const items: NavItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'الرئيسية', page: 'dashboard' },
    { icon: <Upload className="w-5 h-5" />, label: 'رفع', page: 'upload' },
    { icon: <FlaskConical className="w-5 h-5" />, label: 'المختبر', page: 'lab' },
    { icon: <FolderOpen className="w-5 h-5" />, label: 'الملفات', page: 'dashboard' },
    { icon: <User className="w-5 h-5" />, label: 'حسابي', page: 'account' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="mx-3 mb-3 rounded-2xl bg-[rgba(17,17,17,0.9)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] px-2 py-2">
        <div className="flex items-center justify-around">
          {items.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.label}
                onClick={() => setPage(item.page)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'text-[#C9A86A]'
                    : 'text-[#666] hover:text-[#999]'
                  }
                `}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-[#C9A86A]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
