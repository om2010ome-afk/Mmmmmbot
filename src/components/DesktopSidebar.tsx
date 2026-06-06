import React from 'react';
import { motion } from 'framer-motion';
import { Home, Upload, FlaskConical, FolderOpen, User, Snowflake, FileText, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Page } from '../types';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  page: Page;
}

export const DesktopSidebar: React.FC = () => {
  const { currentPage, setPage, isAuthenticated, currentFont } = useStore();

  if (!isAuthenticated) return null;

  const mainItems: NavItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'الرئيسية', page: 'dashboard' },
    { icon: <Upload className="w-5 h-5" />, label: 'رفع خط', page: 'upload' },
  ];

  const fontItems: NavItem[] = currentFont ? [
    { icon: <FolderOpen className="w-5 h-5" />, label: 'تحليل الخط', page: 'analysis' },
    { icon: <FlaskConical className="w-5 h-5" />, label: 'المختبر', page: 'lab' },
    { icon: <Snowflake className="w-5 h-5" />, label: 'تجميد', page: 'freeze' },
  ] : [];

  const bottomItems: NavItem[] = [
    { icon: <User className="w-5 h-5" />, label: 'حسابي', page: 'account' },
  ];

  const renderItem = (item: NavItem) => {
    const isActive = currentPage === item.page;
    return (
      <button
        key={item.label}
        onClick={() => setPage(item.page)}
        className={`
          w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200
          ${isActive
            ? 'bg-[rgba(201,168,106,0.1)] text-[#C9A86A]'
            : 'text-[#8A8A8A] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
          }
        `}
      >
        {item.icon}
        <span>{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="sidebarIndicator"
            className="absolute right-0 w-0.5 h-6 bg-[#C9A86A] rounded-full"
          />
        )}
      </button>
    );
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex fixed right-0 top-0 bottom-0 w-56 flex-col z-30 bg-[rgba(8,8,8,0.95)] border-l border-[rgba(255,255,255,0.06)] pt-16"
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A86A] to-[#8B6914] flex items-center justify-center">
            <span className="text-black font-bold text-sm" style={{ fontFamily: 'Inter' }}>F</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">مهندس الخطوط</p>
            <p className="text-[#666] text-[10px]">FontEngineer</p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[#555] text-[10px] font-medium px-4 mb-2">القائمة الرئيسية</p>
        {mainItems.map(renderItem)}

        {fontItems.length > 0 && (
          <>
            <div className="py-2">
              <div className="border-t border-[rgba(255,255,255,0.04)]" />
            </div>
            <p className="text-[#555] text-[10px] font-medium px-4 mb-2">الخط الحالي</p>
            <p className="text-[#C9A86A] text-xs px-4 mb-2 truncate">{currentFont?.fontFamily}</p>
            {fontItems.map(renderItem)}
          </>
        )}
      </div>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[rgba(255,255,255,0.06)] space-y-1">
        {bottomItems.map(renderItem)}
      </div>
    </motion.aside>
  );
};
