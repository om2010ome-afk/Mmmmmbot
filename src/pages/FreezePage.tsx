import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, AlertTriangle, Zap, Type } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { JobProgress } from '../components/JobProgress';
import { freezeFont, createFreezeJob } from '../engine/FontFreezer';


export const FreezePage: React.FC = () => {
  const {
    currentFont, selectedFeatures, detectedFeatures,
    addJob, updateJob, setCurrentJob, setPage
  } = useStore();

  const [isRunning, setIsRunning] = useState(false);
  const [currentJobLocal, setCurrentJobLocal] = useState<ReturnType<typeof createFreezeJob> | null>(null);

  if (!currentFont) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-[#8A8A8A]">لم يتم اختيار خط.</p>
      </div>
    );
  }

  const selectedFeatureDetails = detectedFeatures.filter(f => selectedFeatures.includes(f.tag));
  const freezableFeatures = selectedFeatureDetails.filter(f => f.canFreeze);
  const nonFreezableFeatures = selectedFeatureDetails.filter(f => !f.canFreeze);

  const handleFreeze = async () => {
    if (!currentFont.arrayBuffer) {
      return;
    }

    setIsRunning(true);
    const job = createFreezeJob(currentFont.id, selectedFeatures);
    setCurrentJobLocal(job);
    addJob(job);

    try {
      const result = await freezeFont(
        currentFont.arrayBuffer,
        selectedFeatures.filter(tag => {
          const feature = detectedFeatures.find(f => f.tag === tag);
          return feature?.canFreeze;
        }),
        currentFont.originalFilename,
        (updates) => {
          const updatedJob = { ...job, ...updates };
          setCurrentJobLocal(updatedJob);
          updateJob(job.id, updates);
        }
      );

      if (result.success) {
        const finalJob = {
          ...job,
          status: 'completed' as const,
          progress: 100,
          log: result.log,
          outputFileName: result.outputFileName,
          outputFileData: result.outputBuffer,
          completedAt: new Date(),
        };
        setCurrentJobLocal(finalJob);
        updateJob(job.id, finalJob);
        setCurrentJob(finalJob);
      } else {
        const failedJob = {
          ...job,
          status: 'failed' as const,
          progress: 0,
          log: result.log,
          errorMessage: result.warnings.join('\n'),
        };
        setCurrentJobLocal(failedJob);
        updateJob(job.id, failedJob);
      }
    } catch (err: any) {
      const failedJob = {
        ...job,
        status: 'failed' as const,
        progress: 0,
        log: [`خطأ: ${err.message}`],
        errorMessage: err.message,
      };
      setCurrentJobLocal(failedJob);
      updateJob(job.id, failedJob);
    }

    setIsRunning(false);
  };

  const handleDownload = () => {
    if (currentJobLocal?.outputFileData && currentJobLocal?.outputFileName) {
      const blob = new Blob([currentJobLocal.outputFileData], { type: 'font/ttf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentJobLocal.outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="تجميد الخصائص" showBack backPage="analysis" />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Font info */}
        <GlassCard delay={0.1} className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A86A]/20 to-[#C9A86A]/5 flex items-center justify-center flex-shrink-0">
              <Type className="w-7 h-7 text-[#C9A86A]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{currentFont.fontFamily}</h2>
              <p className="text-sm text-[#8A8A8A]">
                {currentFont.fontSubfamily} · {selectedFeatures.length} خاصية محددة
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Selected features */}
        <GlassCard delay={0.2} className="mb-6">
          <h3 className="text-sm font-semibold text-[#C9A86A] mb-3 flex items-center gap-2">
            <Snowflake className="w-4 h-4" />
            الخصائص المختارة للتجميد
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFeatureDetails.map(feature => (
              <div
                key={feature.tag}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                  feature.canFreeze
                    ? 'bg-[rgba(201,168,106,0.1)] text-[#C9A86A] border border-[#C9A86A]/20'
                    : 'bg-[rgba(255,255,255,0.04)] text-[#666] border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                <span className="font-mono">{feature.tag}</span>
                <span className="mx-1.5 opacity-50">|</span>
                <span>{feature.nameAr}</span>
              </div>
            ))}
          </div>

          {nonFreezableFeatures.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-200/70">
                <p className="font-medium mb-1">بعض الخصائص لا يمكن تجميدها:</p>
                <p>{nonFreezableFeatures.map(f => f.tag).join(', ')} — هذه خصائص تموضع (GPOS) وسيتم تجاهلها.</p>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Warning */}
        <GlassCard delay={0.3} className="mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#C9A86A] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#8A8A8A] leading-relaxed">
              <p className="font-medium text-[#D8D8D8] mb-1">ملاحظة مهمة</p>
              <p>
                بعض الخصائص يمكن دمجها بشكل كامل (مثل الربط والبدائل الأسلوبية)،
                وبعضها يعتمد على السياق وقد يتطلب معالجة دقيقة. يُنصح باختبار
                الخط الناتج في بيئات مختلفة للتأكد من النتائج.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Progress / Start */}
        {currentJobLocal ? (
          <GlassCard delay={0} className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-4">حالة التجميد</h3>
            <JobProgress job={currentJobLocal} />
            
            {currentJobLocal.status === 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <LuxuryButton
                  variant="gold"
                  fullWidth
                  onClick={handleDownload}
                >
                  تحميل الخط المجمّد
                </LuxuryButton>
                <LuxuryButton
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setCurrentJobLocal(null);
                    setPage('analysis');
                  }}
                >
                  إنشاء نسخة أخرى
                </LuxuryButton>
              </motion.div>
            )}

            {currentJobLocal.status === 'failed' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <LuxuryButton
                  variant="secondary"
                  fullWidth
                  onClick={() => setCurrentJobLocal(null)}
                >
                  حاول مرة أخرى
                </LuxuryButton>
              </motion.div>
            )}
          </GlassCard>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <LuxuryButton
              variant="gold"
              size="lg"
              fullWidth
              onClick={handleFreeze}
              disabled={freezableFeatures.length === 0 || isRunning}
              icon={<Zap className="w-5 h-5" />}
            >
              {isRunning ? 'جاري التجميد...' : `تجميد ${freezableFeatures.length} خصائص`}
            </LuxuryButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};
