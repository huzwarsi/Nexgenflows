"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCheck, faRobot, faGears,
  faMagnifyingGlass, faWrench, faRocket, faChevronDown,
  faCode, faBrain, faHandshake, faLightbulb,
  faPlug, faBolt, faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Bot, Zap, Workflow, Code2, Globe, Terminal,
  Cpu, Database, Layers, PhoneCall, GitBranch, Layout,
  Brain, Sparkles, Wrench,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, SectionHeading, CountUp } from "@/components/Motion";
import { useGsapReveal, useGsapLine } from "@/components/useGsap";

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { value: 8,  suffix: "",   label: "Core services", icon: faRobot },
  { value: 10, suffix: "+",  label: "Tech stacks",   icon: faPlug  },
  { value: 24, suffix: "/7", label: "AI uptime",     icon: faBolt  },
  { value: 1,  suffix: "",   label: "Team you need", icon: faStar  },
];

const serviceCategories = [
  {
    id: "core-ai", icon: faRobot, badge: "Most popular",
    tint: "from-brand-tint to-brand-tint-2 text-brand",
    accentBar: "from-brand via-[#9a8af5] to-transparent",
    title: "Core AI Automation",
    desc: "End-to-end AI systems that eliminate manual work across sales, support, and operations.",
    services: [
      { name: "AI Chatbots & Support",  desc: "24/7 intelligent support agents"  },
      { name: "WhatsApp Automation",    desc: "Lead capture & instant replies"    },
      { name: "AI Voice Agents",        desc: "Inbound call handling & booking"   },
      { name: "CRM & Sales Automation", desc: "Pipeline sync & lead scoring"      },
      { name: "AI Workflow Automation", desc: "Cross-app triggers & flows"        },
      { name: "Custom AI Consulting",   desc: "Strategy & implementation plan"    },
    ],
    tools: "n8n · Make · HubSpot · OpenAI · Supabase · ElevenLabs",
  },
  {
    id: "industry", icon: faHandshake, badge: "Specialized",
    tint: "from-peach to-[#fde8d7] text-peach-deep",
    accentBar: "from-peach-deep via-[#e88a55] to-transparent",
    title: "Industry Solutions",
    desc: "Tailored automation built for your specific industry — not generic templates.",
    services: [
      { name: "Real Estate",    desc: "Lead qualification & follow-ups" },
      { name: "Healthcare",     desc: "Appointment booking & reminders" },
      { name: "Home Services",  desc: "Quote automation & scheduling"   },
    ],
    tools: "Google Calendar · Calendly · Salesforce",
  },
  {
    id: "saas", icon: faLightbulb, badge: "New",
    tint: "from-sage to-[#d4eddc] text-sage-deep",
    accentBar: "from-sage-deep via-[#4aaa72] to-transparent",
    title: "AI SaaS & Product Development",
    desc: "Build your own AI-powered product or MVP from scratch — fast and production-ready.",
    services: [
      { name: "AI Tool Development", desc: "Custom LLM-powered applications" },
      { name: "MVP Development",     desc: "Launch-ready in weeks"            },
    ],
    tools: "Next.js · OpenAI · Supabase · Stripe",
  },
  {
    id: "web", icon: faCode, badge: "Full stack",
    tint: "from-sky to-[#d6e8f5] text-sky-deep",
    accentBar: "from-sky-deep via-[#4a9cc4] to-transparent",
    title: "Web & Software Engineering",
    desc: "Modern, fast, scalable web applications built with the best tools in the industry.",
    services: [
      { name: "Full-Stack Web Apps",  desc: "React, Next.js, Node.js"         },
      { name: "Backend Development",  desc: "APIs, databases & microservices"  },
      { name: "No-Code / Low-Code",   desc: "Webflow, Bubble, Framer"          },
    ],
    tools: "React · Next.js · PostgreSQL · Prisma",
  },
  {
    id: "ml", icon: faBrain, badge: "Advanced",
    tint: "from-rose to-[#fce9dc] text-rose-deep",
    accentBar: "from-rose-deep via-[#cc4466] to-transparent",
    title: "Python, Data & Machine Learning",
    desc: "Data pipelines, ML models, and intelligent analytics — built and deployed.",
    services: [
      { name: "Data Automation", desc: "Scraping, ETL, pipelines"               },
      { name: "ML Platforms",    desc: "Custom model training & deployment"      },
    ],
    tools: "Python · TensorFlow · Pandas · FastAPI",
  },
];

const processSteps = [
  { number: "01", icon: faMagnifyingGlass, title: "Discover",  tint: "from-brand-tint to-brand-tint-2 text-brand", desc: "We audit your workflow, identify bottlenecks, and map where AI creates the most value." },
  { number: "02", icon: faWrench,          title: "Build",     tint: "from-peach to-[#fde8d7] text-peach-deep",    desc: "Our team designs and develops your custom solution — tailored to your stack and goals." },
  { number: "03", icon: faGears,           title: "Automate",  tint: "from-sage to-[#d4eddc] text-sage-deep",      desc: "We deploy, connect your tools, and ensure everything runs smoothly from day one." },
  { number: "04", icon: faRocket,          title: "Grow",      tint: "from-sky to-[#d6e8f5] text-sky-deep",        desc: "Track ROI, measure performance, and continuously optimise as your business scales." },
];

