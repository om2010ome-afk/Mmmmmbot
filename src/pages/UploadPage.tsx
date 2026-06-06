import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileType, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TopHeader } from '../components/TopHeader';
import { GlassCard } from '../components/GlassCard';
import { analyzeFont, createFontPreviewUrl } from '../engine/FontAnalyzer';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_EXTENSIONS = ['.ttf', '.otf'];


// Magic bytes for TTF and OTF
const TTF_MAGIC = [0x00, 0x01, 0x00, 0x00];
const OTF_MAGIC = [0x4F, 0x54, 0x54, 0x4F]; // OTTO
const TTC_MAGIC = [0x74, 0x74, 0x63, 0x66]; // ttcf

function checkMagicBytes(buffer: ArrayBuffer): boolean {
  const view = new Uint8Array(buffer.slice(0, 4));
  const matchesTTF = TTF_MAGIC.every((b, i) => view[i] === b);
  const matchesOTF = OTF_MAGIC.every((b, i) => view[i] === b);
  const matchesTTC = TTC_MAGIC.every((b, i) => view[i] === b);
  return matchesTTF || matchesOTF || matchesTTC;
}

export const UploadPage: React.FC = () => {
  const { setPage, addFont, setCurrentFont, setDetectedFeatures, setFontPreviewUrl } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = async (file: File): Promise<string | null> => {
    // Check extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return 'هذا الملف غير مدعوم. يرجى رفع ملف بصيغة TTF أو OTF فقط.';
    }

    // Check size
    if (file.size > MAX_FILE_SIZE) {
      return `حجم الملف كبير جدًا. الحد الأقصى هو ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
    }

    // Check magic bytes
    const buffer = await file.arrayBuffer();
    if (!checkMagicBytes(buffer)) {
      return 'هذا الملف لا يبدو كملف خط صالح. تحقق من أنه ملف TTF أو OTF حقيقي.';
    }

    return null;
  };

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      // Validate
      setProcessingStage('جاري التحقق من الملف...');
      const validationError = await validateFile(file);
      if (validationError) {
        setError(validationError);
        setIsProcessing(false);
        return;
      }

      // Analyze
      setProcessingStage('جاري تحليل الخط...');
      const { fontInfo, features } = await analyzeFont(file);

      // Create preview URL
      const previewUrl = createFontPreviewUrl(file);

      // Update store
      addFont(fontInfo);
      setCurrentFont(fontInfo);
      setDetectedFeatures(features);
      setFontPreviewUrl(previewUrl);

      setProcessingStage('تم التحليل بنجاح!');
      
      // Navigate to analysis
      setTimeout(() => {
        setIsProcessing(false);
        setPage('analysis');
      }, 800);
    } catch (err: any) {
      console.error('Font analysis error:', err);
      setError('حدث خطأ أثناء تحليل الخط. تأكد من أن الملف غير تالف.');
      setIsProcessing(false);
    }
  }, [addFont, setCurrentFont, setDetectedFeatures, setFontPreviewUrl, setPage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="min-h-screen bg-[#050505] pb-24 md:pb-8">
      <TopHeader title="رفع خط" showBack backPage="dashboard" />

      <div className="max-w-2xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-2">ارفع خطك</h1>
          <p className="text-[#8A8A8A] text-sm">ارفع ملف خط TTF أو OTF لتحليله واستخراج خصائص OpenType</p>
        </motion.div>

        {/* Upload Area */}
        <GlassCard delay={0.2} padding="none">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className={`
              relative flex flex-col items-center justify-center p-12 md:p-16 rounded-2xl cursor-pointer transition-all duration-300
              border-2 border-dashed
              ${isDragging
                ? 'border-[#C9A86A] bg-[rgba(201,168,106,0.05)]'
                : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.02)]'
              }
              ${isProcessing ? 'pointer-events-none' : ''}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".ttf,.otf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full border-3 border-[rgba(255,255,255,0.08)] border-t-[#C9A86A] mb-6"
                    style={{ borderWidth: '3px' }}
                  />
                  <p className="text-[#C9A86A] font-medium mb-2">{processingStage}</p>
                  <p className="text-[#666] text-sm">يرجى الانتظار...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    isDragging ? 'bg-[rgba(201,168,106,0.15)]' : 'bg-[rgba(255,255,255,0.04)]'
                  }`}>
                    <Upload className={`w-8 h-8 ${isDragging ? 'text-[#C9A86A]' : 'text-[#666]'}`} />
                  </div>
                  <p className="text-white font-medium mb-2">
                    {isDragging ? 'أفلت الملف هنا' : 'اسحب الملف وأفلته هنا'}
                  </p>
                  <p className="text-[#666] text-sm mb-4">أو اضغط لاختيار ملف</p>
                  <div className="flex items-center gap-2 text-[#555] text-xs">
                    <FileType className="w-4 h-4" />
                    <span>.ttf .otf · الحد الأقصى 25MB</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 flex-1">{error}</p>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-3"
        >
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#8A8A8A]">يتم تحليل ملفات الخط محليًا في متصفحك — لا يتم رفعها إلى أي خادم</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#8A8A8A]">يدعم جميع خطوط TrueType (TTF) وخطوط OpenType (OTF)</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#8A8A8A]">تأكد من أن لديك حق تعديل الخط الذي ترفعه</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
