import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import type { OpenTypeFeature } from '../types';

interface FeaturePillProps {
  feature: OpenTypeFeature;
  selected: boolean;
  onToggle: (tag: string) => void;
  showDetails?: boolean;
}

export const FeaturePill: React.FC<FeaturePillProps> = ({
  feature,
  selected,
  onToggle,
  showDetails = false,
}) => {
  const canFreeze = feature.canFreeze;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => canFreeze && onToggle(feature.tag)}
        className={`
          relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 cursor-pointer
          border
          ${selected
            ? 'bg-[rgba(201,168,106,0.15)] border-[#C9A86A] text-[#E0C992]'
            : canFreeze
              ? 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-[#D8D8D8] hover:border-[rgba(255,255,255,0.15)]'
              : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-[#555] cursor-not-allowed'
          }
        `}
      >
        <div className="flex items-center gap-2">
          {selected && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
          {!canFreeze && <Lock className="w-3 h-3 text-[#555]" />}
          <span className="font-mono text-xs tracking-wider">{feature.tag}</span>
          <span className="text-xs opacity-70">|</span>
          <span className="text-xs">{feature.nameAr}</span>
        </div>
        {feature.tableType === 'GPOS' && (
          <span className="absolute -top-1.5 -left-1.5 text-[8px] bg-[#333] text-[#888] px-1.5 py-0.5 rounded-full">
            GPOS
          </span>
        )}
      </motion.button>
      {showDetails && (
        <div className="mt-1 px-2 text-xs text-[#666]">
          <p>{feature.descriptionAr}</p>
          {feature.lookupCount > 0 && (
            <p className="text-[#555] mt-0.5">{feature.lookupCount} lookups</p>
          )}
        </div>
      )}
    </motion.div>
  );
};
