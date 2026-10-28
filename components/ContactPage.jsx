"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCheck, faEnvelope, faPhone,
  faLocationDot, faClock, faCalendarDays, faComments,
  faShieldHalved, faBolt, faCopy, faCheckDouble,
  faCircleCheck, faSpinner, faBuilding, faUser, faMessage
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin, faXTwitter, faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
  Mail, Phone, MapPin, Clock, Calendar, CheckCircle2,
  Sparkles, Send, HelpCircle, ChevronDown, MessageSquare
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, SectionHeading } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const projectTypes = [
  "AI Voice Agents",
  "Workflow Automation",
  "AI Chatbots & Support",
  "Custom SaaS & Web App",
  "CRM & Integrations",
  "Architecture Audit",
];

const budgetRanges = [
  "< $5,000",
  "$5k - $15k",
  "$15k - $40k",
  "$40k+",
];

const contactFaqs = [
  {
    q: "How quickly can we go from discovery call to production?",
    a: "Most streamlined automation workflows and voice agents are designed, tested, and deployed to production within 2 to 3 weeks. Complex enterprise custom SaaS builds typically span 4 to 8 weeks with continuous milestone demos.",
  },
  {
    q: "Do you sign a Mutual Non-Disclosure Agreement (NDA)?",
    a: "Absolutely. We routinely execute mutual NDAs prior to in-depth technical consultations to safeguard your proprietary workflows, data structures, and trade secrets.",
  },
  {
    q: "Can you connect with our proprietary or legacy internal databases?",
    a: "Yes. In addition to native connectors for HubSpot, Salesforce, OpenAI, and Twilio, our engineers specialize in custom webhook bridges, encrypted REST/GraphQL wrappers, and air-gapped database synchronizations.",
  },
  {
    q: "What does your post-launch support look like?",
    a: "Every automation deployment is backed by 24/7 telemetry monitoring, automated exception alarms, and designated engineering support to ensure zero downtime as your traffic scales.",
  },
];

