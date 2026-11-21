import React from 'react';
import {
  Play,
  Clock,
  BarChart2,
  ArrowRight,
  Layers,
  Code2,
  Cpu,
  Globe,
  Database,
  Sparkles,
  LucideIcon
} from 'lucide-react';

export interface ModernCourseCardProps {
  id?: string;
  title: string;
  description: string;
  banner: string;
  category: string;
  categoryIcon?: LucideIcon;
  lessonsCount: string | number;
  duration: string;
  level: string;
  badge?: string;
  isEnrolled?: boolean;
  progress?: number;
  actionText?: string;
  price?: string;
  originalPrice?: string;
  isFree?: boolean;
  onAction: () => void;
  onClickCard?: () => void;
  accentColor?: string;
}

export const ModernCourseCard: React.FC<ModernCourseCardProps> = ({
  title,
  description,
  banner,
  category,
  categoryIcon: CustomIcon,
  lessonsCount,
  duration,
  level,
  badge,
  isEnrolled = false,
  progress = 0,
  actionText,
  price,
  originalPrice,
  isFree,
  onAction,
  onClickCard,
}) => {
  // Determine Category Style & Icon
  const getCategoryMeta = () => {
    const cat = category.toLowerCase();
    if (cat.includes('dev') || cat.includes('fullstack') || cat.includes('career')) {
      return {
        icon: CustomIcon || Layers,
        badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-purple-200/80',
        iconClass: 'text-[#9333EA]',
        label: category || 'Development'
      };
    }
    if (cat.includes('program') || cat.includes('python') || cat.includes('javascript') || cat.includes('java')) {
      return {
        icon: CustomIcon || Code2,
        badgeClass: 'bg-[#E0F2FE] text-[#0369A1] border border-sky-200/80',
        iconClass: 'text-[#0284C7]',
        label: category || 'Programming'
      };
    }
    if (cat.includes('ai') || cat.includes('intelligence') || cat.includes('machine') || cat.includes('data')) {
      return {
        icon: CustomIcon || Cpu,
        badgeClass: 'bg-[#DCFCE7] text-[#15803D] border border-emerald-200/80',
        iconClass: 'text-[#16A34A]',
        label: category || 'Artificial Intelligence'
      };
    }
    if (cat.includes('front') || cat.includes('web') || cat.includes('html') || cat.includes('css')) {
      return {
        icon: CustomIcon || Globe,
        badgeClass: 'bg-[#FEF3C7] text-[#B45309] border border-amber-200/80',
        iconClass: 'text-[#D97706]',
        label: category || 'Frontend Track'
      };
    }
    if (cat.includes('db') || cat.includes('database') || cat.includes('sql')) {
      return {
        icon: CustomIcon || Database,
        badgeClass: 'bg-[#F1F5F9] text-[#334155] border border-slate-300/80',
        iconClass: 'text-[#475569]',
        label: category || 'Database'
      };
    }
    return {
      icon: CustomIcon || Sparkles,
      badgeClass: 'bg-orange-50 text-[#C23500] border border-orange-200/80',
      iconClass: 'text-[#FF5A36]',
      label: category || 'Technology'
    };
  };

  const catMeta = getCategoryMeta();
  const IconComponent = catMeta.icon;

  const defaultActionText = isEnrolled ? 'Continue' : 'Enroll Now';
  const resolvedActionText = actionText || defaultActionText;

  // Format lessons display
  const formattedLessons = typeof lessonsCount === 'number'
    ? `${lessonsCount}+ Lessons`
    : lessonsCount.includes('Lesson')
    ? lessonsCount
    : `${lessonsCount} Lessons`;

  return (
    <div
      onClick={onClickCard || onAction}
      className="cursor-pointer rounded-3xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group select-none"
    >
      {/* 1. Full-Bleed 16:9 Media Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <img
          src={banner}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-black/20" />

        {/* Floating Top Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-xs">
              {badge}
            </span>
          </div>
        )}

        {/* Floating Top-Right Price Tag */}
        {(price || isFree !== undefined) && (
          <div className="absolute top-3 right-3">
            {isFree || price === 'Free' ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600/90 backdrop-blur-md text-white border border-emerald-400/30 shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                FREE
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black tracking-tight bg-slate-950/85 backdrop-blur-md text-white border border-white/15 shadow-xs flex items-center gap-1.5">
                {originalPrice && (
                  <span className="line-through text-slate-400 text-[10px] font-normal font-mono">
                    {originalPrice}
                  </span>
                )}
                <span className="text-[#FF5A36] font-extrabold">{price}</span>
              </span>
            )}
          </div>
        )}

        {/* Play Icon Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[1px]">
          <div className="w-12 h-12 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play size={18} className="fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* 2. Card Content Anatomy */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category Pill Badge with Icon */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start ${catMeta.badgeClass}`}>
            <IconComponent size={13} className={catMeta.iconClass} />
            <span>{catMeta.label}</span>
          </div>

          {/* Bold Course Title */}
          <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#FF5A36] transition-colors leading-tight line-clamp-1 font-display">
            {title}
          </h4>

          {/* 2-line Clean Subtitle / Description */}
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {description}
          </p>

          {/* Progress Bar (If Enrolled) */}
          {isEnrolled && (
            <div className="pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
                <span>Progress</span>
                <span className="text-[#FF5A36] font-bold">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5A36] to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Footer Meta Row & Pill Enroll Button */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Left Meta Stats */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-slate-800 font-bold">
              <Play size={11} className="fill-current text-slate-800" />
              <span>{formattedLessons}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock size={12} className="text-slate-400" />
              <span>{duration}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <BarChart2 size={12} className="text-slate-400" />
              <span>{level}</span>
            </span>
          </div>

          {/* Right Enroll Button */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onAction();
            }}
            className="cursor-pointer px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF5A36] to-[#FB4400] hover:from-[#FB4400] hover:to-[#E03D00] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>{resolvedActionText}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