const engagements = [
  {
    title: "Fixed-scope project", featured: false,
    desc: "Perfect for well-defined automation builds with a clear deliverable.",
    features: ["Scoped deliverable", "Fixed timeline", "One-time payment", "Handover + docs"],
    cta: "Start a project",
    style: "bg-white border-line",
  },
  {
    title: "Monthly retainer", featured: true,
    desc: "Ongoing AI support, iteration, and new automations as you grow.",
    features: ["Dedicated hours/month", "Ongoing builds", "Priority support", "Monthly reporting"],
    cta: "Get a retainer",
    style: "border-brand/30",
  },
  {
    title: "Dedicated team", featured: false,
    desc: "Embed our engineers directly into your product or operations team.",
    features: ["Full-time engineers", "Daily standups", "Slack integration", "Sprint-based"],
    cta: "Talk to us",
    style: "bg-white border-line",
  },
];

const tools = [
  { name: "OpenAI", icon: Bot },
  { name: "ElevenLabs", icon: Sparkles },
  { name: "Make.com", icon: Workflow },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Terminal },
  { name: "Python", icon: Cpu },
  { name: "Supabase", icon: Database },
  { name: "HubSpot", icon: Layers },
  { name: "Twilio", icon: PhoneCall },
  { name: "n8n", icon: GitBranch },
  { name: "Webflow", icon: Layout },
  { name: "FastAPI", icon: Zap },
  { name: "PostgreSQL", icon: Database },
  { name: "LangChain", icon: Brain },
  { name: "Pinecone", icon: Sparkles },
];

