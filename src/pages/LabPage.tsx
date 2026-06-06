import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw, Columns2, Minus, Plus,
  AlignRight, AlignLeft, Snowflake, FlaskConical
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';

export const LabPage: React.FC = () => {
  const {
    currentFont, fontPreviewUrl, detectedFeatures, selectedFeatures, toggleFeature,
    labText, labFontSize, labLineHeight, labLetterSpacing, labDirection,
    labTextColor, labBgColor,
    setLabText, setLabFontSize, setLabLineHeight, setLabLetterSpacing,
    setLabDirection, setLabTextColor, setLabBgColor,
    setPage
  } = useStore();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const fontFaceRef = useRef<string>('PreviewFont');

  // Load font face
  useEffect(() => {
    if (fontPreviewUrl && currentFont) {
      const fontName = 'PreviewFont_' + currentFont.id;
      fontFaceRef.current = fontName;
      
      const fontFace = new FontFace(fontName, `url(${fontPreviewUrl})`);
      fontFace.load().then((loaded) => {
        document.fonts.add(loaded);
        setFontLoaded(true);
      }).catch(err => {
        console.error('Font loading error:', err);
      });
    }
  }, [fontPreviewUrl, currentFont]);

  if (!currentFont) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <FlaskConical className="w-12 h-12 text-[#333] mx-auto mb-4" />
          <p className="text-[#8A8A8A] mb-4">لم يتم اختيار خط. ارفع خطًا أولاً.</p>
          <LuxuryButton variant="gold" onClick={() => setPage('upload')}>رفع خط</LuxuryButton>
        </div>
      </div>
    );
  }

  // Build CSS font-feature-settings
  const activeFeatures = selectedFeatures.map(f => `"${f}" 1`).join(', ');
  const inactiveFeatures = selectedFeatures.map(f => `"${f}" 0`).join(', ') || 'normal';

  const previewStyle: React.CSSProperties = {
    fontFamily: fontFaceRef.current,
    fontSize: `${labFontSize}px`,
    lineHeight: labLineHeight,
    letterSpacing: `${labLetterSpacing}px`,
    direction: labDirection,
    color: labTextColor,
    fontFeatureSettings: activeFeatures || 'normal',
  };

  const originalStyle: React.CSSProperties = {
    ...previewStyle,
    fontFeatureSettings: inactiveFeatures,
  };

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="مختبر الخط" showBack backPage="analysis" />

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="md:col-span-1 space-y-4">
            <GlassCard delay={0.1}>
              <h3 className="text-sm font-semibold text-[#C9A86A] mb-4">إعدادات المعاينة</h3>
              
              {/* Font size */}
              <div className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-2 block">حجم الخط: {labFontSize}px</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLabFontSize(Math.max(12, labFontSize - 4))} className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] text-[#888] hover:text-white">
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="range"
                    min="12" max="120" value={labFontSize}
                    onChange={(e) => setLabFontSize(Number(e.target.value))}
                    className="flex-1 accent-[#C9A86A] h-1"
                  />
                  <button onClick={() => setLabFontSize(Math.min(120, labFontSize + 4))} className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] text-[#888] hover:text-white">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Line height */}
              <div className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-2 block">ارتفاع السطر: {labLineHeight.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.8" max="3" step="0.1" value={labLineHeight}
                  onChange={(e) => setLabLineHeight(Number(e.target.value))}
                  className="w-full accent-[#C9A86A] h-1"
                />
              </div>

              {/* Letter spacing */}
              <div className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-2 block">تباعد الأحرف: {labLetterSpacing}px</label>
                <input
                  type="range"
                  min="-5" max="20" value={labLetterSpacing}
                  onChange={(e) => setLabLetterSpacing(Number(e.target.value))}
                  className="w-full accent-[#C9A86A] h-1"
                />
              </div>

              {/* Direction */}
              <div className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-2 block">اتجاه النص</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLabDirection('rtl')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                      labDirection === 'rtl' ? 'bg-[rgba(201,168,106,0.15)] text-[#C9A86A] border border-[#C9A86A]/30' : 'bg-[rgba(255,255,255,0.04)] text-[#888] border border-transparent'
                    }`}
                  >
                    <AlignRight className="w-3 h-3" />
                    RTL
                  </button>
                  <button
                    onClick={() => setLabDirection('ltr')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                      labDirection === 'ltr' ? 'bg-[rgba(201,168,106,0.15)] text-[#C9A86A] border border-[#C9A86A]/30' : 'bg-[rgba(255,255,255,0.04)] text-[#888] border border-transparent'
                    }`}
                  >
                    <AlignLeft className="w-3 h-3" />
                    LTR
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-4 flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-[#8A8A8A] mb-2 block">لون النص</label>
                  <input
                    type="color"
                    value={labTextColor}
                    onChange={(e) => setLabTextColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#8A8A8A] mb-2 block">الخلفية</label>
                  <input
                    type="color"
                    value={labBgColor}
                    onChange={(e) => setLabBgColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setLabFontSize(48);
                    setLabLineHeight(1.6);
                    setLabLetterSpacing(0);
                    setLabDirection('rtl');
                    setLabTextColor('#FFFFFF');
                    setLabBgColor('#0B0B0F');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs bg-[rgba(255,255,255,0.04)] text-[#888] hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  إعادة ضبط
                </button>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all ${
                    showComparison ? 'bg-[rgba(201,168,106,0.15)] text-[#C9A86A]' : 'bg-[rgba(255,255,255,0.04)] text-[#888] hover:text-white'
                  }`}
                >
                  <Columns2 className="w-3 h-3" />
                  مقارنة
                </button>
              </div>
            </GlassCard>

            {/* Features */}
            <GlassCard delay={0.2}>
              <h3 className="text-sm font-semibold text-[#C9A86A] mb-3">
                خصائص OpenType ({detectedFeatures.length})
              </h3>
              <p className="text-[10px] text-[#666] mb-3">
                اضغط على الخاصية لتفعيلها في المعاينة. التجميد الحقيقي يتم في مرحلة Generate.
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-64 overflow-y-auto">
                {detectedFeatures.map((feature) => (
                  <button
                    key={feature.tag}
                    onClick={() => toggleFeature(feature.tag)}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-all ${
                      selectedFeatures.includes(feature.tag)
                        ? 'bg-[rgba(201,168,106,0.15)] text-[#C9A86A] border border-[#C9A86A]/30'
                        : 'bg-[rgba(255,255,255,0.04)] text-[#888] border border-transparent hover:border-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    {feature.tag}
                  </button>
                ))}
              </div>
              {selectedFeatures.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <LuxuryButton
                    variant="gold"
                    size="sm"
                    fullWidth
                    onClick={() => setPage('freeze')}
                    icon={<Snowflake className="w-4 h-4" />}
                  >
                    تجميد {selectedFeatures.length} خصائص
                  </LuxuryButton>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Preview Area */}
          <div className="md:col-span-3">
            {/* Text input */}
            <GlassCard delay={0.15} className="mb-4">
              <textarea
                value={labText}
                onChange={(e) => setLabText(e.target.value)}
                placeholder="اكتب نصًا للمعاينة..."
                rows={3}
                dir="auto"
                className="w-full bg-transparent text-white text-sm resize-none outline-none placeholder:text-[#444]"
              />
            </GlassCard>

            {/* Preview */}
            {showComparison ? (
              <div className="grid md:grid-cols-2 gap-4">
                <GlassCard delay={0.2} padding="none">
                  <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-xs text-[#666]">الأصلي (بدون تفعيل)</span>
                  </div>
                  <div
                    className="p-6 min-h-[300px] overflow-auto rounded-b-2xl"
                    style={{ backgroundColor: labBgColor }}
                  >
                    {fontLoaded ? (
                      <div style={originalStyle} className="whitespace-pre-wrap break-words">
                        {labText}
                      </div>
                    ) : (
                      <p className="text-[#555] text-sm">جاري تحميل الخط...</p>
                    )}
                  </div>
                </GlassCard>

                <GlassCard delay={0.25} padding="none">
                  <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-xs text-[#C9A86A]">مع الخصائص المختارة</span>
                  </div>
                  <div
                    className="p-6 min-h-[300px] overflow-auto rounded-b-2xl"
                    style={{ backgroundColor: labBgColor }}
                  >
                    {fontLoaded ? (
                      <div style={previewStyle} className="whitespace-pre-wrap break-words">
                        {labText}
                      </div>
                    ) : (
                      <p className="text-[#555] text-sm">جاري تحميل الخط...</p>
                    )}
                  </div>
                </GlassCard>
              </div>
            ) : (
              <GlassCard delay={0.2} padding="none">
                <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <span className="text-xs text-[#8A8A8A]">
                    المعاينة الحية — {currentFont.fontFamily}
                  </span>
                  {selectedFeatures.length > 0 && (
                    <span className="text-[10px] text-[#C9A86A]">
                      {selectedFeatures.join(', ')}
                    </span>
                  )}
                </div>
                <div
                  className="p-6 md:p-10 min-h-[400px] overflow-auto rounded-b-2xl"
                  style={{ backgroundColor: labBgColor }}
                >
                  {fontLoaded ? (
                    <motion.div
                      key={activeFeatures}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      style={previewStyle}
                      className="whitespace-pre-wrap break-words"
                    >
                      {labText}
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[#555] text-sm">جاري تحميل الخط...</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
