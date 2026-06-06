import React from 'react';
import { motion } from 'framer-motion';
import {
  Type, Layers, Hash, Ruler, ArrowUp, ArrowDown,
  CheckCircle2, XCircle, FlaskConical, Snowflake, Table2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { FeaturePill } from '../components/FeaturePill';

export const AnalysisPage: React.FC = () => {
  const {
    currentFont, detectedFeatures, selectedFeatures,
    toggleFeature, selectAllFeatures, clearSelectedFeatures,
    setPage
  } = useStore();

  if (!currentFont) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-[#8A8A8A]">لم يتم اختيار خط. يرجى رفع خط أولاً.</p>
      </div>
    );
  }

  const fontInfoItems = [
    { label: 'عائلة الخط', value: currentFont.fontFamily, icon: <Type className="w-4 h-4" /> },
    { label: 'النمط', value: currentFont.fontSubfamily, icon: <Layers className="w-4 h-4" /> },
    { label: 'الاسم الكامل', value: currentFont.fontFullName, icon: <Type className="w-4 h-4" /> },
    { label: 'PostScript', value: currentFont.postScriptName, icon: <Hash className="w-4 h-4" /> },
    { label: 'الإصدار', value: currentFont.version, icon: <Hash className="w-4 h-4" /> },
    { label: 'الصيغة', value: currentFont.format.toUpperCase(), icon: <Layers className="w-4 h-4" /> },
    { label: 'عدد الحروف', value: currentFont.glyphCount.toString(), icon: <Hash className="w-4 h-4" /> },
    { label: 'Units Per Em', value: currentFont.unitsPerEm.toString(), icon: <Ruler className="w-4 h-4" /> },
    { label: 'Ascender', value: currentFont.ascender.toString(), icon: <ArrowUp className="w-4 h-4" /> },
    { label: 'Descender', value: currentFont.descender.toString(), icon: <ArrowDown className="w-4 h-4" /> },
    { label: 'حجم الملف', value: `${(currentFont.fileSize / 1024).toFixed(1)} KB`, icon: <Hash className="w-4 h-4" /> },
  ];

  const tableChecks = [
    { label: 'GSUB', has: currentFont.hasGSUB, desc: 'جدول استبدالات الحروف' },
    { label: 'GPOS', has: currentFont.hasGPOS, desc: 'جدول تموضع الحروف' },
    { label: 'cmap', has: currentFont.hasCmap, desc: 'خريطة الأحرف' },
    { label: 'kern', has: currentFont.hasKern, desc: 'تقنين المسافات' },
    { label: 'name', has: currentFont.hasName, desc: 'جدول الأسماء' },
    { label: 'OS/2', has: currentFont.hasOS2, desc: 'معلومات النظام' },
  ];

  const gsubFeatures = detectedFeatures.filter(f => f.tableType === 'GSUB');
  const gposFeatures = detectedFeatures.filter(f => f.tableType === 'GPOS');

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="تحليل الخط" showBack backPage="dashboard" />

      <div className="max-w-5xl mx-auto px-4 pt-6">
        {/* Font Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A86A]/20 to-[#C9A86A]/5 flex items-center justify-center flex-shrink-0">
            <Type className="w-8 h-8 text-[#C9A86A]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{currentFont.fontFamily}</h1>
            <p className="text-sm text-[#8A8A8A] mt-1">
              {currentFont.fontSubfamily} · {currentFont.format.toUpperCase()} · {currentFont.glyphCount} حرف · {detectedFeatures.length} خاصية OpenType
            </p>
          </div>
          <div className="flex gap-2">
            <LuxuryButton
              variant="secondary"
              size="sm"
              onClick={() => setPage('lab')}
              icon={<FlaskConical className="w-4 h-4" />}
            >
              المختبر
            </LuxuryButton>
            <LuxuryButton
              variant="gold"
              size="sm"
              onClick={() => setPage('freeze')}
              icon={<Snowflake className="w-4 h-4" />}
              disabled={selectedFeatures.length === 0}
            >
              تجميد ({selectedFeatures.length})
            </LuxuryButton>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Font Info */}
          <div className="md:col-span-1 space-y-4">
            {/* Font Info */}
            <GlassCard delay={0.1}>
              <h3 className="text-sm font-semibold text-[#C9A86A] mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" />
                معلومات الخط
              </h3>
              <div className="space-y-2">
                {fontInfoItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <span className="text-xs text-[#8A8A8A] flex items-center gap-1.5">
                      {item.icon}
                      {item.label}
                    </span>
                    <span className="text-xs text-white font-mono truncate max-w-[150px]" dir="ltr">{item.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Tables */}
            <GlassCard delay={0.2}>
              <h3 className="text-sm font-semibold text-[#C9A86A] mb-3 flex items-center gap-2">
                <Table2 className="w-4 h-4" />
                الجداول الموجودة
              </h3>
              <div className="space-y-2">
                {tableChecks.map((table, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      {table.has ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#444]" />
                      )}
                      <span className="text-xs font-mono text-white">{table.label}</span>
                    </div>
                    <span className="text-[10px] text-[#666]">{table.desc}</span>
                  </div>
                ))}
              </div>
              {currentFont.tables.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                  <p className="text-[10px] text-[#555] mb-1">كل الجداول:</p>
                  <p className="text-[10px] text-[#666] font-mono break-all" dir="ltr">
                    {currentFont.tables.join(', ')}
                  </p>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Right: Features */}
          <div className="md:col-span-2">
            <GlassCard delay={0.3} padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#C9A86A] flex items-center gap-2">
                  <Snowflake className="w-4 h-4" />
                  خصائص OpenType المكتشفة ({detectedFeatures.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllFeatures}
                    className="text-[10px] px-2 py-1 rounded-lg bg-[rgba(255,255,255,0.04)] text-[#8A8A8A] hover:text-white transition-colors"
                  >
                    تحديد الكل
                  </button>
                  <button
                    onClick={clearSelectedFeatures}
                    className="text-[10px] px-2 py-1 rounded-lg bg-[rgba(255,255,255,0.04)] text-[#8A8A8A] hover:text-white transition-colors"
                  >
                    إلغاء الكل
                  </button>
                </div>
              </div>

              {detectedFeatures.length === 0 ? (
                <div className="text-center py-12">
                  <XCircle className="w-12 h-12 text-[#333] mx-auto mb-3" />
                  <p className="text-[#8A8A8A]">لم يتم العثور على خصائص OpenType في هذا الخط</p>
                </div>
              ) : (
                <>
                  {/* GSUB Features */}
                  {gsubFeatures.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-[#666] mb-3">
                        GSUB — استبدالات الحروف ({gsubFeatures.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {gsubFeatures.map((feature) => (
                          <FeaturePill
                            key={feature.tag}
                            feature={feature}
                            selected={selectedFeatures.includes(feature.tag)}
                            onToggle={toggleFeature}
                            showDetails={false}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GPOS Features */}
                  {gposFeatures.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-[#666] mb-3">
                        GPOS — تموضع الحروف ({gposFeatures.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {gposFeatures.map((feature) => (
                          <FeaturePill
                            key={feature.tag}
                            feature={feature}
                            selected={selectedFeatures.includes(feature.tag)}
                            onToggle={toggleFeature}
                            showDetails={false}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-[#555] mt-3">
                        ⚠ خصائص GPOS (التموضع) لا يمكن تجميدها لأنها قواعد تحديد مواقع وليست استبدالات.
                      </p>
                    </div>
                  )}

                  {/* Selected count */}
                  {selectedFeatures.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between"
                    >
                      <p className="text-sm text-[#D8D8D8]">
                        تم اختيار <span className="text-[#C9A86A] font-bold">{selectedFeatures.length}</span> خصائص للتجميد
                      </p>
                      <LuxuryButton
                        variant="gold"
                        size="sm"
                        onClick={() => setPage('freeze')}
                        icon={<Snowflake className="w-4 h-4" />}
                      >
                        تجميد الخصائص
                      </LuxuryButton>
                    </motion.div>
                  )}
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
