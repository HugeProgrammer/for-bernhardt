import React, { useState, useEffect } from 'react';
import {
  Menu, X, ArrowRight, Mail, MessageSquare, FileText, CheckCircle2,
  AlertTriangle, Globe, Clock, Search, Map, Settings, TrendingUp,
  ShieldCheck, Zap, ChevronRight, Phone, Lock, Calendar, Download, Send
} from 'lucide-react';

const navLinks = [
  { name: 'Overview', href: '#overview' },
  { name: 'Why AI', href: '#why-ai' },
  { name: 'Context', href: '#context' },
  { name: 'Opportunities', href: '#opportunities' },
  { name: 'Options', href: '#options' },
  { name: 'Approach', href: '#approach' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Why Pidu', href: '#why-pidu' },
  { name: 'Contact', href: '#contact' },
];

// TÁCH RIÊNG COMPONENT FORM ĐỂ TỐI ƯU TỐC ĐỘ (INP)
function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: 'Bernhardt Furniture Company',
    role: '',
    interest: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxRuYaJAOhZsb7hiv2723Y3m4iWXAp4b3ETcRq0eSggNE5ZQiBYw6yba_cRtJ-D653a/exec'; 

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });

      setFormStatus('success');
      setFormData({
        fullName: '', workEmail: '', company: 'Bernhardt Furniture Company',
        role: '', interest: '', message: ''
      });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <div className="bg-brand-soft-bg rounded-3xl p-8 lg:p-12 border border-brand-border shadow-sm relative overflow-hidden">
      {formStatus === 'success' && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Message Sent!</h3>
          <p className="text-brand-muted">Thank you. We will be in touch shortly.</p>
        </div>
      )}

      {formStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 font-medium">
          <AlertTriangle size={20} className="shrink-0" />
          Something went wrong. Please check your connection and try again.
        </div>
      )}

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-brand-dark mb-2">Full Name</label>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Jane Doe" />
          </div>
          <div>
            <label htmlFor="workEmail" className="block text-sm font-semibold text-brand-dark mb-2">Work Email</label>
            <input type="email" id="workEmail" value={formData.workEmail} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="jane@bernhardt.com" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-brand-dark mb-2">Company</label>
            <input type="text" id="company" value={formData.company} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-brand-dark mb-2">Role / Department</label>
            <input type="text" id="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="e.g. VP of Operations" />
          </div>
        </div>
        
        <div>
          <label htmlFor="interest" className="block text-sm font-semibold text-brand-dark mb-2">Area of Interest</label>
          <select id="interest" value={formData.interest} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all appearance-none">
            <option value="">Select an option...</option>
            <option value="workshop">Executive AI Workshop</option>
            <option value="audit">Workflow Audit</option>
            <option value="pilot">Paid Pilot</option>
            <option value="general">General Discussion</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-brand-dark mb-2">Message (Optional)</label>
          <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none" placeholder="Any specific workflows or challenges you'd like to focus on?"></textarea>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={formStatus === 'submitting'} className="w-full md:w-auto px-10 py-4 rounded-xl bg-brand-dark text-white font-bold hover:bg-brand-deep transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {formStatus === 'submitting' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <><Send size={18} /> Send Inquiry</>
            )}
          </button>
        </div>
      </form>
      <p className="text-sm text-brand-muted mt-6 flex items-center gap-2">
        <ShieldCheck size={16} className="text-brand-orange shrink-0" />
        We will respond with a tailored recommendation based on Bernhardt’s workflow priorities.
      </p>
    </div>
  );
}

