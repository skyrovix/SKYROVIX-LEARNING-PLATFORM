import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  FileText,
  ArrowLeft,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Award,
  Terminal,
  Calendar,
  Lock,
  ExternalLink
} from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            <span className="text-[#FB4400] font-bold">Terms & Conditions</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Scale size={14} />
              <span>STUDENT AGREEMENT & TERMS OF SERVICE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Please read these Terms of Service carefully before enrolling in courses, making payments through Cashfree, or using the Skyrovix platform services.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#FB4400]" />
                Last Updated: November 2026
              </span>
              <span>•</span>
              <span className="text-slate-800 font-bold">
                Binding Legal Contract
              </span>
            </div>
          </div>
        </div>

        {/* Legal Document Content */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">

          {/* Section 1: Acceptance */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 size={18} className="text-[#FB4400]" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p>
              By creating an account, accessing course videos, executing code in our web sandbox, or processing enrollment transactions, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our accompanying <button onClick={() => setCurrentView('privacy-policy')} className="text-[#FB4400] font-bold underline cursor-pointer">Privacy Policy</button> and <button onClick={() => setCurrentView('refund-policy')} className="text-[#FB4400] font-bold underline cursor-pointer">Refund & Cancellation Policy</button>.
            </p>
          </section>

          {/* Section 2: Account Responsibilities */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock size={18} className="text-[#FB4400]" />
              <span>2. Student Accounts & Identity Verification</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>One User Per Account:</strong> Your enrollment license is strictly non-transferable and personal to you. Account sharing, credential reselling, or concurrent multi-IP streaming is prohibited and will trigger immediate account suspension.
              </li>
              <li>
                <strong>Certificate Legal Name:</strong> You are responsible for ensuring that the Certificate Legal Name entered in your Student Profile matches your official government ID. Once a certificate is minted and recorded in our cryptographic registry, name modifications require administrative identity verification.
              </li>
              <li>
                <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your credentials. Notify us immediately if you suspect unauthorized access.
              </li>
            </ul>
          </section>

          {/* Section 3: Course Pricing & Cashfree Payments */}
          <section className="space-y-3 bg-orange-50/50 border border-orange-200/80 rounded-2xl p-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard size={18} className="text-[#FB4400]" />
              <span>3. Course Pricing & Cashfree Payment Processing</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Skyrovix operates an upfront, honest pricing model with lifetime curriculum access:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-orange-100">
                <span className="text-[10px] font-extrabold text-[#FB4400] uppercase block">FLAGSHIP MASTERCLASS</span>
                <span className="text-lg font-black text-slate-900">₹299</span>
                <p className="text-[11px] text-slate-500 mt-1">Full Stack Career Track with 80 comprehensive lectures, 3 capstones, and lifetime updates.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-orange-100">
                <span className="text-[10px] font-extrabold text-[#FB4400] uppercase block">INDIVIDUAL VIDEO PASSES</span>
                <span className="text-lg font-black text-slate-900">₹99</span>
                <p className="text-[11px] text-slate-500 mt-1">Specialized masterclasses (React 19, Node.js, Database SQL, Next.js 15, CSS3, etc.).</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-orange-100">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">TEXT DOCUMENTATION</span>
                <span className="text-lg font-black text-emerald-600">100% FREE</span>
                <p className="text-[11px] text-slate-500 mt-1">All 12 documentation tracks containing 435 chapters with sandbox execution are forever free.</p>
              </div>
            </div>
            <div className="pt-2 text-xs text-slate-600 space-y-1">
              <p>
                <strong>Payment Method:</strong> All domestic and international payments are securely executed through <strong>Cashfree Payments</strong> (supporting UPI, Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, NetBanking, and EMI).
              </p>
              <p>
                All prices are denominated in Indian Rupees (INR) and are inclusive of applicable goods and services taxes unless explicitly noted.
              </p>
            </div>
          </section>

          {/* Section 4: Refund & Cancellation Policy Summary */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck size={18} className="text-[#FB4400]" />
              <span>4. Refund Policy Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Skyrovix enforces an objective, progress-based refund policy to ensure fairness for students and prevent intellectual property exploitation:
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-900">Course Consumption: 10% to 50%</span>
                <span className="font-extrabold text-[#FB4400] bg-orange-100 px-2 py-0.5 rounded-full">50% Payment Return</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Course Consumption: More than 50% (&gt;50%)</span>
                <span className="font-extrabold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">No Refund Available</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              All approved refunds are credited back to the original source bank/UPI via <strong>Cashfree Payments</strong> within 5-7 working days. For complete terms, visit our dedicated <button onClick={() => setCurrentView('refund-policy')} className="text-[#FB4400] font-bold underline cursor-pointer">Refund & Cancellation Policy</button>.
            </p>
          </section>

          {/* Section 5: Code Sandbox & Ethical Usage */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Terminal size={18} className="text-[#FB4400]" />
              <span>5. In-Browser Sandbox & Code Execution</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The in-browser code sandbox is provided strictly for educational purposes to practice HTML, CSS, JavaScript, and Python exercises.
            </p>
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Prohibited Uses:</strong> Users must not attempt to execute denial-of-service (DoS) attacks, cryptomining scripts, network port scans, unauthorized data scraping, or malicious exploits against our runtime environment. Violators will face immediate lifetime bans.
              </span>
            </div>
          </section>

          {/* Section 6: Certificate Credentialing */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award size={18} className="text-[#FB4400]" />
              <span>6. Verifiable Industry Certificates</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Certificates of Completion are granted only upon 100% completion of all mandatory modules, passing required quizzes, and passing automated validation checks.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Every certificate contains an immutable cryptographic verification ID. Any alteration or forgery of digital certificates immediately invalidates the record and may be reported to academic verification registries.
            </p>
          </section>

          {/* Section 7: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText size={18} className="text-[#FB4400]" />
              <span>7. Intellectual Property Rights</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              All masterclass video recordings, curriculum structures, lesson notes, and LMS software are the exclusive intellectual property of Skyrovix Engineering Academy. You are granted a personal, revocable, non-exclusive license to view the materials. You may not re-upload, distribute, screen-record for commercial sale, or publicly broadcast any video pass content.
            </p>
          </section>

          {/* Section 8: Governing Law & Jurisdiction */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Scale size={18} className="text-[#FB4400]" />
              <span>8. Governing Law & Dispute Resolution</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. In the event of any legal dispute arising from or related to these Terms, the courts situated in <strong>Chennai, Tamil Nadu, India</strong> shall have exclusive jurisdiction.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono">
              For legal correspondence: <a href="mailto:legal@skyrovix.in" className="text-[#FB4400] underline font-bold">legal@skyrovix.in</a>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

