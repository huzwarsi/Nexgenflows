"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faBolt, faCheck, faShieldHalved
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin, faXTwitter, faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
  Sparkles, CheckCircle2, ArrowUpRight,
  Layers, ShieldCheck, HeartHandshake, MapPin
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Motion";

const stats = [
  { value: "45k+", label: "Hours Saved" },
  { value: "99.4%", label: "System Reliability" },
  { value: "3.8x", label: "Average ROI" },
  { value: "24/7", label: "Autonomous Ops" },
];

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Architect",
    image: "/team/alex-chen.jpg",
    desc: "8+ years designing enterprise workflow pipelines. Obsessed with eliminating repetitive business tasks.",
    skills: ["AI Workflows", "System Design"],
    social: "https://linkedin.com",
  },
  {
    name: "Dr. Elena Vance",
    role: "Head of AI Engineering",
    image: "/team/elena-vance.jpg",
    desc: "Neural systems specialist building intelligent voice agents and multi-step reasoning models.",
    skills: ["Voice AI", "LLM Fine-Tuning"],
    social: "https://linkedin.com",
  },
  {
    name: "Marcus Reyes",
    role: "VP of Engineering",
    image: "/team/marcus-reyes.jpg",
    desc: "Cloud infrastructure veteran ensuring sub-second API execution, security, and zero downtime.",
    skills: ["Cloud Architecture", "SOC2 Security"],
    social: "https://linkedin.com",
  },
];

const galleryPhotos = [
  {
    image: "/gallery/team-sprint.jpg",
    title: "Flow Architecture Sprints",
    category: "Workflow Design",
    location: "Studio War Room",
    span: "md:col-span-7",
  },
  {
    image: "/gallery/studio-space.jpg",
    title: "NexGenFlows Studio Hub",
    category: "Engineering Space",
    location: "London HQ",
    span: "md:col-span-5",
  },
  {
    image: "/gallery/ai-lab.jpg",
    title: "Autonomous Agent Simulation Lab",
    category: "R&D Benchmarking",
    location: "Systems Testing",
    span: "md:col-span-5",
  },
  {
    image: "/gallery/strategy-session.jpg",
    title: "Client Strategy & Scope Reviews",
    category: "Discovery Workshops",
    location: "San Francisco",
    span: "md:col-span-7",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9fc]">
      <Navbar />

      {/* ── Compact Hero Section ── */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
        {/* Soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-gradient-to-r from-brand/12 to-peach/25 blur-3xl rounded-full"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand/20 shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">About Us</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display text-4xl sm:text-6xl max-w-3xl mx-auto leading-tight">
              We build AI workflows that <em>actually work.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 text-base sm:text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
              No generic templates, no brittle duct-tape scripts. Just robust, automated systems that run your operations on autopilot.
            </p>
          </Reveal>

          {/* Key Metrics Chips */}
          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-2xl bg-white border border-line shadow-sm text-center"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">{s.value}</div>
                  <div className="text-xs font-medium text-ink-soft mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What We Stand For — Short & Crisp ── */}
      <section className="py-14 sm:py-18 bg-white border-y border-line/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="p-6 rounded-2xl bg-[#faf9fc] border border-line h-full flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-brand-tint text-brand flex items-center justify-center mb-4 shadow-sm">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-ink">Built for Scale</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    Designed to process thousands of transactions and inquiries without breaking or needing manual fixes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/50 text-xs font-semibold text-brand flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Battle-tested reliability
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="p-6 rounded-2xl bg-[#faf9fc] border border-line h-full flex flex-col justify-between hover:border-brand/30 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-brand-tint text-brand flex items-center justify-center mb-4 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-ink">Clean & Transparent</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    You own 100% of your code, workflows, and data. Zero vendor lock-in, clear documentation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/50 text-xs font-semibold text-brand flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Full ownership & security
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.19}>
              <div className="p-6 rounded-2xl bg-[#faf9fc] border border-line h-full flex flex-col justify-between hover:border-brand/30 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-brand-tint text-brand flex items-center justify-center mb-4 shadow-sm">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-ink">Human-in-the-Loop</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    AI handles 90% of the repetitive volume, while routing high-stakes decisions smoothly to your team.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/50 text-xs font-semibold text-brand flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Smart exception routing
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Team Section with Animated Shapes ── */}
      <section className="py-20 sm:py-24 bg-[#faf9fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <span className="eyebrow eyebrow--center">The Core Team</span>
            <h2 className="display text-3xl sm:text-4xl mt-2">
              People behind the <em>systems.</em>
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Direct access to senior builders who write the code and manage your pipelines.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-3xl bg-white border border-line overflow-hidden shadow-sm hover:shadow-xl hover:border-brand/30 transition-all p-5 flex flex-col justify-between"
                >
                  {/* Decorative animated gradient corner blob */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-brand via-purple-400 to-peach rounded-full blur-xl"
                  />

                  <div>
                    {/* Picture with sleek rounded shape */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-tint/40 mb-5">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority={i === 0}
                      />

                      {/* Subtle badge on bottom corner */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-ink shadow-sm">
                        {member.role}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-ink">{member.name}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {member.desc}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-paper text-[11px] font-medium text-ink-soft border border-line">
                          {s}
                        </span>
                      ))}
                    </div>
                    <a
                      href={member.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-paper hover:bg-brand text-ink-soft hover:text-white flex items-center justify-center transition-colors text-xs"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real Visual Photography Gallery ── */}
      <section className="py-20 sm:py-24 bg-white border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="eyebrow">Studio Showcase</span>
              <h2 className="display text-3xl sm:text-4xl mt-2">
                Where automation <em>comes to life.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-soft max-w-sm">
              A look inside our client war rooms, architecture sprints, and research labs.
            </p>
          </Reveal>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryPhotos.map((photo, idx) => (
              <Reveal key={photo.title} delay={idx * 0.08} className={photo.span}>
                <div className="group relative rounded-3xl overflow-hidden border border-line bg-paper shadow-sm hover:shadow-xl transition-all duration-300 h-72 sm:h-80 w-full">
                  
                  {/* Photo with smooth zoom */}
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient dark overlay for crystal-clear readability */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
                  />

                  {/* Top category chip */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-sm">
                      {photo.category}
                    </span>
                  </div>

                  {/* Bottom title & location */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                        {photo.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-brand-tint" />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                    
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors flex-shrink-0 shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clean Compact CTA ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faf9fc]">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#f0edfe] via-[#f9effa] to-[#fdeee4] border border-brand/20 p-8 sm:p-12 text-center relative overflow-hidden">
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl text-ink">
              Ready to eliminate <em>manual work?</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-soft max-w-md mx-auto">
              Schedule a 15-minute intro with Alex or Elena to scope your workflow automations.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm px-6 py-3">
                Book a Strategy Call
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
              <Link href="/services" className="btn btn-ghost btn-sm">
                View Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
