import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { WashiTape } from '../ui/WashiTape';
import { PostmarkStamp } from '../ui/VintageStamps';

export const ContactSection = () => {
  const { publishedData } = usePortfolio();
  const contact = publishedData?.contactInfo || {};
  const profile = publishedData?.profile || {};

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please provide your name';
    if (!form.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Please provide a subject';
    if (!form.message.trim() || form.message.length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.socialLinks?.email || 'bhavanakondakrindi@example.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#FAF7F2] border-b-2 border-[#1A1714] bg-graph-paper">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FDA4AF] border-2 border-[#1A1714] font-mono text-xs font-bold text-rose-950 uppercase tracking-widest mb-3 shadow-xs">
            <Bookmark className="w-3.5 h-3.5 text-rose-700" />
            <span>Chapter 05 // Connect & Air-Mail Dispatch</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1714] tracking-tight">
            Get In <span className="italic font-serif font-normal text-rose-600 underline decoration-wavy decoration-rose-300">Touch</span>
          </h2>
          <p className="text-slate-600 font-sans text-base mt-2">
            {contact.subheading || "Whether you have questions about my projects, want to collaborate, or just say hi, feel free to reach out!"}
          </p>
        </div>

        {/* Vintage Air-Mail Postcard (Reference 5) */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border-3 border-[#1A1714] shadow-scrapbook-xl overflow-hidden relative">
          
          {/* Top Air-Mail Strip */}
          <div className="airmail-strip w-full border-b-2 border-[#1A1714]" />

          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <WashiTape color="coral" width="150px" height="26px" rotate={-1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1A1714]">
            
            {/* Left Column: Dispatch Details & Social Profiles (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-9 bg-[#FEF9C3]/40 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                {/* Air-Mail Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1714]/15">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                      PAR AVION // DISPATCH
                    </span>
                    <h3 className="font-editorial text-2xl font-black text-slate-900 mt-0.5">
                      Bhavana Kondakrindi
                    </h3>
                  </div>
                  <PostmarkStamp text="AIR MAIL" date="HYD • 2025" color="#DC2626" rotate={-6} />
                </div>

                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  Second-Year Computer Science and Engineering student at <strong>KLH Deemed to be University</strong>, Hyderabad. Available for software engineering collaborations and technical discussions.
                </p>

                {/* Email Placeholder Card */}
                <div className="p-4 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      Direct Email Placeholder
                    </span>
                    <button
                      onClick={copyEmailToClipboard}
                      className="text-xs font-mono text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-xs text-slate-900 break-all select-all font-bold">
                    {profile.socialLinks?.email || 'bhavanakondakrindi@example.com'}
                  </p>
                </div>

                {/* Profiles: GitHub & LinkedIn */}
                <div className="space-y-3">
                  <a
                    href="https://github.com/bhavanakondakrindi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs hover:-translate-y-0.5 hover:shadow-scrapbook transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#1A1714] text-white flex items-center justify-center">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-editorial font-bold text-sm text-slate-900 block leading-tight">
                          GitHub
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-semibold">
                          @bhavanakondakrindi
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="https://linkedin.com/in/bhavana-kondakrindi-26bb57379"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border-2 border-[#1A1714] shadow-xs hover:-translate-y-0.5 hover:shadow-scrapbook transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0077B5] text-white flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-editorial font-bold text-sm text-slate-900 block leading-tight">
                          LinkedIn
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-semibold">
                          bhavana-kondakrindi-26bb57379
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

              </div>

              {/* Friendly Closing Scrapbook Inscription */}
              <div className="pt-4 border-t-2 border-[#1A1714]/15">
                <p className="font-handwriting text-xl text-slate-900 leading-snug font-bold">
                  "{contact.closingMessage || "Thank you for flipping through my digital scrapbook! Built with care, code, and curiosity."}"
                </p>
                <p className="text-[11px] font-mono font-bold text-slate-500 mt-2">
                  — Bhavana Kondakrindi
                </p>
              </div>

            </div>

            {/* Right Column: Stationery Letterhead Contact Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-9 bg-white flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#1A1714]/15 mb-6">
                  <div>
                    <h3 className="font-editorial text-2xl font-black text-slate-900">
                      Send a Message
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5 font-semibold">
                      Complete client-side validated dispatch form.
                    </p>
                  </div>
                  <MessageSquare className="w-6 h-6 text-rose-500" />
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-[#FEF9C3] border-2 border-[#1A1714] shadow-scrapbook space-y-4">
                    <div className="flex items-center gap-2 text-emerald-800 font-mono text-sm font-bold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Form Validated Locally!</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      Thank you, <strong className="font-bold">{form.name}</strong>! Your note with subject <em>"{form.subject}"</em> passed all client validation checks.
                    </p>

                    {/* Transparent Delivery Note */}
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-mono space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Backend Delivery Note</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        To connect this form to real inbox delivery, configure a backend delivery provider (e.g. Supabase Edge Functions, Formspree, or EmailJS). For immediate direct communication, connect via LinkedIn or GitHub!
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1A1714] text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      Compose Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                          Sender Name *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm font-sans focus:outline-none transition-colors ${
                            errors.name
                              ? 'border-rose-500 bg-rose-50/50'
                              : 'border-[#1A1714]/30 focus:border-[#1A1714] bg-slate-50/60'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="e.g. alex@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm font-sans focus:outline-none transition-colors ${
                            errors.email
                              ? 'border-rose-500 bg-rose-50/50'
                              : 'border-[#1A1714]/30 focus:border-[#1A1714] bg-slate-50/60'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                        Subject Line *
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Inquiry regarding Airline Disruption Dashboard"
                        className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm font-sans focus:outline-none transition-colors ${
                          errors.subject
                            ? 'border-rose-500 bg-rose-50/50'
                            : 'border-[#1A1714]/30 focus:border-[#1A1714] bg-slate-50/60'
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                        Message Body *
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Type your message here..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-sm font-sans focus:outline-none transition-colors ${
                          errors.message
                            ? 'border-rose-500 bg-rose-50/50'
                            : 'border-[#1A1714]/30 focus:border-[#1A1714] bg-slate-50/60'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] font-mono text-rose-600 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Notice strip */}
                    <div className="flex items-start gap-2 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Form provides complete client-side validation. Backend SMTP or Supabase Edge Function requires configuration.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#1A1714] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-scrapbook hover:shadow-scrapbook-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-yellow-300" />
                      <span>Dispatch Message</span>
                    </button>

                  </form>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Air-Mail Strip */}
          <div className="airmail-strip w-full border-t-2 border-[#1A1714]" />
        </div>

      </div>
    </section>
  );
};