export default function ContactPage() {
  const [selectedTypes, setSelectedTypes] = useState(["Workflow Automation"]);
  const [selectedBudget, setSelectedBudget] = useState("$5k - $15k");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const faqRef = useRef(null);

  useGsapReveal(heroRef, { selector: "[data-gsap]", stagger: 0.1, y: 20, start: "top 90%" });
  useGsapReveal(formRef, { selector: "[data-gsap]", stagger: 0.08, y: 24, start: "top 85%" });
  useGsapReveal(infoRef, { selector: "[data-gsap]", stagger: 0.1, y: 24, start: "top 85%" });
  useGsapReveal(faqRef, { selector: "[data-gsap]", stagger: 0.08, y: 20, start: "top 85%" });

  const toggleType = (t) => {
    if (selectedTypes.includes(t)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter((item) => item !== t));
      }
    } else {
      setSelectedTypes([...selectedTypes, t]);
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("info@nexgenflow.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(91, 71, 224, 0.13), transparent 60%), radial-gradient(circle at 85% 30%, rgba(252, 233, 220, 0.4), transparent 50%), #faf9fc",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-gsap className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand/20 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Available For New Projects Q2 2026
            </span>
          </div>

          <h1 data-gsap className="display text-5xl sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[1.08]">
            Let&apos;s build something <em>extraordinary together.</em>
          </h1>

          <p data-gsap className="mt-6 text-lg sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, an automation bottleneck, or want to explore what AI agents can do for your business?
            Our architecture team replies within 2 hours.
          </p>

          <div data-gsap className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Direct access to senior architects
            </span>
            <span>·</span>
            <span>No sales fluff</span>
            <span>·</span>
            <span>Free technical scope</span>
          </div>
        </div>
      </section>

      {/* ── Main Contact Container ── */}
      <section className="pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ── Left Column: Interactive Contact Form ── */}
            <div ref={formRef} className="lg:col-span-7">
              <div className="card p-6 sm:p-10 bg-white border border-line shadow-[0_12px_45px_-16px_rgba(91,71,224,0.12)] rounded-[2rem] relative overflow-hidden">
                {/* Decorative top gradient accent */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                />

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-7"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-ink">Send us a project inquiry</h2>
                        <p className="mt-1 text-sm text-ink-soft">
                          Tell us about your company and what you’re looking to achieve.
                        </p>
                      </div>

                      {/* Service selector chips */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                          What services are you interested in?
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {projectTypes.map((type) => {
                            const isSelected = selectedTypes.includes(type);
                            return (
                              <button
                                type="button"
                                key={type}
                                onClick={() => toggleType(type)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer ${
                                  isSelected
                                    ? "bg-brand text-white border-brand shadow-sm scale-[1.02]"
                                    : "bg-paper text-ink-soft border-line hover:border-brand/30 hover:bg-white"
                                }`}
                              >
                                {isSelected && <FontAwesomeIcon icon={faCheck} className="mr-1.5 text-[10px]" />}
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Inputs Row 1: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            Full Name <span className="text-brand">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="Alex Carter"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-paper border border-line text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10 transition-all"
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none">
                              <FontAwesomeIcon icon={faUser} className="text-xs" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            Work Email <span className="text-brand">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="alex@company.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-paper border border-line text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10 transition-all"
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none">
                              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inputs Row 2: Company & Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            Company or Project Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Acme Growth Inc."
                              value={form.company}
                              onChange={(e) => setForm({ ...form, company: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-paper border border-line text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10 transition-all"
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none">
                              <FontAwesomeIcon icon={faBuilding} className="text-xs" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            Approx. Budget Stage
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {budgetRanges.map((b) => (
                              <button
                                type="button"
                                key={b}
                                onClick={() => setSelectedBudget(b)}
                                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                                  selectedBudget === b
                                    ? "bg-brand-tint border-brand text-brand font-semibold"
                                    : "bg-paper border-line text-ink-soft hover:bg-white"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Message / Details */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          Project Details or Current Bottleneck <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            required
                            placeholder="Briefly describe what repetitive tasks or workflows you want to automate..."
                            value={form.details}
                            onChange={(e) => setForm({ ...form, details: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-paper border border-line text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary w-full py-4 text-base shadow-[0_10px_30px_-10px_rgba(91,71,224,0.5)] cursor-pointer disabled:opacity-75 transition-all"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm" />
                              Transmitting scope securely...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Submit Project Inquiry
                              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                            </span>
                          )}
                        </button>
                        <p className="mt-3 text-center text-xs text-muted">
                          🔒 We respect your privacy. Zero spam. Mutual NDA upon request.
                        </p>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-12 px-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h3 className="text-3xl font-bold text-ink">Inquiry Received!</h3>
                      <p className="mt-3 text-base text-ink-soft max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-ink">{form.name || "Partner"}</strong>. Our lead systems architect has received your project briefing and will review your requirements.
                      </p>
                      <div className="mt-4 p-4 rounded-2xl bg-brand-tint/60 border border-brand/20 max-w-sm mx-auto text-xs text-brand font-medium">
                        ⏱ Expected response window: Within 2 hours at <span className="underline">{form.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setForm({ name: "", email: "", company: "", details: "" });
                        }}
                        className="btn btn-ghost btn-sm mt-8"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right Column: Direct Info & Booking Widgets ── */}
            <div ref={infoRef} className="lg:col-span-5 space-y-6">
              
              {/* Direct Communication Channels */}
              <div className="card p-6 sm:p-7 bg-white border border-line rounded-3xl space-y-5">
                <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand" /> Direct Channels
                </h3>

                <div className="space-y-4">
                  {/* Email with 1-click copy */}
                  <div className="p-4 rounded-2xl bg-paper border border-line flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase text-muted">Primary Email</div>
                        <a href="mailto:info@nexgenflow.com" className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
                          info@nexgenflow.com
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="w-9 h-9 rounded-xl bg-white border border-line text-ink-soft hover:text-brand hover:border-brand/30 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon icon={copied ? faCheckDouble : faCopy} className={`text-xs ${copied ? "text-emerald-500" : ""}`} />
                    </button>
                  </div>

                  {/* Office Hours */}
                  <div className="p-4 rounded-2xl bg-paper border border-line flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-peach text-peach-deep flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase text-muted">Operating Hours</div>
                      <div className="text-sm font-semibold text-ink">Mon – Fri: 8:00 AM – 8:00 PM EST</div>
                      <div className="text-xs text-muted">24/7 Monitoring for Active SLA Clients</div>
                    </div>
                  </div>

                  {/* Studio Hubs */}
                  <div className="p-4 rounded-2xl bg-paper border border-line flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sage text-sage-deep flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase text-muted">Engineering Hubs</div>
                      <div className="text-sm font-semibold text-ink">London (UK) · San Francisco (CA)</div>
                      <div className="text-xs text-muted">Global Distributed Delivery Network</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Strategy Call Card */}
              <div
                className="card p-6 sm:p-7 rounded-3xl border border-brand/20 relative overflow-hidden text-ink"
                style={{
                  background: "linear-gradient(135deg, #f0edfe 0%, #fbeffa 50%, #fdeee4 100%)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="chip bg-white/80 border border-brand/20">
                    <Calendar className="w-3.5 h-3.5 text-brand" /> 15-Min Quick Call
                  </span>
                  <span className="text-xs font-semibold text-brand">3 Slots Left This Week</span>
                </div>

                <h4 className="text-xl font-bold text-ink mt-2">
                  Need immediate architectural feedback?
                </h4>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Book directly on our senior architects&apos; calendar for a rapid live diagnostic of your current tech stack and workflow gaps.
                </p>

                <div className="mt-5 pt-4 border-t border-brand/10 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-brand text-white flex items-center justify-center text-xs font-bold">AC</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-peach-deep text-white flex items-center justify-center text-xs font-bold">EV</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-sage-deep text-white flex items-center justify-center text-xs font-bold">MR</div>
                  </div>
                  <a
                    href="mailto:info@nexgenflow.com?subject=Book%2015-Min%20Discovery%20Call"
                    className="btn btn-primary btn-sm shadow-md"
                  >
                    Claim a Slot
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-5 rounded-2xl bg-white border border-line flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-soft">Follow our open-source tools:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-paper hover:bg-brand-tint text-ink-soft hover:text-brand flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-xs" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-paper hover:bg-brand-tint text-ink-soft hover:text-brand flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="text-xs" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-paper hover:bg-brand-tint text-ink-soft hover:text-brand flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-xs" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ Section for Contact (Matching Home FAQ Speech Bubble & Timeline Style) ── */}
      <section ref={faqRef} className="py-20 lg:py-28 bg-[#faf9fc] border-t border-brand/10 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute top-10 right-10 w-80 h-80 bg-brand/6 rounded-full blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-10 left-10 w-80 h-80 bg-[#3b82f6]/6 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div data-gsap className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-tint border border-brand/20 shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Common Questions</span>
            </div>
            <h2 data-gsap className="text-4xl sm:text-5xl font-black uppercase text-ink tracking-tight leading-[1.08]">
              BEFORE YOU <em>REACH OUT.</em>
            </h2>
          </div>

          <div className="relative pl-2 sm:pl-4">
            {/* Timeline vertical guide line in brand blue/violet gradient */}
            <div
              aria-hidden="true"
              className="absolute left-[21px] sm:left-[25px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand via-brand/40 to-line"
            />

            <div className="space-y-6">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} data-gsap className="relative flex items-start gap-4 sm:gap-6 group">
                    {/* Professional SVG Help Icon Badge in brand neon violet/blue gradient */}
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-label={`Toggle ${faq.q}`}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 cursor-pointer shadow-md ${
                        isOpen
                          ? "bg-gradient-to-br from-brand to-brand-deep text-white shadow-[0_6px_20px_rgba(91,71,224,0.45)] scale-110"
                          : "bg-white border-2 border-brand/30 text-brand group-hover:border-brand group-hover:scale-105"
                      }`}
                    >
                      <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Card with subtle speech pointer and brand styling */}
                    <div
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className={`flex-1 relative rounded-2xl bg-white border p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
                        isOpen
                          ? "border-brand/40 shadow-[0_12px_36px_-12px_rgba(91,71,224,0.2)] ring-1 ring-brand/20"
                          : "border-line hover:border-brand/30 shadow-sm"
                      }`}
                    >
                      {/* Triangle speech pointer */}
                      <div
                        aria-hidden="true"
                        className="hidden sm:block absolute -left-2 top-3 sm:top-4 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_0_1px_rgba(0,0,0,0.03)]"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-extrabold text-sm sm:text-base text-ink uppercase tracking-tight">
                          {faq.q}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen ? "bg-brand-tint text-brand" : "bg-paper text-muted"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 pt-3.5 border-t border-line text-sm text-ink-soft leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
