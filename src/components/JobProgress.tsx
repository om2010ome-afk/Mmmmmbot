import React from 'react';
import { motion } from 'framer-motion';
import type { FontJob } from '../types';

interface JobProgressProps {
  job: FontJob;
}

const steps = [
  { key: 'queued', label: 'في الانتظار', labelEn: 'Queued' },
  { key: 'analyzing', label: 'تحليل الخط', labelEn: 'Analyzing' },
  { key: 'applying', label: 'تطبيق الاستبدالات', labelEn: 'Applying' },
  { key: 'rebuilding', label: 'إعادة بناء الخط', labelEn: 'Rebuilding' },
  { key: 'validating', label: 'التحقق من الصحة', labelEn: 'Validating' },
  { key: 'completed', label: 'مكتمل', labelEn: 'Completed' },
];

export const JobProgress: React.FC<JobProgressProps> = ({ job }) => {
  const currentStepIndex = steps.findIndex(s => s.key === job.status);
  const isFailed = job.status === 'failed';

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${job.progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`absolute top-0 right-0 h-full rounded-full ${
            isFailed
              ? 'bg-gradient-to-l from-red-500 to-red-600'
              : 'bg-gradient-to-l from-[#C9A86A] to-[#E0C992]'
          }`}
        />
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isComplete = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div
              key={step.key}
              className={`flex flex-col items-center gap-1 flex-1 ${
                isUpcoming ? 'opacity-30' : ''
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isComplete
                    ? 'bg-[#C9A86A]'
                    : isActive
                      ? isFailed
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-[#C9A86A] animate-pulse'
                      : 'bg-[rgba(255,255,255,0.1)]'
                }`}
              />
              <span className={`text-[10px] text-center ${
                isActive ? 'text-[#C9A86A] font-medium' : 'text-[#666]'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Logs */}
      {job.log && job.log.length > 0 && (
        <div className="mt-4 bg-[rgba(0,0,0,0.3)] rounded-xl p-4 max-h-48 overflow-y-auto">
          <div className="space-y-1">
            {job.log.map((entry, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`text-xs font-mono ${
                  entry.includes('✓') ? 'text-green-400' :
                  entry.includes('✗') ? 'text-red-400' :
                  entry.includes('⚠') ? 'text-yellow-400' :
                  'text-[#888]'
                }`}
                dir="auto"
              >
                {entry}
              </motion.p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
