import React from 'react';

import {
  User, Mail, Calendar, Shield, Crown,
  LogOut, Trash2, Type, Snowflake
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';

export const AccountPage: React.FC = () => {
  const { user, fonts, jobs, logout, setPage } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8A8A8A] mb-4">يرجى تسجيل الدخول أولاً</p>
          <LuxuryButton variant="gold" onClick={() => setPage('login')}>تسجيل الدخول</LuxuryButton>
        </div>
      </div>
    );
  }

  const planLabels: Record<string, string> = {
    free: 'مجاني',
    pro: 'احترافي',
    studio: 'استوديو',
    enterprise: 'مؤسسات',
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="حسابي" showBack backPage="dashboard" />

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Profile Card */}
        <GlassCard delay={0.1} className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-16 h-16 rounded-2xl" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A86A]/20 to-[#C9A86A]/5 flex items-center justify-center">
                <User className="w-8 h-8 text-[#C9A86A]" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
              <p className="text-sm text-[#8A8A8A]">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]">
              <span className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني
              </span>
              <span className="text-sm text-white">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]">
              <span className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                <Crown className="w-4 h-4" />
                الخطة
              </span>
              <span className="text-sm text-[#C9A86A]">{planLabels[user.plan]}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)]">
              <span className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                <Calendar className="w-4 h-4" />
                تاريخ الانضمام
              </span>
              <span className="text-sm text-white">{user.createdAt.toLocaleDateString('ar')}</span>
            </div>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <GlassCard delay={0.2} padding="sm" className="text-center">
            <Type className="w-5 h-5 text-[#C9A86A] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{fonts.length}</div>
            <div className="text-xs text-[#8A8A8A]">خطوط مرفوعة</div>
          </GlassCard>
          <GlassCard delay={0.25} padding="sm" className="text-center">
            <Snowflake className="w-5 h-5 text-[#7C5CFF] mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'completed').length}</div>
            <div className="text-xs text-[#8A8A8A]">عمليات تجميد</div>
          </GlassCard>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <GlassCard delay={0.3} hoverable padding="sm" onClick={() => setPage('terms')}>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#8A8A8A]" />
              <span className="text-sm text-white flex-1">شروط الاستخدام</span>
              <span className="text-[#555] text-xs">←</span>
            </div>
          </GlassCard>

          <GlassCard delay={0.35} hoverable padding="sm" onClick={() => setPage('privacy')}>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#8A8A8A]" />
              <span className="text-sm text-white flex-1">سياسة الخصوصية</span>
              <span className="text-[#555] text-xs">←</span>
            </div>
          </GlassCard>

          <div className="pt-4 space-y-3">
            <LuxuryButton
              variant="secondary"
              fullWidth
              onClick={logout}
              icon={<LogOut className="w-4 h-4" />}
            >
              تسجيل خروج
            </LuxuryButton>

            <LuxuryButton
              variant="ghost"
              fullWidth
              onClick={() => {
                if (confirm('هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.')) {
                  logout();
                }
              }}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-400 hover:text-red-300"
            >
              حذف الحساب
            </LuxuryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
