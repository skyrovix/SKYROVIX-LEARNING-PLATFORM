import React, { useState, useRef } from 'react';
import { usePlatform, UserProfileData } from '../../context/PlatformContext';
import { brandImages, developerAvatars, defaultStudentAvatar } from '../../assets/brandImages';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Building2,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Award,
  ShieldCheck,
  Check,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Clock,
  Layers,
  QrCode,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const PRESET_AVATARS = developerAvatars;

interface EditProfilePageProps {
  onBackToOverview: () => void;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({ onBackToOverview }) => {
  const { currentUser, setCurrentUser, updateUserProfile, userXP, streakDays } = usePlatform();

  // Helper to filter out any mock dummy text
  const cleanField = (val?: string, mockVal?: string) => {
    if (!val || val === mockVal) return '';
    return val;
  };

  // Helper to ensure cartoon/illustrated avatar instead of real Unsplash photos
  const cleanAvatar = (url?: string) => {
    if (!url || url.includes('unsplash.com')) {
      return defaultStudentAvatar;
    }
    return url;
  };

  // Local form state: ONLY real user data, everything else completely blank by default
  const [formData, setFormData] = useState<Partial<UserProfileData>>(() => ({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    certificateName: currentUser?.certificateName || currentUser?.name || '',
    headline: cleanField(currentUser?.headline, 'Aspiring Full Stack Engineer | React & Cloud Architect'),
    bio: (currentUser?.bio && !currentUser.bio.includes('Passionate software developer exploring scalable frontend architectures')) ? currentUser.bio : '',
    phone: cleanField(currentUser?.phone, '+91 98765 43210'),
    avatar: cleanAvatar(currentUser?.avatar),
    college: cleanField(currentUser?.college, 'Skyrovix Engineering Institute'),
    degree: cleanField(currentUser?.degree, 'B.E. Computer Science & Engineering'),
    gradYear: currentUser?.gradYear || '',
    track: currentUser?.track || '',
    experienceLevel: currentUser?.experienceLevel || undefined,
    github: cleanField(currentUser?.github, 'https://github.com/hariharan'),
    linkedin: cleanField(currentUser?.linkedin, 'https://linkedin.com/in/hariharan'),
    website: cleanField(currentUser?.website, 'https://hariharan.dev'),
    twitter: cleanField(currentUser?.twitter, '@hariharan_dev'),
    weeklyGoalHours: currentUser?.weeklyGoalHours || undefined
  }));

  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof UserProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Real-time synchronization to platform context so the sidebar, navbar, and ID card update LIVE
    if (setCurrentUser) {
      setCurrentUser(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  // Handle local image upload via file reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('Please upload an image smaller than 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handleChange('avatar', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = () => {
    if (customAvatarUrl.trim()) {
      handleChange('avatar', customAvatarUrl.trim());
      setCustomAvatarUrl('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateUserProfile(formData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Discard all unsaved edits and reset to saved profile?')) {
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        certificateName: currentUser?.certificateName || currentUser?.name || '',
        headline: cleanField(currentUser?.headline, 'Aspiring Full Stack Engineer | React & Cloud Architect'),
        bio: (currentUser?.bio && !currentUser.bio.includes('Passionate software developer exploring scalable frontend architectures')) ? currentUser.bio : '',
        phone: cleanField(currentUser?.phone, '+91 98765 43210'),
        avatar: cleanAvatar(currentUser?.avatar),
        college: cleanField(currentUser?.college, 'Skyrovix Engineering Institute'),
        degree: cleanField(currentUser?.degree, 'B.E. Computer Science & Engineering'),
        gradYear: currentUser?.gradYear || '',
        track: currentUser?.track || '',
        experienceLevel: currentUser?.experienceLevel || undefined,
        github: cleanField(currentUser?.github, 'https://github.com/hariharan'),
        linkedin: cleanField(currentUser?.linkedin, 'https://linkedin.com/in/hariharan'),
        website: cleanField(currentUser?.website, 'https://hariharan.dev'),
        twitter: cleanField(currentUser?.twitter, '@hariharan_dev'),
        weeklyGoalHours: currentUser?.weeklyGoalHours || undefined
      });
    }
  };