// MAIN APP COMPONENT
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // TỐI ƯU 1: Gỡ bỏ thời gian chờ ảo, tắt loading ngay khi component đã mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // TỐI ƯU 2: Cải thiện hàm cuộn trang, chỉ set state khi thực sự thay đổi
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isCurrentlyScrolled = window.scrollY > 20;
          // Chỉ gọi state update nếu trạng thái thay đổi
          if (isCurrentlyScrolled !== scrolled) {
            setScrolled(isCurrentlyScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]); // Thêm scrolled vào dependency

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-soft-bg">
        <div className="w-14 h-14 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin mb-6"></div>
        <div className="font-bold text-lg sm:text-xl tracking-tight text-brand-dark flex items-center gap-2 sm:gap-3 animate-pulse">
          <img 
            src="https://res.cloudinary.com/dtxb2d9mq/image/upload/f_auto,q_auto/v1775124966/z7684323671599_428afa7f82f4348703de834e99013c75_olpb6r.jpg" 
            alt="Pidu Digital Logo" 
            className="h-8 sm:h-10 w-auto object-contain" 
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} 
          />
          <div className="hidden w-8 h-8 rounded bg-gradient-to-br from-brand-orange to-brand-light-orange text-white items-center justify-center font-bold shadow-sm">P</div>
          <span className="whitespace-nowrap">PIDU DIGITAL</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-soft-bg text-brand-deep font-sans selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-brand-border/50' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg sm:text-xl tracking-tight text-brand-dark flex items-center gap-2 sm:gap-3">
              <img src="https://res.cloudinary.com/dtxb2d9mq/image/upload/f_auto,q_auto/v1775124966/z7684323671599_428afa7f82f4348703de834e99013c75_olpb6r.jpg" alt="Pidu Digital Logo" className="h-8 sm:h-10 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
              <div className="hidden w-8 h-8 rounded bg-gradient-to-br from-brand-orange to-brand-light-orange text-white items-center justify-center font-bold shadow-sm">P</div>
              <span className="whitespace-nowrap">PIDU DIGITAL</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-muted hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <button
            className="lg:hidden text-brand-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-brand-border py-4 px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-brand-dark hover:text-brand-orange"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* SECTION 1 — HERO */}
        <section id="overview" className="pt-28 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] opacity-40 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center justify-center">
                <img src="https://res.cloudinary.com/dtxb2d9mq/image/upload/f_auto,q_auto/v1775124966/z7684323671599_428afa7f82f4348703de834e99013c75_olpb6r.jpg" alt="Pidu Digital" className="h-10 md:h-12 w-auto object-contain opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                <div className="hidden items-center gap-2 font-bold text-lg md:text-xl text-brand-dark">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gradient-to-br from-brand-orange to-brand-light-orange text-white flex items-center justify-center font-bold shadow-sm text-sm md:text-base">P</div>
                  PIDU DIGITAL
                </div>
              </div>
              
              <X size={20} className="text-brand-muted/50" />
              
              <div className="flex items-center justify-center">
                <img src="https://res.cloudinary.com/dtxb2d9mq/image/upload/v1775117213/logo.bernhardt_opu0gj.avif" alt="Bernhardt Furniture Company" className="h-6 md:h-8 w-auto object-contain opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'block'; }} />
                <div className="hidden font-bold text-lg md:text-xl text-brand-dark tracking-widest uppercase">
                  BERNHARDT
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-border text-xs font-semibold text-brand-muted uppercase tracking-widest mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              Prepared for Bernhardt Furniture Company
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold text-brand-dark tracking-tighter leading-[1.1] mb-6 text-balance">
              AI & Automation Proposal for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-orange">Bernhardt’s US–Vietnam</span> Operations
            </h1>
            <p className="text-xl lg:text-2xl text-brand-muted mb-8 text-balance leading-relaxed font-light">
              A practical roadmap to improve communication, workflow clarity, and operational speed across cross-border furniture sourcing, sample development, order coordination, and reporting.
            </p>

            {/* --- VIDEO WELCOME MESSAGE --- */}
            <div className="max-w-3xl mx-auto mb-10 overflow-hidden rounded-2xl shadow-xl border border-brand-border bg-black/5 ring-1 ring-black/5">
              <video 
                className="w-full h-auto rounded-2xl outline-none"
                controls 
                autoPlay
                muted
                playsInline
                preload="metadata"
              >
                <source src="https://res.cloudinary.com/dtxb2d9mq/image/upload/f_auto,q_auto/v1775124966/z7684323671599_428afa7f82f4348703de834e99013c75_olpb6r.jpg" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>

            <p className="text-base lg:text-lg text-brand-deep/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Pidu Digital helps businesses apply AI and Automation to real operational workflows. For Bernhardt, our focus is not on AI hype. It is on identifying where AI can reduce manual effort, improve visibility, and support faster execution, while keeping human control on critical business decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href="#contact-form"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-brand-orange to-[#E08516] text-white font-semibold hover:shadow-xl hover:shadow-brand-orange/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Book Meeting
              </a>
              <a
                href="Proposal_Bernhardt.pdf"
                download="Pidu_Digital_Proposal.pdf"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white text-brand-dark border border-brand-border font-semibold hover:border-brand-muted hover:bg-brand-soft-bg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <Download size={18} /> Download PDF Proposal
              </a>
              <a
                href="#options"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent text-brand-muted font-medium hover:text-brand-orange transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Review Options <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-brand-muted/80">
                Schedule a discussion to review priorities, scope, and next-step options.
              </p>
              <p className="text-xs text-brand-muted/60">
                A concise version of this proposal can also be shared internally as a PDF.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-brand-border/50 flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-brand-muted">
                Prepared by <strong className="text-brand-dark">PIDU DIGITAL CO.,LTD</strong>
              </p>
              <div className="flex items-center gap-1 text-xs text-brand-muted/70 uppercase tracking-widest font-semibold">
                <Lock size={12} /> Confidential & Proprietary
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — WHY AI MATTERS NOW */}
        <section id="why-ai" className="py-24 bg-white px-6 lg:px-8 border-y border-brand-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">The Challenge</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Why AI matters now for cross-border operations</h2>
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-6">
                As operational complexity grows across teams, vendors, time zones, and communication channels, the cost of manual coordination also increases.
              </p>
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-6">
                For a business with US-facing commercial operations and Vietnam-based sourcing or production support, common friction points often include:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Long email threads and missed details',
                  'Slow internal handoffs',
                  'Follow-up delays with suppliers or factories',
                  'Difficulty tracking changes across specs, orders, and approvals',
                  'Inconsistent weekly reporting and risk visibility'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-deep/80">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium text-brand-dark leading-relaxed border-l-4 border-brand-orange pl-6 py-3 bg-brand-soft-bg/50 rounded-r-lg">
                AI can help reduce these bottlenecks, not by replacing teams entirely, but by making information flow faster, clearer, and more structured.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-brand-soft-bg border border-brand-border shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-muted shadow-sm border border-brand-border">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark tracking-tight">Without AI-assisted structure</h3>
                </div>
                <ul className="space-y-5">
                  {[
                    'Scattered communication',
                    'Repeated manual summaries',
                    'Delayed follow-up',
                    'Limited visibility',
                    'Inconsistent reporting'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-muted font-medium">
                      <X size={20} className="text-red-400/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 rounded-2xl bg-gradient-to-br from-brand-dark to-brand-deep text-white shadow-2xl shadow-brand-dark/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg shadow-brand-orange/30">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">With AI-assisted workflow</h3>
                </div>
                <ul className="space-y-5 relative z-10">
                  {[
                    'Structured handoff',
                    'Summarized action items',
                    'Faster drafting and follow-up',
                    'Clearer approvals',
                    'Better reporting and escalation'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-soft-bg/90 font-medium">
                      <CheckCircle2 size={20} className="text-brand-light-orange shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — OPERATIONAL CONTEXT */}
        <section id="context" className="py-24 px-6 lg:px-8 bg-brand-soft-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Operational Reality</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Built around Bernhardt’s cross-border workflow</h2>
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-8">
                This proposal is designed for a workflow model where commercial coordination happens across the US, while Vietnam-based teams or partners support activities such as:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {['Sample coordination', 'Supplier / factory follow-up', 'Order-related communication', 'Specification clarification', 'Bilingual alignment'].map((tag, i) => (
                  <span key={i} className="px-5 py-2.5 rounded-full bg-white border border-brand-border text-sm font-semibold text-brand-dark shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-6">
                In this environment, efficiency depends not only on people, but also on how information moves between people.
              </p>
              <p className="text-xl font-medium text-brand-dark leading-relaxed">
                Our role is to identify where AI can support this workflow with better structure, faster turnaround, and clearer operational visibility.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="bg-white p-6 md:p-10 lg:p-16 rounded-2xl border border-brand-border shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
                
                {/* Connecting Line - Desktop (Horizontal) */}
                <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0 border-t-2 border-dashed border-brand-border z-0"></div>
                
                {/* Connecting Line - Mobile (Vertical) */}
                <div className="md:hidden absolute top-[56px] bottom-[56px] left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-brand-border z-0"></div>

                <div className="w-full md:flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-brand-border flex items-center justify-center text-brand-dark mb-4 md:mb-5 shadow-sm">
                    <Globe size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-brand-dark mb-1 md:mb-2 text-base md:text-lg">US Team</h4>
                  <p className="text-xs md:text-sm text-brand-muted font-medium">Requests / Changes / Priorities</p>
                </div>

                <div className="w-full md:flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-orange/10 border-2 border-brand-orange/30 flex items-center justify-center text-brand-orange mb-4 md:mb-5 shadow-sm">
                    <Settings size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-brand-dark mb-1 md:mb-2 text-base md:text-lg">Vietnam Support</h4>
                  <p className="text-xs md:text-sm text-brand-muted font-medium">Coordination & Alignment</p>
                </div>

                <div className="w-full md:flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-brand-border flex items-center justify-center text-brand-dark mb-4 md:mb-5 shadow-sm">
                    <Zap size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-brand-dark mb-1 md:mb-2 text-base md:text-lg">Suppliers / Factories</h4>
                  <p className="text-xs md:text-sm text-brand-muted font-medium">Status / Risks / Updates</p>
                </div>

                <div className="w-full md:flex-1 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-dark border-2 border-brand-dark flex items-center justify-center text-white mb-4 md:mb-5 shadow-lg shadow-brand-dark/20">
                    <TrendingUp size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-brand-dark mb-1 md:mb-2 text-base md:text-lg">Management</h4>
                  <p className="text-xs md:text-sm text-brand-muted font-medium">Clear Reporting & Visibility</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHERE AI CAN HELP FIRST */}
        <section id="opportunities" className="py-24 px-6 lg:px-8 bg-white border-y border-brand-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">High-Impact Areas</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Where AI can help first</h2>
              <p className="text-lg text-brand-deep/80 leading-relaxed">
                Rather than deploying AI broadly, we recommend starting with a few practical, high-value workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Email & Inquiry Summarization',
                  desc: 'Convert long email chains into concise summaries, action items, ownership, and follow-up priorities.',
                  icon: <Mail size={24} strokeWidth={1.5} />
                },
                {
                  title: 'Internal Handoff Structuring',
                  desc: 'Transform unstructured requests into clear task lists for US and Vietnam teams.',
                  icon: <ArrowRight size={24} strokeWidth={1.5} />
                },
                {
                  title: 'Factory / Supplier Follow-up Drafting',
                  desc: 'Generate faster, more consistent follow-up communication for production, samples, timelines, and clarifications.',
                  icon: <MessageSquare size={24} strokeWidth={1.5} />
                },
                {
                  title: 'Spec / PO Change Review',
                  desc: 'Identify key revisions, missing details, and items requiring confirmation before the next operational step.',
                  icon: <FileText size={24} strokeWidth={1.5} />
                },
                {
                  title: 'Weekly Status & Risk Reporting',
                  desc: 'Create structured summaries for order status, delays, escalations, and management reporting.',
                  icon: <TrendingUp size={24} strokeWidth={1.5} />
                },
                {
                  title: 'Bilingual Operational Support',
                  desc: 'Improve clarity between English and Vietnamese communication in cross-functional workflows.',
                  icon: <Globe size={24} strokeWidth={1.5} />
                }
              ].map((card, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white border border-brand-border shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 hover:-translate-y-1 hover:border-brand-orange/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-brand-soft-bg border border-brand-border text-brand-dark flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 leading-tight">{card.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-brand-soft-bg to-white rounded-2xl p-8 text-center border border-brand-border shadow-sm max-w-4xl mx-auto">
              <p className="text-brand-dark font-medium flex flex-col sm:flex-row items-center justify-center gap-3 text-lg">
                <ShieldCheck className="text-brand-orange" size={24} />
                <span><strong className="text-brand-dark">Recommended principle:</strong> AI drafts first. Humans review and approve critical actions.</span>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — ENGAGEMENT OPTIONS / PRICING */}
        <section id="options" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-brand-dark to-[#3A220D] text-white relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-brand-light-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Investment & Scope</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">Engagement Options</h2>
              <p className="text-lg text-brand-soft-bg/80 leading-relaxed">
                We recommend a phased approach: start with discovery, align on real workflow opportunities, and then move into a focused pilot with measurable business value.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16 items-stretch">
              {/* Option 1 */}
              <div className="bg-white text-brand-dark rounded-3xl p-10 border border-transparent hover:border-brand-border transition-all duration-300 flex flex-col">
                <div className="mb-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-soft-bg text-brand-muted text-xs font-bold uppercase tracking-widest border border-brand-border">
                    Best Starting Point
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Executive AI Workshop</h3>
                <p className="text-brand-muted text-sm mb-8 font-medium">Best for initial alignment</p>
                
                <div className="mb-8 pb-8 border-b border-brand-border">
                  <div className="text-5xl font-extrabold tracking-tight text-brand-dark mb-2">USD 3,500</div>
                  <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                    <Clock size={16} /> Typical timeline: 1 week
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-4">Includes</p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Executive alignment workshop',
                      'Practical AI use cases for Bernhardt’s workflow',
                      'Opportunity mapping summary',
                      'Summary recommendations brief'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-deep/90 leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-soft-bg p-5 rounded-xl mb-8 border border-brand-border">
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-1.5">Intended Outcome</p>
                  <p className="text-sm font-semibold text-brand-dark">Shared understanding of where AI can help first</p>
                </div>
                
                <a href="#contact-form" className="mt-auto block w-full py-4 px-4 rounded-xl border-2 border-brand-dark text-brand-dark font-bold text-center hover:bg-brand-dark hover:text-white transition-colors duration-300">
                  Start with Workshop
                </a>
              </div>

              {/* Option 2 (Recommended) */}
              <div className="bg-white text-brand-dark rounded-3xl p-10 ring-4 ring-brand-orange/50 shadow-2xl shadow-brand-orange/20 relative transform lg:-translate-y-6 flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-orange to-brand-light-orange text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Recommended
                </div>
                <div className="mb-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest border border-brand-orange/20">
                    Best for Evaluation
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Workflow Audit & Opportunity Map</h3>
                <p className="text-brand-muted text-sm mb-8 font-medium">Best for structured evaluation before implementation</p>
                
                <div className="mb-8 pb-8 border-b border-brand-border">
                  <div className="text-5xl font-extrabold tracking-tight text-brand-dark mb-2">USD 9,500</div>
                  <div className="flex items-center gap-2 text-sm text-brand-orange font-medium">
                    <Clock size={16} /> Typical timeline: 2–3 weeks
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-4">Includes</p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Executive alignment workshop',
                      'Review of selected operational workflows',
                      'Pain-point and opportunity mapping',
                      'Prioritized AI use cases',
                      'Pilot recommendation brief with next steps'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-deep/90 leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-orange/5 p-5 rounded-xl mb-8 border border-brand-orange/20">
                  <p className="text-xs text-brand-orange font-bold uppercase tracking-widest mb-1.5">Intended Outcome</p>
                  <p className="text-sm font-semibold text-brand-dark">A clear decision framework for where Bernhardt should begin</p>
                </div>
                
                <a href="#contact-form" className="mt-auto block w-full py-4 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-[#E08516] text-white font-bold text-center hover:shadow-lg hover:shadow-brand-orange/30 transition-all duration-300">
                  Choose Audit Option
                </a>
              </div>

              {/* Option 3 */}
              <div className="bg-white text-brand-dark rounded-3xl p-10 border border-transparent hover:border-brand-border transition-all duration-300 flex flex-col">
                <div className="mb-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-soft-bg text-brand-muted text-xs font-bold uppercase tracking-widest border border-brand-border">
                    Best for Proof of Value
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Paid Pilot for Priority Workflow</h3>
                <p className="text-brand-muted text-sm mb-8 font-medium">Best for proving value in a real operational use case</p>
                
                <div className="mb-8 pb-8 border-b border-brand-border">
                  <div className="text-5xl font-extrabold tracking-tight text-brand-dark mb-2">USD 15,000</div>
                  <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                    <Clock size={16} /> Typical timeline: 4–6 weeks
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-4">Includes</p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Focused workflow assessment',
                      'Pilot design for one priority use case',
                      'Recommended process flow',
                      'Human approval checkpoints',
                      'KPI framework',
                      'Team review and rollout recommendation'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-deep/90 leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-soft-bg p-5 rounded-xl mb-8 border border-brand-border">
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest mb-1.5">Intended Outcome</p>
                  <p className="text-sm font-semibold text-brand-dark">A practical pilot with measurable business impact</p>
                </div>
                
                <a href="#contact-form" className="mt-auto block w-full py-4 px-4 rounded-xl border-2 border-brand-dark text-brand-dark font-bold text-center hover:bg-brand-dark hover:text-white transition-colors duration-300">
                  Explore Pilot Option
                </a>
              </div>
            </div>

            {/* Comparison Strip */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm mb-8">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="md:hidden px-8 py-2 bg-white/10 text-[10px] text-white/50 uppercase tracking-widest text-center">
                  ← Swipe to view comparison →
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/10 text-white/80 uppercase tracking-widest text-xs font-semibold">
                    <tr>
                      <th className="px-8 py-5">Option</th>
                      <th className="px-8 py-5">Best For</th>
                      <th className="px-8 py-5">Typical Timeline</th>
                      <th className="px-8 py-5">Primary Deliverable</th>
                      <th className="px-8 py-5">Expected Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white/90">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-5 font-bold text-base whitespace-nowrap">Executive Workshop</td>
                      <td className="px-8 py-5">initial alignment</td>
                      <td className="px-8 py-5 whitespace-nowrap">1 week</td>
                      <td className="px-8 py-5">workshop + recommendation summary</td>
                      <td className="px-8 py-5">aligned priorities</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-brand-orange/10 border-l-4 border-brand-orange">
                      <td className="px-8 py-5 font-bold text-base text-brand-light-orange whitespace-nowrap">Workflow Audit</td>
                      <td className="px-8 py-5 text-brand-light-orange">structured evaluation</td>
                      <td className="px-8 py-5 text-brand-light-orange whitespace-nowrap">2–3 weeks</td>
                      <td className="px-8 py-5 text-brand-light-orange font-medium">opportunity map + pilot recommendation</td>
                      <td className="px-8 py-5 text-brand-light-orange font-medium">decision framework</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-5 font-bold text-base whitespace-nowrap">Paid Pilot</td>
                      <td className="px-8 py-5">proof of value</td>
                      <td className="px-8 py-5 whitespace-nowrap">4–6 weeks</td>
                      <td className="px-8 py-5">pilot design + KPI framework</td>
                      <td className="px-8 py-5">real workflow validation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 inline-block">
                <p className="text-sm text-white/90">
                  <strong className="text-brand-light-orange">Recommended starting point:</strong> For most enterprise teams, the Workflow Audit provides the best balance between strategic clarity and implementation readiness.
                </p>
              </div>
              <p className="text-xs text-white/50 mt-6 font-light">
                All pricing excludes third-party software costs, enterprise licenses, and custom system integrations beyond agreed scope.<br/>
                Scope can be adjusted based on stakeholder priorities.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — DELIVERY APPROACH */}
        <section id="approach" className="py-24 px-6 lg:px-8 bg-white border-b border-brand-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Methodology</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">How we work</h2>
              <p className="text-lg text-brand-deep/80 leading-relaxed">
                Our methodology is designed to keep AI practical, controlled, and measurable.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-brand-border z-0"></div>

              {[
                {
                  step: '01',
                  title: 'Discover',
                  desc: 'Understand workflows, bottlenecks, and coordination gaps.',
                  icon: <Search size={28} strokeWidth={1.5} />
                },
                {
                  step: '02',
                  title: 'Map Opportunities',
                  desc: 'Identify where AI creates the highest business value with the lowest operational risk.',
                  icon: <Map size={28} strokeWidth={1.5} />
                },
                {
                  step: '03',
                  title: 'Design Pilot',
                  desc: 'Define process flow, human checkpoints, KPI targets, and implementation scope.',
                  icon: <Settings size={28} strokeWidth={1.5} />
                },
                {
                  step: '04',
                  title: 'Review & Scale',
                  desc: 'Evaluate results and determine whether to expand into additional workflows.',
                  icon: <TrendingUp size={28} strokeWidth={1.5} />
                }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-28 h-28 rounded-full bg-white border-4 border-brand-soft-bg shadow-xl flex items-center justify-center text-brand-dark mb-8 relative group-hover:border-brand-orange/20 transition-colors duration-300">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-brand-dark text-white text-sm font-bold flex items-center justify-center border-4 border-white shadow-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-brand-muted text-base leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-brand-soft-bg rounded-2xl p-10 border border-brand-border max-w-4xl mx-auto text-center shadow-sm">
              <p className="text-brand-dark font-medium leading-relaxed text-lg">
                We do not recommend replacing critical approvals with AI.<br/>
                <span className="text-brand-muted mt-2 block">We recommend using AI to reduce manual friction while preserving operational oversight.</span>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — SAMPLE PILOT USE CASES */}
        <section id="use-cases" className="py-24 px-6 lg:px-8 bg-brand-soft-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Practical Applications</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Examples of pilot workflows Bernhardt could explore</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Email-to-Action Workflow',
                  desc: 'AI converts long internal or supplier-facing email threads into structured action lists, owners, deadlines, and escalation flags.'
                },
                {
                  title: 'Spec / Revision Review Assistant',
                  desc: 'AI compares versions of specifications or order-related documents to highlight changes and missing confirmations.'
                },
                {
                  title: 'Weekly Order Risk Summary',
                  desc: 'AI compiles operational updates into a clear management-facing summary with risk alerts and status visibility.'
                },
                {
                  title: 'US–Vietnam Communication Support',
                  desc: 'AI supports bilingual drafting, summarization, and clearer handoff between teams.'
                }
              ].map((useCase, i) => (
                <div key={i} className="bg-white p-10 rounded-2xl border border-brand-border shadow-sm flex flex-col sm:flex-row gap-6 group hover:border-brand-orange/40 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-brand-soft-bg border border-brand-border flex items-center justify-center text-brand-orange shrink-0 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors duration-300">
                    <ChevronRight size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">{useCase.title}</h3>
                    <p className="text-brand-muted leading-relaxed font-medium">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — TIMELINE */}
        <section id="timeline" className="py-24 px-6 lg:px-8 bg-white border-y border-brand-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Project Flow</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Indicative timeline</h2>
            </div>

            <div className="relative border-l-2 border-brand-border ml-4 md:ml-0 md:border-l-0 md:border-t-2 md:flex md:justify-between pt-10 md:pt-16">
              {[
                {
                  time: 'Week 1',
                  title: 'Workshop & Discovery',
                  desc: 'Stakeholder alignment, workflow understanding, and opportunity framing'
                },
                {
                  time: 'Week 2',
                  title: 'Workflow Review',
                  desc: 'Prioritization of use cases and operational assessment'
                },
                {
                  time: 'Week 3',
                  title: 'Pilot Recommendation',
                  desc: 'Selection of one high-value workflow and pilot design'
                },
                {
                  time: 'Week 4–6',
                  title: 'Pilot Phase',
                  desc: 'Focused pilot definition and review cycle for rollout readiness'
                }
              ].map((phase, i) => (
                <div key={i} className="mb-12 md:mb-0 pl-8 md:pl-0 relative md:flex-1 md:px-6">
                  {/* Timeline dot */}
                  <div className="absolute -left-[11px] md:left-1/2 md:-translate-x-1/2 md:-top-[75px] w-6 h-6 rounded-full bg-white border-[5px] border-brand-orange shadow-sm z-10"></div>
                  
                  <div className="md:text-center">
                    <div className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-3">{phase.time}</div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">{phase.title}</h3>
                    <p className="text-base text-brand-muted leading-relaxed font-medium">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-brand-muted mt-20 italic font-medium">
              Timeline may be adjusted based on stakeholder availability and chosen engagement option.
            </p>
          </div>
        </section>

        {/* SECTION 9 — WHY PIDU DIGITAL */}
        <section id="why-pidu" className="py-24 px-6 lg:px-8 bg-brand-soft-bg">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Our Expertise</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-8">Why Pidu Digital</h2>
              <p className="text-xl text-brand-deep/80 leading-relaxed mb-6 font-light">
                Pidu Digital specializes in applying AI and Automation to business workflows.
              </p>
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-10 font-medium">
                Our approach is practical, process-aware, and focused on business outcomes, not AI hype.
              </p>
              
              <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm mb-8">
                <p className="font-bold text-brand-dark mb-6 text-lg">We help companies:</p>
                <ul className="space-y-4">
                  {[
                    'Reduce repetitive manual work',
                    'Improve information flow',
                    'Structure communication',
                    'Create more visibility across teams',
                    'Apply AI in ways that remain manageable and scalable'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-brand-deep/90 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Practical',
                  desc: 'We focus on workflows that create measurable operational value.'
                },
                {
                  title: 'Controlled',
                  desc: 'We design around human review and business-critical approval points.'
                },
                {
                  title: 'Scalable',
                  desc: 'We start with one workflow, prove value, then expand intentionally.'
                }
              ].map((pillar, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white border-l-4 border-brand-orange shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">{pillar.title}</h3>
                  <p className="text-brand-muted text-lg">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 — CONTACT FORM */}
        <section id="contact-form" className="py-24 px-6 lg:px-8 bg-white border-t border-brand-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-sm mb-3 block">Get Started</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-6">Let’s explore the right starting point</h2>
              <p className="text-lg text-brand-deep/80 leading-relaxed max-w-2xl mx-auto">
                If Bernhardt would like to review options, discuss internal priorities, or identify the most suitable pilot workflow, Pidu Digital can prepare a focused recommendation based on current operational needs.
              </p>
            </div>

            {/* Gọi Form ở đây, cực kỳ gọn và tối ưu hiệu suất! */}
            <ContactForm />

          </div>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <section id="contact" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-brand-dark to-[#3A220D] text-white text-center relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Next step recommendation</h2>
            <p className="text-xl text-brand-soft-bg/80 leading-relaxed mb-12 font-light max-w-3xl mx-auto">
              We recommend beginning with either the Executive AI Workshop or the Workflow Audit, depending on whether Bernhardt prefers an initial strategic discussion or a more structured workflow evaluation.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-24">
              <a
                href="#contact-form"
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-[#E08516] text-white font-bold hover:shadow-xl hover:shadow-brand-orange/30 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Calendar size={20} /> Book Meeting
              </a>
              <a
                href="Proposal_Bernhardt.pdf"
                download="Pidu_Digital_Proposal.pdf"
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-transparent text-white border-2 border-white/30 font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Download size={20} /> Download PDF Proposal
              </a>
              <a
                href="#contact-form"
                className="w-full md:w-auto px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Send size={20} /> Send Inquiry
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 max-w-xl mx-auto backdrop-blur-md text-left shadow-2xl">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                  <img 
                  src="https://res.cloudinary.com/dtxb2d9mq/image/upload/f_auto,q_auto/v1775124966/z7684323671599_428afa7f82f4348703de834e99013c75_olpb6r.jpg" 
                  alt="Pidu Digital Logo" 
                  className="h-16 w-auto object-contain bg-white/90 p-2 rounded-xl" 
                  loading="lazy" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'flex'; }} 
                />
                <div className="hidden w-14 h-14 rounded-xl bg-gradient-to-br from-brand-orange to-brand-light-orange text-white items-center justify-center font-bold text-2xl shadow-lg">P</div>
                <div>
                  <h3 className="font-bold text-2xl tracking-tight text-white mb-1">PIDU DIGITAL CO.,LTD</h3>
                  <p className="text-sm font-semibold text-brand-light-orange uppercase tracking-widest">AI & Automation for Business Operations</p>
                </div>
              </div>
              <div className="space-y-5 text-brand-soft-bg/90 font-medium">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                    <Phone size={18} className="text-brand-orange" />
                  </div>
                  <span className="text-lg">0938905347</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                    <Mail size={18} className="text-brand-orange" />
                  </div>
                  <span className="text-lg">pidudigital@gmail.com</span>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                    <Map size={18} className="text-brand-orange" />
                  </div>
                  <span className="text-lg pt-1.5 leading-relaxed">7, Street 7, Van Phuc City, Thu Duc District, HCMC, Vietnam.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2A1809] text-white/40 py-10 text-center text-sm font-medium">
        <p className="mb-2">&copy; {new Date().getFullYear()} PIDU DIGITAL CO.,LTD. All rights reserved.</p>
        <p className="text-xs text-white/30">Prepared by Pidu Digital for business discussion purposes</p>
      </footer>
    </div>
  );
}