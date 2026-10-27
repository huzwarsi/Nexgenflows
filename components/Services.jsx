"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments, faMicrophone, faGears, faHandshake,
  faRobot, faPlug, faLightbulb, faCheck,
  faTriangleExclamation, faArrowRight, faGlobe,
  faEnvelope, faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Reveal, SectionHeading } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const categories = [
  {
    id: "chatbots", label: "AI Chatbots & Support", icon: faComments,
    tint: "from-brand-tint to-brand-tint-2", ink: "text-brand",
    panelAccent: "from-brand/10 via-[#9a8af5]/5 to-transparent",
    description: "Deploy intelligent AI chatbots that handle customer queries 24/7, qualify leads, and deliver instant support — without lifting a finger.",
    integrations: [
      { icon: faGlobe,     label: "Website",   status: "Published",    ok: true },
      { icon: faWhatsapp,  label: "WhatsApp",  status: "Connected",    ok: true },
      { icon: faInstagram, label: "Instagram", status: "Connected",    ok: true },
      { icon: faEnvelope,  label: "Email",     status: "Needs review", ok: false },
    ],
    tags: ["24/7 Support", "Lead Capture", "Multi-channel", "No-code Setup"],
  },
  {
    id: "voice", label: "AI Voice Agents", icon: faMicrophone,
    tint: "from-rose to-[#fce9dc]", ink: "text-rose-deep",
    panelAccent: "from-rose/20 via-peach/5 to-transparent",
    description: "Deploy AI-powered voice agents that handle inbound calls, book appointments, answer FAQs, and qualify leads automatically.",
    integrations: [
      { icon: faGlobe,     label: "Phone System", status: "Published", ok: true },
      { icon: faEnvelope,  label: "CRM",          status: "Connected", ok: true },
      { icon: faChartLine, label: "Analytics",    status: "Connected", ok: true },
    ],
    tags: ["Inbound Calls", "Appointment Booking", "Lead Qualification", "Natural Language"],
  },
  {
    id: "whatsapp", label: "WhatsApp & Lead Automation", icon: faWhatsapp,
    tint: "from-sage to-[#d4eddc]", ink: "text-sage-deep",
    panelAccent: "from-sage/20 via-transparent to-transparent",
    description: "Automate your WhatsApp and lead generation pipelines with AI-driven conversations, instant replies, and smart follow-up sequences.",
    integrations: [
      { icon: faWhatsapp,  label: "WhatsApp",  status: "Published",    ok: true },
      { icon: faInstagram, label: "Instagram", status: "Connected",    ok: true },
      { icon: faHandshake, label: "Lead CRM",  status: "Needs review", ok: false },
    ],
    tags: ["Auto Replies", "Lead Nurturing", "Broadcast Campaigns", "Multi-agent"],
  },
  {
    id: "workflow", label: "AI Workflow Automation", icon: faGears,
    tint: "from-amber to-[#fce9b8]", ink: "text-amber-deep",
    panelAccent: "from-amber/20 via-transparent to-transparent",
    description: "Connect your tools, eliminate repetitive tasks, and build automated workflows that run 24/7 — freeing your team for high-value work.",
    integrations: [
      { icon: faPlug,      label: "Zapier",   status: "Connected", ok: true },
      { icon: faGears,     label: "Make.com", status: "Published", ok: true },
      { icon: faEnvelope,  label: "Slack",    status: "Connected", ok: true },
    ],
    tags: ["No-code Flows", "Cross-app Sync", "Trigger-based", "Scalable"],
  },
  {
    id: "crm", label: "CRM & Sales Automation", icon: faHandshake,
    tint: "from-rose to-[#fce9dc]", ink: "text-rose-deep",
    panelAccent: "from-rose/20 via-transparent to-transparent",
    description: "Automate your entire sales pipeline from lead capture to close — with AI-driven follow-ups, scoring, and CRM updates in real time.",
    integrations: [
      { icon: faHandshake, label: "HubSpot",    status: "Published",    ok: true },
      { icon: faChartLine, label: "Salesforce", status: "Connected",    ok: true },
      { icon: faEnvelope,  label: "Outreach",   status: "Needs review", ok: false },
    ],
    tags: ["Lead Scoring", "Auto Follow-up", "Pipeline Sync", "Revenue Insights"],
  },
  {
    id: "agents", label: "Custom AI Agents", icon: faRobot,
    tint: "from-sky to-[#d6e8f5]", ink: "text-sky-deep",
    panelAccent: "from-sky/20 via-transparent to-transparent",
    description: "Build bespoke AI agents tailored to your specific business logic — autonomous systems that think, plan, and act on your behalf.",
    integrations: [
      { icon: faRobot,     label: "Custom LLM",  status: "Published", ok: true },
      { icon: faGears,     label: "Automation",  status: "Connected", ok: true },
      { icon: faChartLine, label: "Reporting",   status: "Connected", ok: true },
    ],
    tags: ["Custom Logic", "Multi-model", "API-first", "Enterprise Ready"],
  },
  {
    id: "integration", label: "AI Integration", icon: faPlug,
    tint: "from-sage to-[#d4eddc]", ink: "text-sage-deep",
    panelAccent: "from-sage/15 via-transparent to-transparent",
    description: "Seamlessly integrate AI capabilities into your existing tech stack — APIs, platforms, databases, and third-party tools unified.",
    integrations: [
      { icon: faPlug,  label: "REST APIs",  status: "Published", ok: true },
      { icon: faGlobe, label: "Web Apps",   status: "Connected", ok: true },
      { icon: faGears, label: "Databases",  status: "Connected", ok: true },
    ],
    tags: ["API Integration", "Data Sync", "Webhook Support", "Secure"],
  },
  {
    id: "consulting", label: "AI Consulting & Strategy", icon: faLightbulb,
    tint: "from-peach to-[#fde8d7]", ink: "text-peach-deep",
    panelAccent: "from-peach/20 via-transparent to-transparent",
    description: "Get expert guidance on your AI roadmap — from identifying automation opportunities to designing scalable, future-proof AI strategies.",
    integrations: [
      { icon: faLightbulb, label: "Strategy",    status: "Published", ok: true },
      { icon: faChartLine, label: "ROI Analysis", status: "Connected", ok: true },
      { icon: faRobot,     label: "AI Audit",    status: "Connected", ok: true },
    ],
    tags: ["AI Roadmap", "ROI Modeling", "Tech Selection", "Implementation Plan"],
  },
];