  const studentLevel = Math.floor(userXP / 200) + 1;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToOverview}
              className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#FF5A36] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Dashboard Overview</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-900">Student Profile</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Edit Student Profile</span>
            <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 tracking-wider">
              Active Learner
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            Personalize your account details, legal certificate name, developer bio, and learning goals.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-all flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            <span>Discard</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#FF5A36] hover:bg-[#E04826] shadow-sm shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check size={14} />
            ) : (
              <Sparkles size={14} />
            )}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT 8 COLS: FORM FIELDS ================= */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. AVATAR PICKER CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF5A36]">
                <ImageIcon size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Profile Picture & Identity</h3>
                <p className="text-[11px] text-slate-500">Choose a developer avatar, upload your own photo, or enter a direct image URL.</p>
              </div>
            </div>

            {/* Current Avatar + Upload CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="relative shrink-0">
                <img
                  src={formData.avatar}
                  alt={formData.name || 'Avatar'}
                  className="w-20 h-20 rounded-2xl border-2 border-emerald-500 object-cover shadow-sm bg-white"
                  onError={(e) => {
                    // Fallback if URL is invalid
                    (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
                  }}
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="text-xs font-bold text-slate-900">{formData.name}</div>
                <div className="text-[11px] text-slate-500">Recommended size: 400x400 square (JPG, PNG or WebP under 3MB)</div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Upload size={13} className="text-[#FF5A36]" />
                    <span>Upload Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('avatar', PRESET_AVATARS[0].url)}
                    className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Reset Default
                  </button>
                </div>
              </div>
            </div>

            {/* Preset Avatars Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">Choose an Illustrated Developer Avatar</label>
                <span className="text-[10px] text-slate-400 font-medium">8 Cartoon / Vector Styles</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {PRESET_AVATARS.map((av) => {
                  const isSelected = formData.avatar === av.url;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => handleChange('avatar', av.url)}
                      className={`cursor-pointer group relative rounded-2xl overflow-hidden border-2 transition-all p-1 bg-slate-50 ${
                        isSelected
                          ? 'border-[#FF5A36] ring-2 ring-orange-500/20 scale-105 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 hover:scale-102'
                      }`}
                      title={av.label}
                    >
                      <img src={av.url} alt={av.label} className="w-full aspect-square rounded-xl object-contain" />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#FF5A36] text-white rounded-full flex items-center justify-center shadow-xs">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Image URL input */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-600 block">Or paste custom image link</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/my-avatar.png"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  disabled={!customAvatarUrl.trim()}
                  className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-black disabled:opacity-40 transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* 2. BASIC PERSONAL & CERTIFICATE DETAILS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <User size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Personal & Certificate Credentials</h3>
                <p className="text-[11px] text-slate-500">Information used across the workspace and engraved onto certificates.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User size={12} className="text-slate-400" />
                  <span>Display Name <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Hariharan S"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] font-medium"
                />
                <span className="text-[10px] text-slate-400">Used for greetings, reviews, and community comments.</span>
              </div>

              {/* Certificate Legal Name (Crucial for Certificates) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Award size={12} className="text-[#FF5A36]" />
                  <span>Certificate Legal Name <span className="text-[#FF5A36]">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.certificateName || ''}
                  onChange={(e) => handleChange('certificateName', e.target.value)}
                  placeholder="Full Legal Name for Certificates"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-orange-300 bg-orange-50/20 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] font-bold text-slate-900"
                />
                <span className="text-[10px] text-orange-600 font-medium flex items-center gap-1">
                  <ShieldCheck size={11} />
                  <span>This exact name will be printed on all your MSME verified certificates.</span>
                </span>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-400" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email || ''}
                    disabled
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-400" />
                  <span>Phone Number / WhatsApp</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] font-medium"
                />
              </div>
            </div>

            {/* Professional Headline */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase size={12} className="text-slate-400" />
                <span>Professional Headline / Role</span>
              </label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="e.g. Full Stack Developer | React, Node.js & Cloud Systems"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] font-medium"
              />
            </div>

            {/* Bio / About */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">About Me / Bio</label>
                <span className="text-[10px] text-slate-400">{(formData.bio || '').length}/300</span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={formData.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Write a brief overview of your technical background, current learning goals, and projects..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* 3. ACADEMIC & EDUCATION BACKGROUND */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <GraduationCap size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Academic & Career Details</h3>
                <p className="text-[11px] text-slate-500">Your institution, graduation year, and primary engineering specialization.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* College / Institution */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 size={12} className="text-slate-400" />
                  <span>College / University / Company</span>
                </label>
                <input
                  type="text"
                  value={formData.college || ''}
                  onChange={(e) => handleChange('college', e.target.value)}
                  placeholder="e.g. Anna University, Chennai"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36]"
                />
              </div>

              {/* Degree / Branch */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap size={12} className="text-slate-400" />
                  <span>Degree & Major</span>
                </label>
                <input
                  type="text"
                  value={formData.degree || ''}
                  onChange={(e) => handleChange('degree', e.target.value)}
                  placeholder="e.g. B.E. Computer Science"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36]"
                />
              </div>

              {/* Graduation Year */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar size={12} className="text-slate-400" />
                  <span>Graduation Year</span>
                </label>
                <select
                  value={formData.gradYear || ''}
                  onChange={(e) => handleChange('gradYear', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] bg-white cursor-pointer font-medium"
                >
                  <option value="">-- Select Graduation Year --</option>
                  <option value="2024">2024 (Graduated)</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
              </div>

              {/* Primary Learning Track */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers size={12} className="text-slate-400" />
                  <span>Primary Learning Track</span>
                </label>
                <select
                  value={formData.track || ''}
                  onChange={(e) => handleChange('track', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] bg-white cursor-pointer font-medium"
                >
                  <option value="">-- Select Primary Track --</option>
                  <option value="Full Stack Web Architecture">Full Stack Web Architecture</option>
                  <option value="Frontend Development">Frontend Development (React & Next.js)</option>
                  <option value="Backend & Cloud Systems">Backend & Cloud Systems (Node & SQL)</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Python Programming">Python Programming Mastery</option>
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-slate-700 block">Experience Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => {
                  const isSelected = formData.experienceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleChange('experienceLevel', lvl)}
                      className={`cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        isSelected
                          ? 'bg-[#14171F] text-white border-[#14171F] shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. DEVELOPER LINKS & PORTFOLIO */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Globe size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Developer & Social Profiles</h3>
                <p className="text-[11px] text-slate-500">Connect your public developer portfolios, repositories, and socials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Github size={12} className="text-slate-600" />
                  <span>GitHub Profile</span>
                </label>
                <input
                  type="url"
                  value={formData.github || ''}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Linkedin size={12} className="text-[#0A66C2]" />
                  <span>LinkedIn Profile</span>
                </label>
                <input
                  type="url"
                  value={formData.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Globe size={12} className="text-[#FF5A36]" />
                  <span>Portfolio Website</span>
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Twitter size={12} className="text-sky-500" />
                  <span>Twitter / X Handle</span>
                </label>
                <input
                  type="text"
                  value={formData.twitter || ''}
                  onChange={(e) => handleChange('twitter', e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5A36] font-mono"
                />
              </div>
            </div>
          </div>

          {/* 5. LEARNING GOALS & PREFERENCES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Weekly Learning Commitment</h3>
                <p className="text-[11px] text-slate-500">Set your weekly pace to stay consistent and maintain your streak.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { hours: 5, label: 'Casual Pace', desc: '5 hrs / week' },
                { hours: 10, label: 'Dedicated Sprint', desc: '10 hrs / week (Recommended)' },
                { hours: 20, label: 'Intensive Bootcamp', desc: '20 hrs / week' }
              ].map((g) => {
                const isSelected = formData.weeklyGoalHours === g.hours;
                return (
                  <button
                    key={g.hours}
                    type="button"
                    onClick={() => handleChange('weeklyGoalHours', g.hours)}
                    className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#FF5A36] bg-orange-50/40 ring-1 ring-[#FF5A36]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-slate-900">{g.label}</div>
                    <div className="text-[11px] text-[#FF5A36] font-bold mt-0.5">{g.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="p-4 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">All changes are saved instantly</div>
                <div className="text-[11px] text-slate-400">Your certificates, sidebar, and workspace update in real time.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="cursor-pointer flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FF5A36] hover:bg-[#E04826] shadow-md shadow-orange-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                <span>{isSaving ? 'Updating...' : 'Save Profile'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT 4 COLS: LIVE DIGITAL STUDENT ID PREVIEW ================= */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* DIGITAL STUDENT CREDENTIAL CARD */}
          <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden space-y-5">
            {/* Background Holographic Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#FF5A36]/30 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Row: Skyrovix Student Card Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <img src={brandImages.logoWhite} alt="Skyrovix" className="h-5 w-auto object-contain" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">| STUDENT ID</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                VERIFIED
              </span>
            </div>

            {/* Student Avatar & Basic Info */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative shrink-0">
                <img
                  src={formData.avatar}
                  alt={formData.name || 'Student'}
                  className="w-16 h-16 rounded-2xl border-2 border-[#FF5A36] object-cover bg-slate-800"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-black text-white truncate leading-tight">
                  {formData.name || 'Student Name'}
                </div>
                <div className="text-[11px] font-mono text-[#FF5A36] truncate mt-0.5 font-bold">
                  {formData.headline || 'Student Learner'}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {formData.college || 'College / University'}
                </div>
              </div>
            </div>

            {/* Key Student Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center relative z-10">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Level</div>
                <div className="text-xs font-black text-amber-400 mt-0.5">Lvl {studentLevel}</div>
              </div>
              <div className="border-x border-white/10">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Total XP</div>
                <div className="text-xs font-black text-[#FF5A36] mt-0.5">{userXP.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Streak</div>
                <div className="text-xs font-black text-emerald-400 mt-0.5">{streakDays}d 🔥</div>
              </div>
            </div>

            {/* Certificate Legal Name Badge */}
            <div className="p-3 rounded-2xl bg-orange-950/40 border border-orange-500/30 space-y-1 relative z-10">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400 uppercase tracking-wide">
                <Award size={12} />
                <span>Certificate Name</span>
              </div>
              <div className="text-xs font-black text-white font-mono tracking-wide">
                {formData.certificateName || formData.name || 'Your Legal Name'}
              </div>
            </div>

            {/* Card Footer: Student ID & QR */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono relative z-10">
              <div>
                <div className="text-[8px] text-slate-500 uppercase">Registration ID</div>
                <div className="text-white font-bold tracking-wider">
                  SKY-STU-{(currentUser?.id || '2026').slice(-6).toUpperCase()}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0">
                <QrCode size={26} className="text-slate-900" />
              </div>
            </div>
          </div>

          {/* Quick Helper Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>Certificate Assurance</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Whenever you complete 100% of any video or text course, your certificate will automatically be issued with your chosen <strong>Certificate Legal Name</strong> and verified against Government MSME standards.
            </p>
          </div>

        </div>

      </form>
    </div>
  );
};

