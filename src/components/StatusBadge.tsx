import React from 'react';
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; classes: string }> = {
  uploaded: { label: 'مرفوع', icon: <Clock className="w-3.5 h-3.5" />, classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  analyzing: { label: 'جاري التحليل', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  ready: { label: 'جاهز', icon: <CheckCircle2 className="w-3.5 h-3.5" />, classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  error: { label: 'خطأ', icon: <XCircle className="w-3.5 h-3.5" />, classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
  queued: { label: 'في الانتظار', icon: <Clock className="w-3.5 h-3.5" />, classes: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  processing: { label: 'جاري المعالجة', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, classes: 'bg-[#C9A86A]/10 text-[#C9A86A] border-[#C9A86A]/20' },
  applying: { label: 'تطبيق الاستبدالات', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  rebuilding: { label: 'إعادة البناء', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, classes: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  validating: { label: 'التحقق', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, classes: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
  completed: { label: 'مكتمل', icon: <CheckCircle2 className="w-3.5 h-3.5" />, classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  failed: { label: 'فشل', icon: <XCircle className="w-3.5 h-3.5" />, classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || statusConfig.error;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.classes}`}>
      {config.icon}
      {config.label}
    </span>
  );
};
