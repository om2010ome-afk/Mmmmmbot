import React from 'react';
import { motion } from 'framer-motion';
import {
  Upload, Type, Snowflake, Clock, ArrowLeft, Trash2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';

export const DashboardPage: React.FC = () => {
  const { user, fonts, jobs, setPage, setCurrentFont, setCurrentJob, removeFont } = useStore();

  const stats = [
    { label: 'الخطوط المرفوعة', value: fonts.length, icon: <Type className="w-5 h-5" /> },
    { label: 'الملفات المعالجة', value: jobs.filter(j => j.status === 'completed').length, icon: <Snowflake className="w-5 h-5" /> },
    { label: 'العمليات الجارية', value: jobs.filter(j => !['completed', 'failed'].includes(j.status)).length, icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader />

      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-1">
            مرحبًا {user?.displayName || 'يا صديقي'} 👋
          </h1>
          <p className="text-[#8A8A8A] text-sm">ماذا تريد أن تهندس اليوم؟</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={index} delay={index * 0.1} padding="sm" className="text-center">
              <div className="text-[#C9A86A] flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[#8A8A8A] mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Upload CTA */}
        <GlassCard delay={0.3} padding="lg" className="mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A86A]/20 to-[#C9A86A]/5 flex items-center justify-center flex-shrink-0">
              <Upload className="w-7 h-7 text-[#C9A86A]" />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-lg font-semibold text-white mb-1">ارفع خطًا جديدًا</h3>
              <p className="text-sm text-[#8A8A8A]">ارفع ملف TTF أو OTF لتحليله وتجميد خصائصه</p>
            </div>
            <LuxuryButton
              variant="gold"
              onClick={() => setPage('upload')}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              رفع خط
            </LuxuryButton>
          </div>
        </GlassCard>

        {/* Recent Fonts */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">الخطوط الأخيرة</h2>
          
          {fonts.length === 0 ? (
            <EmptyState
              icon={Type}
              title="لا توجد خطوط"
              description="لم ترفع أي خطوط بعد. ابدأ برفع ملف خط لتحليله."
              action={
                <LuxuryButton variant="secondary" onClick={() => setPage('upload')} icon={<Upload className="w-4 h-4" />}>
                  رفع خط
                </LuxuryButton>
              }
            />
          ) : (
            <div className="space-y-3">
              {fonts.slice().reverse().map((font, index) => (
                <GlassCard key={font.id} delay={index * 0.05} hoverable padding="sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,106,0.08)] flex items-center justify-center flex-shrink-0">
                      <Type className="w-6 h-6 text-[#C9A86A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{font.fontFamily}</h4>
                      <p className="text-xs text-[#8A8A8A] mt-0.5">
                        {font.originalFilename} · {(font.fileSize / 1024).toFixed(0)} KB · {font.glyphCount} حرف
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StatusBadge status={font.status} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentFont(font);
                          setPage('analysis');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs text-[#C9A86A] bg-[rgba(201,168,106,0.08)] hover:bg-[rgba(201,168,106,0.15)] transition-colors"
                      >
                        تحليل
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFont(font.id);
                        }}
                        className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Recent Jobs */}
        {jobs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">عمليات التجميد</h2>
            <div className="space-y-3">
              {jobs.slice().reverse().map((job, index) => (
                <GlassCard
                  key={job.id}
                  delay={index * 0.05}
                  hoverable
                  padding="sm"
                  onClick={() => {
                    setCurrentJob(job);
                    setPage('job');
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(124,92,255,0.08)] flex items-center justify-center flex-shrink-0">
                      <Snowflake className="w-6 h-6 text-[#7C5CFF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium">
                        تجميد {job.selectedFeatures.length} خصائص
                      </h4>
                      <p className="text-xs text-[#8A8A8A] mt-0.5">
                        {job.selectedFeatures.join(', ')}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
