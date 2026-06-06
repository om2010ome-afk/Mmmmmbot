import React from 'react';

import { Snowflake, Download, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { StatusBadge } from '../components/StatusBadge';
import { JobProgress } from '../components/JobProgress';

export const JobPage: React.FC = () => {
  const { currentJob, setPage } = useStore();

  if (!currentJob) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-[#8A8A8A]">لا توجد مهمة محددة</p>
      </div>
    );
  }

  const handleDownload = () => {
    if (currentJob.outputFileData && currentJob.outputFileName) {
      const blob = new Blob([currentJob.outputFileData], { type: 'font/ttf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentJob.outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="حالة المهمة" showBack backPage="dashboard" />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Job Info */}
        <GlassCard delay={0.1} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[rgba(124,92,255,0.08)] flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-[#7C5CFF]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">عملية تجميد</h2>
                <p className="text-xs text-[#8A8A8A]">
                  {new Date(currentJob.createdAt).toLocaleString('ar')}
                </p>
              </div>
            </div>
            <StatusBadge status={currentJob.status} />
          </div>

          {/* Selected Features */}
          <div className="mb-4">
            <p className="text-xs text-[#666] mb-2">الخصائص المحددة:</p>
            <div className="flex flex-wrap gap-1.5">
              {currentJob.selectedFeatures.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-lg bg-[rgba(255,255,255,0.04)] text-[10px] font-mono text-[#D8D8D8]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Progress */}
        <GlassCard delay={0.2} className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-4">التقدم</h3>
          <JobProgress job={currentJob} />
        </GlassCard>

        {/* Result */}
        {currentJob.status === 'completed' && (
          <GlassCard delay={0.3} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">تم بنجاح!</h3>
            </div>
            {currentJob.outputFileName && (
              <p className="text-sm text-[#8A8A8A] mb-4">
                اسم الملف: <span className="text-white font-mono">{currentJob.outputFileName}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <LuxuryButton variant="gold" fullWidth onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
                تحميل الخط المجمّد
              </LuxuryButton>
              <LuxuryButton variant="secondary" fullWidth onClick={() => setPage('analysis')} icon={<ArrowRight className="w-4 h-4" />}>
                إنشاء نسخة أخرى
              </LuxuryButton>
            </div>
          </GlassCard>
        )}

        {currentJob.status === 'failed' && (
          <GlassCard delay={0.3} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">فشلت العملية</h3>
            </div>
            {currentJob.errorMessage && (
              <p className="text-sm text-red-300 mb-4">{currentJob.errorMessage}</p>
            )}
            <LuxuryButton variant="secondary" fullWidth onClick={() => setPage('analysis')}>
              حاول مرة أخرى
            </LuxuryButton>
          </GlassCard>
        )}
      </div>
    </div>
  );
};
