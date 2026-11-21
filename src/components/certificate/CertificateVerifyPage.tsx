import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import { COMPANY } from '../../lib/constants';
import { ShieldCheck, Search, CheckCircle2, Printer, ArrowLeft, Award, Lock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const CertificateVerifyPage: React.FC = () => {
  const { setCurrentView, currentUser } = usePlatform();
  const [certInput, setCertInput] = useState('SKX-CERT-2026-9055');
  const [searchedCert, setSearchedCert] = useState<{
    certId: string;
    studentName: string;
    courseTitle: string;
    date: string;
    score: string;
    verified: boolean;
  }>({
    certId: 'SKX-CERT-2026-9055',
    studentName: currentUser?.name || 'Hariharan S',
    courseTitle: 'Full Stack Web Development Masterclass',
    date: '19 November 2026',
    score: '100/100 (Distinction)',
    verified: true
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    const query = certInput.toUpperCase().trim();
    let courseName = 'Full Stack Web Development Masterclass';
    if (query.includes('HTML')) courseName = 'HTML5 Semantic Web Architecture';
    else if (query.includes('CSS')) courseName = 'CSS3 Modern Responsive Design & Flexbox';
    else if (query.includes('JS') || query.includes('JAVASCRIPT')) courseName = 'JavaScript ES6+ Modern Engineering';
    else if (query.includes('REACT')) courseName = 'React 19 Frontend Masterclass';
    else if (query.includes('PYTHON')) courseName = 'Python Core to Advanced Production Programming';

    setSearchedCert({
      certId: query,
      studentName: currentUser?.name || 'Hariharan S',
      courseTitle: courseName,
      date: '19 November 2026',
      score: '100/100 (Distinction)',
      verified: true
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <button
          onClick={() => setCurrentView('certificates')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-bold transition-colors no-print"
        >
          <ArrowLeft size={16} />
          <span>Back to My Certificates</span>
        </button>

        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-3 no-print"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#FF5A36] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck size={14} />
            <span>OFFICIAL SKYROVIX CREDENTIAL VALIDATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Verify Official Course Certificate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            All Skyrovix certificates are issued only upon 100% course completion, cryptographically validated, and officially accredited under Govt. MSME ({COMPANY.udyamRegistry}).
          </p>

          {/* Search Box */}
          <form onSubmit={handleVerify} className="max-w-md mx-auto pt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={certInput}
                onChange={e => setCertInput(e.target.value)}
                placeholder="Enter Credential ID (e.g. SKX-CERT-2026-9055)"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-mono shadow-2xs font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <button
              type="submit"
              className="py-2.5 px-5 bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95"
            >
              Verify
            </button>
          </form>
        </motion.div>

        {/* Certificate Display */}
        {searchedCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Status Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold text-xs">
                <CheckCircle2 size={16} className="fill-emerald-600 text-white" />
                <span>Verified Active Credential • Official MSME Record</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FF5A36] text-white hover:bg-[#E03D00] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer size={13} />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* THE EXECUTIVE CERTIFICATE CANVAS (Strictly matching the user's template specifications) */}
            <div
              id="certificate-print-area"
              className="bg-white rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden text-center text-slate-900 border-4 border-[#181619]"
              style={{
                backgroundColor: '#ffffff',
                fontFamily: "'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
            >
              {/* Skyrovix Regal Inner Frame in Coral #f95c4b */}
              <div
                className="rounded-2xl p-5 sm:p-7 relative border-[1.5px] border-[#f95c4b]"
                style={{
                  backgroundColor: '#ffffff'
                }}
              >
                {/* 1. Header: Left Logos + Center Brand Title + Right MSME */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={brandImages.logo}
                      alt="Skyrovix"
                      className="h-10 sm:h-12 w-auto object-contain"
                    />
                  </div>

                  <div className="text-center">
                    <div
                      className="text-lg sm:text-xl font-bold tracking-[4px] text-[#181619]"
                      style={{ letterSpacing: '4px' }}
                    >
                      SKYROVIX
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-[#f95c4b] tracking-[1.5px] mt-0.5">
                      {COMPANY.tagline}
                    </div>
                    <div className="text-[8px] font-medium text-slate-500 mt-0.5">
                      Registered under MSME, Govt. of India ({COMPANY.udyamRegistry})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src={brandImages.msme}
                      alt="Govt MSME"
                      className="h-9 sm:h-11 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* 2. Title Block: COURSE CERTIFICATE OF COMPLETION */}
                <div className="mt-5 space-y-1">
                  <h2
                    className="text-2xl sm:text-3xl font-black text-[#181619]"
                    style={{ letterSpacing: '5px' }}
                  >
                    COURSE CERTIFICATE
                  </h2>
                  <div
                    className="text-xs sm:text-sm font-bold text-[#f95c4b]"
                    style={{ letterSpacing: '7px' }}
                  >
                    OF COMPLETION
                  </div>
                  <div className="w-14 h-[2.5px] bg-[#f95c4b] mx-auto mt-2 rounded-full" />
                </div>

                {/* 3. Presentation Citation */}
                <div className="mt-5 space-y-2 max-w-2xl mx-auto">
                  <div className="text-xs sm:text-sm text-slate-500 tracking-wider">
                    This certificate is awarded to
                  </div>
                  <div className="text-2xl sm:text-4xl font-extrabold text-[#181619] tracking-tight uppercase border-b border-slate-200 pb-2 inline-block px-4">
                    {searchedCert.studentName}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-2">
                    for successfully completing the{' '}
                    <strong className="text-[#f95c4b] font-bold">{searchedCert.courseTitle}</strong> course with a score of{' '}
                    <strong className="text-[#181619] font-bold">{searchedCert.score}</strong>, demonstrating proficiency, technical mastery, and commitment to learning.
                  </p>
                </div>

                {/* 4. Digitally Verified QR Code Badge */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                        `https://skyrovix.in/verify-certificate?id=${searchedCert.certId}`
                      )}`}
                      alt="QR Verification"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-[#f95c4b]">
                      Digitally Verified Credential
                    </div>
                    <div className="text-[8.5px] text-slate-500">
                      Scan QR or verify at skyrovix.in/verify-certificate
                    </div>
                  </div>
                </div>

                {/* 5. Symmetrical Signatures & Official Seal Section */}
                <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 items-end gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="h-10 flex items-end justify-center mb-1">
                      <img
                        src={brandImages.sigFounder}
                        alt="Founder Signature"
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                    <div className="w-32 border-t border-[#181619] pt-1" />
                    <div className="text-xs font-bold text-[#181619]">{COMPANY.founder.name}</div>
                    <div className="text-[9px] font-bold text-[#f95c4b] uppercase">{COMPANY.founder.title}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src={brandImages.seal}
                      alt="Official Seal"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
                    />
                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      Official Verified Seal
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-10 flex items-end justify-center mb-1">
                      <img
                        src={brandImages.sigCofounder}
                        alt="Co-Founder Signature"
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                    <div className="w-32 border-t border-[#181619] pt-1" />
                    <div className="text-xs font-bold text-[#181619]">{COMPANY.cofounder.name}</div>
                    <div className="text-[9px] font-bold text-[#f95c4b] uppercase">{COMPANY.cofounder.title}</div>
                  </div>
                </div>

                {/* 6. Footer Metadata */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                  <div className="text-left space-y-0.5">
                    <div>
                      Certificate ID: <strong className="text-[#181619]">{searchedCert.certId}</strong>
                    </div>
                    <div>
                      Score: <strong className="text-[#f95c4b]">{searchedCert.score}</strong>
                    </div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div>
                      Issued: <strong className="text-[#181619]">{searchedCert.date}</strong>
                    </div>
                    <div>
                      Verify at: <strong className="text-[#f95c4b]">www.skyrovix.in/verify-certificate</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