/* ── Accordion service item ──────────────────────────────────── */
function ServiceItem({ cat, index }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `svc-${cat.id}`;

  return (
    <div
      data-gsap
      className={`grad-border card overflow-hidden transition-colors ${open ? "border-brand/25" : ""}`}
    >
      {/* Gradient top accent bar visible when open */}
      <div
        aria-hidden="true"
        className={`h-[2px] w-full bg-gradient-to-r ${cat.accentBar} transition-opacity duration-300 ${open ? "opacity-80" : "opacity-0"}`}
      />

      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left"
        >
          <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.tint} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <FontAwesomeIcon icon={cat.icon} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2.5 flex-wrap">
              <span className="font-extrabold text-lg text-ink uppercase tracking-tight">{cat.title}</span>
              <span className="chip border border-brand/10">{cat.badge}</span>
            </span>
            <span className="block mt-0.5 text-sm text-ink-soft leading-snug">{cat.desc}</span>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              open
                ? "bg-gradient-to-br from-brand to-brand-deep text-white"
                : "bg-paper text-muted"
            }`}
          >
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 border-t border-line">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {cat.services.map((s) => (
                  <div
                    key={s.name}
                    className="grad-top flex items-start gap-3 rounded-xl bg-paper border border-line p-3.5 hover:border-brand/20 hover:bg-brand-tint/20 transition-colors"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-ink">{s.name}</p>
                      <p className="text-xs text-muted mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                <span>Tools: <span className="font-medium text-ink-soft">{cat.tools}</span></span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const statsRef   = useRef(null);
  const servRef    = useRef(null);
  const processRef = useRef(null);
  const engageRef  = useRef(null);

  useGsapReveal(statsRef,   { selector: "[data-gsap]", stagger: 0.1,  y: 24, start: "top 85%" });
  useGsapReveal(servRef,    { selector: "[data-gsap]", stagger: 0.1,  y: 28, start: "top 85%" });
  useGsapReveal(processRef, { selector: "[data-gsap]", stagger: 0.12, y: 28, start: "top 82%" });
  useGsapReveal(engageRef,  { selector: "[data-gsap]", stagger: 0.13, y: 32, start: "top 82%" });
  useGsapLine(processRef, { selector: "[data-gsap-line]", start: "top 80%" });

  return (
    <div className="min-h-screen" style={{ background: "#f8f7fe" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #ede9fc 0%, #f3f0fe 55%, #f8f7fe 100%)",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-brand/12 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-gradient-to-br from-[#9a8af5]/10 to-transparent blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow eyebrow--center"
          >
            Our services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display mt-5 text-5xl sm:text-6xl lg:text-7xl"
          >
            Pick the <em>flow</em> your business needs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto"
          >
            From simple chatbots to full AI infrastructure — we build, deploy, and optimise systems that save time,
            reduce costs, and help your team focus on what matters.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-9 flex flex-wrap gap-3 justify-center"
          >
            <Link href="/#contact" className="btn btn-primary shadow-[0_8px_28px_-8px_rgba(91,71,224,0.45)]">
              Start a project <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
            <Link href="/#contact" className="btn btn-ghost">Book a strategy call</Link>
          </motion.div>
        </div>

        {/* Stats */}
        <dl ref={statsRef} className="max-w-3xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-center">
          {stats.map((s) => (
            <div key={s.label} data-gsap className="grad-border rounded-2xl p-5 bg-white">
              <dd className="display text-5xl text-ink leading-none">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Services accordion ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="What we build" className="mb-12">
            Five services. <em>Every part of your business.</em>
          </SectionHeading>
          <div ref={servRef} className="space-y-3">
            {serviceCategories.map((cat, i) => (
              <ServiceItem key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-brand/8" style={{ background: "linear-gradient(180deg, #eee9fc 0%, #f3f0fe 100%)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="display text-4xl sm:text-5xl">
              From first call to <em>live automation</em>
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-sm">
              A simple, proven process from idea to deployed automation — without the usual delays.
            </p>
            <Link href="/#contact" className="btn btn-primary mt-8 shadow-[0_8px_28px_-8px_rgba(91,71,224,0.4)]">
              Start now <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </Reveal>

          <ol ref={processRef} className="relative space-y-4">
            {/* Vertical connector line drawn in by GSAP */}
            <span
              aria-hidden="true"
              data-gsap-line
              className="hidden sm:block absolute left-[1.35rem] top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-brand via-[#9a8af5] to-peach-deep"
            />
            {processSteps.map((step, i) => (
              <li key={step.title} data-gsap className="relative flex items-start gap-4 sm:gap-6 group">
                <span className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${step.tint} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                  <FontAwesomeIcon icon={step.icon} className="text-sm sm:text-base" />
                </span>
                <div className="relative card rounded-2xl border border-line flex-1 p-5 sm:p-6 hover:border-brand/30 shadow-sm transition-all duration-300">
                  {/* Speech pointer notch */}
                  <div
                    aria-hidden="true"
                    className="hidden sm:block absolute -left-2 top-4 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_0_1px_rgba(0,0,0,0.03)]"
                  />
                  <p className="flex items-baseline gap-2.5">
                    <span className="display text-2xl text-brand/40 font-bold">{step.number}</span>
                    <span className="font-extrabold text-base text-ink uppercase tracking-tight">{step.title}</span>
                  </p>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Engagement models ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Engagement models" className="mb-12">
            Work with us <em>your way</em>
          </SectionHeading>

          <div ref={engageRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagements.map((e) => (
              <div
                key={e.title}
                data-gsap
                className={`relative rounded-[1.25rem] p-6 flex flex-col border overflow-hidden ${
                  e.featured
                    ? "border-brand/30 shadow-[0_18px_40px_-20px_rgba(70,54,188,0.35)]"
                    : "border-line bg-white hover:border-brand/20 transition-colors"
                }`}
                style={
                  e.featured
                    ? {
                        background:
                          "linear-gradient(160deg, var(--color-brand-tint) 0%, #ffffff 60%)",
                      }
                    : undefined
                }
              >
                {/* Featured ambient orb */}
                {e.featured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand/15 to-transparent blur-2xl"
                  />
                )}
                {e.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-brand to-brand-deep text-white text-xs font-semibold px-3 py-1 shadow-sm">
                    Most chosen
                  </span>
                )}

                <h3 className="display text-3xl mt-2">{e.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">{e.desc}</p>

                <ul className="mt-5 space-y-2.5">
                  {e.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <span className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="text-[8px]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={`btn mt-7 ${
                    e.featured
                      ? "btn-primary shadow-[0_6px_20px_-6px_rgba(91,71,224,0.45)]"
                      : "btn-ghost"
                  }`}
                >
                  {e.cta} <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools marquee ── */}
      <section aria-label="Tools we build with" className="py-14 border-y border-brand/8 overflow-hidden" style={{ background: "linear-gradient(180deg, #f3f0fe 0%, #ede9fc 100%)" }}>
        <p className="text-center text-sm font-medium text-muted mb-6">Tools we build with</p>
        <div className="relative">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#ede9fc] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#ede9fc] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap w-max">
            {[...tools, ...tools].map((tool, i) => {
              const ToolIcon = tool.icon;
              return (
                <span
                  key={i}
                  className="mx-2 px-4 py-2 rounded-full border border-line bg-paper text-sm font-medium text-ink-soft hover:border-brand/30 hover:text-brand hover:bg-brand-tint transition-colors inline-flex items-center gap-2"
                >
                  <ToolIcon className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                  {tool.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#ffffff" }}>
        <Reveal
          className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-line px-6 py-14 sm:px-12"
          style={{
            background: "linear-gradient(135deg, #fff4ec 0%, #fbeefa 50%, #f1edfe 100%)",
          }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-brand/12 to-transparent blur-3xl" />
          <div aria-hidden="true" className="absolute top-0 left-12 right-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="eyebrow mb-4">Free strategy call</p>
              <h2 className="display text-4xl sm:text-5xl">
                Let&apos;s find the right flow <em>for your business</em>
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Tell us about your goals — we&apos;ll map out the exact automations that save you the most time.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/#contact" className="btn btn-primary shadow-[0_8px_28px_-8px_rgba(91,71,224,0.45)]">
                Start a project
              </Link>
              <Link href="/#contact" className="btn btn-ghost">Book a strategy call</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
