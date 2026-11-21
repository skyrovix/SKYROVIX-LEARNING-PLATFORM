import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  Eye,
  FileText,
  CreditCard,
  UserCheck,
  CheckCircle2,
  Mail,
  Building,
  Scale,
  Calendar,
  Globe
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setCurrentView } = usePlatform();

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-100/80">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Legal</span>
            <span>/</span>
            <span className="text-[#FB4400] font-bold">Privacy Policy</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <ShieldCheck size={14} />
              <span>COMPLIANCE & DATA PROTECTION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              At <strong>Skyrovix Learning Platform</strong>, we respect your privacy and are committed to safeguarding your personal information, learning records, and transaction security.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#FB4400]" />
                Effective Date: November 2026
              </span>
              <span>•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                DPDP Act (India) & IT Act Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Legal Content Document */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">

          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building size={18} className="text-[#FB4400]" />
              <span>1. Corporate Information & Scope</span>
            </h2>
            <p>
              This Privacy Policy applies to the official <strong>Skyrovix Learning Platform</strong> (operating via <code>skyrovix.in</code> and official application endpoints), an MSME-registered technical education enterprise registered in Chennai, Tamil Nadu, India.
            </p>
            <p>
              By accessing our platform, enrolling in our video masterclasses, completing text documentation courses, using our interactive in-browser code sandboxes, or generating course completion certificates, you agree to the collection and handling of your information as outlined herein.
            </p>
          </section>

          {/* Section 2: Cashfree Payment Processing */}
          <section className="space-y-3 bg-orange-50/50 border border-orange-200/80 rounded-2xl p-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard size={18} className="text-[#FB4400]" />
              <span>2. Secure Payment Gateway (Cashfree Payments)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              All financial transactions for paid video masterclasses (including our ₹299 Flagship Full Stack Track and ₹99 Video Passes) are processed exclusively through <strong>Cashfree Payments India Private Limited</strong>, an RBI-authorized Payment Aggregator.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-orange-100 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Card Storage:</strong> Skyrovix never receives, stores, or logs your credit/debit card numbers, CVV codes, or banking PINs.
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-orange-100 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>PCI-DSS Level 1:</strong> Cashfree processes UPI, NetBanking, RuPay, Visa, and Mastercard with bank-grade 256-bit encryption.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              For any payment inquiries or authorization questions, Cashfree's terms of service and privacy standards operate in tandem with our platform security protocols.
            </p>
          </section>

          {/* Section 3: Data We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <UserCheck size={18} className="text-[#FB4400]" />
              <span>3. Information We Collect</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>Student Account Details:</strong> Name, verified email address, chosen avatar, user role, and developer profile information.
              </li>
              <li>
                <strong>Certificate Legal Identity:</strong> The legal recipient name provided by you specifically for indelible engraving onto digital certificates and QR-code verification records.
              </li>
              <li>
                <strong>Learning Activity & Analytics:</strong> Watched video progress, completed chapters, quiz scores, accumulated XP points, study streak days, and bookmarked lessons.
              </li>
              <li>
                <strong>Code Sandbox Logs:</strong> Execution results and scripts run in the in-browser coding playground (used solely for immediate evaluation and code output streaming).
              </li>
              <li>
                <strong>Technical Diagnostics:</strong> IP address, browser type, operating system, and session timestamps to prevent unauthorized multi-device account sharing.
              </li>
            </ul>
          </section>

          {/* Section 4: How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Eye size={18} className="text-[#FB4400]" />
              <span>4. How We Use Your Information</span>
            </h2>
            <p>
              We use your information exclusively to deliver a world-class technical education experience, specifically:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Course Progression</strong>
                Tracking your completed video lectures, interactive text chapters, and practice quizzes.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Certificate Issuance</strong>
                Generating tamper-evident certificates with verifiable cryptographic serial numbers.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Cashfree Transaction Audit</strong>
                Verifying enrollment purchase legitimacy and administering our tiered refund policy.
              </div>
            </div>
          </section>

          {/* Section 5: Data Sharing & Protection */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock size={18} className="text-[#FB4400]" />
              <span>5. Data Protection & No-Sale Pledge</span>
            </h2>
            <p>
              <strong>We never sell, rent, or trade your personal information</strong> to third-party advertisers or lead-generation brokers.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              We only share relevant operational information with verified infrastructure partners who assist in platform delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Cashfree Payments:</strong> To authorize enrollment payments and return eligible refunds.</li>
              <li><strong>Supabase Cloud:</strong> Encrypted PostgreSQL database storage with Row-Level Security (RLS).</li>
              <li><strong>Government & Regulatory Authorities:</strong> Only when strictly mandated by law or court order under Indian jurisdiction.</li>
            </ul>
          </section>

          {/* Section 6: Cookies & Local Storage */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText size={18} className="text-[#FB4400]" />
              <span>6. Local Storage & Cookie Notice</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We utilize modern browser <code>localStorage</code> to maintain your active login session, your in-progress resume builder draft, sandbox code drafts, and preferred UI settings so your work is never lost across browser refreshes. You may clear your local browser storage at any time via your browser settings.
            </p>
          </section>

          {/* Section 7: Grievance Officer & Contact */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Mail size={18} className="text-[#FB4400]" />
              <span>7. Grievance Officer & Contact Details</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              In accordance with the Information Technology Act 2000 and the Digital Personal Data Protection Act, 2023, the details of our Grievance Officer are provided below:
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
              <div><strong>Entity:</strong> Skyrovix Engineering Academy (MSME Registered)</div>
              <div><strong>Grievance Email:</strong> <a href="mailto:support@skyrovix.in" className="text-[#FB4400] underline font-bold">support@skyrovix.in</a></div>
              <div><strong>Payment Disputes:</strong> <a href="mailto:billing@skyrovix.in" className="text-[#FB4400] underline font-bold">billing@skyrovix.in</a></div>
              <div><strong>Registered Address:</strong> Chennai, Tamil Nadu - 600001, India</div>
              <div><strong>Response Window:</strong> Within 48 business hours</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