export default function Services() {
  const [selected, setSelected] = useState("chatbots");
  const active = categories.find((c) => c.id === selected);
  const sectionRef = useRef(null);

  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0, y: 20, start: "top 82%" });

  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: "#ffffff" }} ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          intro="From intelligent chatbots to full workflow automation — we build the AI systems your business needs to scale without limits."
          className="mb-14"
        >
          Powerful AI solutions for <em>modern businesses</em>
        </SectionHeading>

        <Reveal data-gsap className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* ── Tab sidebar ── */}
          <div
            role="tablist"
            aria-label="Services"
            className="card p-2 h-fit flex lg:flex-col gap-1 overflow-x-auto no-scrollbar border border-line"
          >
            {categories.map((cat) => {
              const isOn = selected === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isOn}
                  onClick={() => setSelected(cat.id)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-colors overflow-hidden ${
                    isOn
                      ? "text-brand-deep"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  }`}
                >
                  {/* Active gradient background */}
                  {isOn && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-tint via-brand-tint-2 to-brand-tint"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  {/* Active left accent bar */}
                  {isOn && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-brand to-[#9a8af5]" />
                  )}
                  <span
                    className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOn
                        ? `bg-gradient-to-br ${cat.tint}`
                        : "bg-paper text-muted"
                    } ${isOn ? cat.ink : ""}`}
                  >
                    <FontAwesomeIcon icon={cat.icon} className="text-xs" />
                  </span>
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          <div role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative card overflow-hidden p-6 lg:p-9 border border-line hover:border-brand/20 transition-colors"
              >
                {/* Subtle per-service gradient wash in top-right corner */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 right-0 w-72 h-48 bg-gradient-to-bl ${active.panelAccent} rounded-bl-3xl`}
                />

                <div className="relative flex items-start gap-4">
                  <span className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${active.tint} ${active.ink} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <FontAwesomeIcon icon={active.icon} className="text-lg" />
                  </span>
                  <div>
                    <h3 className="display text-3xl">{active.label}</h3>
                    <p className="mt-2 text-ink-soft leading-relaxed max-w-xl">{active.description}</p>
                  </div>
                </div>

                <div className="relative mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    Integrations &amp; status
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.integrations.map((it) => (
                      <div
                        key={it.label}
                        className="grad-top flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3 transition-colors hover:border-brand/20 hover:bg-brand-tint/30"
                      >
                        <span className="flex items-center gap-3 text-sm font-medium text-ink">
                          <span className="w-7 h-7 rounded-lg bg-white border border-line flex items-center justify-center text-muted">
                            <FontAwesomeIcon icon={it.icon} className="text-xs" />
                          </span>
                          {it.label}
                        </span>
                        <span
                          className={`flex items-center gap-1.5 text-xs font-semibold ${
                            it.ok ? "text-sage-deep" : "text-amber-deep"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={it.ok ? faCheck : faTriangleExclamation}
                            className="text-[10px]"
                          />
                          {it.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="chip border border-brand/10 hover:border-brand/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="relative btn btn-primary mt-8"
                >
                  Get Started
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
