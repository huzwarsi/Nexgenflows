"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments, faMicrophone, faGears, faHandshake,
  faRobot, faPlug, faLightbulb, faCheck,
  faTriangleExclamation, faArrowRight, faGlobe,
  faEnvelope, faChartLine, faDatabase, faBrain,
  faWaveSquare, faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp, faInstagram, faFacebook, faSlack, faHubspot,
} from "@fortawesome/free-brands-svg-icons";
import { Reveal, SectionHeading } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const categories = [
  {
    id: "chatbots", label: "AI Chatbots & Support", icon: faComments,
    image: "/projects/service-chatbots.jpg",
    tint: "from-brand-tint to-brand-tint-2", ink: "text-brand",
    panelAccent: "from-brand/10 via-[#9a8af5]/5 to-transparent",
    description: "Intelligent 24/7 AI chatbots that capture qualified leads and resolve customer support inquiries on autopilot.",
    integrations: [
      { icon: faGlobe,     label: "Website Chat" },
      { icon: faWhatsapp,  label: "WhatsApp"     },
      { icon: faInstagram, label: "Instagram DM" },
      { icon: faEnvelope,  label: "Email Support"},
    ],
    tags: ["24/7 Support", "Lead Capture", "Multi-channel", "Instant Answers"],
  },
  {
    id: "voice", label: "AI Voice Agents", icon: faMicrophone,
    image: "/projects/voice-ai-project.jpg",
    tint: "from-rose to-[#fce9dc]", ink: "text-rose-deep",
    panelAccent: "from-rose/20 via-peach/5 to-transparent",
    description: "Human-grade conversational voice agents powered by ElevenLabs & WAPI for real-time inbound bookings.",
    integrations: [
      { icon: faWaveSquare, label: "ElevenLabs" },
      { icon: faWhatsapp,   label: "WhatsApp"   },
      { icon: faHandshake,  label: "CRM Sync"   },
      { icon: faPlug,       label: "WAPI Voice" },
    ],
    tags: ["ElevenLabs Audio", "WhatsApp Calling", "Smart CRM Sync", "Instant Booking"],
  },
  {
    id: "whatsapp", label: "WhatsApp & Lead Automation", icon: faWhatsapp,
    image: "/projects/service-whatsapp-lead.jpg",
    tint: "from-sage to-[#d4eddc]", ink: "text-sage-deep",
    panelAccent: "from-sage/20 via-transparent to-transparent",
    description: "Automated WhatsApp and social lead pipelines with instant AI replies and CRM synchronization.",
    integrations: [
      { icon: faWhatsapp,  label: "WhatsApp"       },
      { icon: faFacebook,  label: "FB Lead Ads"    },
      { icon: faInstagram, label: "Instagram Direct"},
      { icon: faHandshake, label: "Lead CRM"       },
    ],
    tags: ["Auto Replies", "FB Lead Sync", "WhatsApp Chatbot", "Lead Scoring"],
  },
  {
    id: "workflow", label: "AI Workflow Automation", icon: faGears,
    image: "/projects/service-workflow-n8n.jpg",
    tint: "from-amber to-[#fce9b8]", ink: "text-amber-deep",
    panelAccent: "from-amber/20 via-transparent to-transparent",
    description: "Autonomous n8n and Make.com workflows connecting your entire tool stack with zero manual friction.",
    integrations: [
      { icon: faNetworkWired, label: "n8n Workflows" },
      { icon: faGears,        label: "Make.com"      },
      { icon: faPlug,         label: "WAPI Webhooks" },
      { icon: faSlack,        label: "Slack Alerts"  },
    ],
    tags: ["n8n Workflows", "Make.com", "WAPI & Webhooks", "Zero Manual Tasks"],
  },
  {
    id: "crm", label: "CRM & Sales Automation", icon: faHandshake,
    image: "/projects/operations-project.jpg",
    tint: "from-rose to-[#fce9dc]", ink: "text-rose-deep",
    panelAccent: "from-rose/20 via-transparent to-transparent",
    description: "Automated sales pipelines with instant lead scoring, AI follow-ups, and live CRM routing.",
    integrations: [
      { icon: faHubspot,   label: "HubSpot"      },
      { icon: faHandshake, label: "CRM Pipeline" },
      { icon: faChartLine, label: "Lead Scoring" },
      { icon: faEnvelope,  label: "Outreach Mail"},
    ],
    tags: ["Lead Scoring", "Auto Follow-up", "Pipeline Sync", "Revenue Insights"],
  },
  {
    id: "agents", label: "Custom AI Agents", icon: faRobot,
    image: "/projects/real-estate-project.jpg",
    tint: "from-sky to-[#d6e8f5]", ink: "text-sky-deep",
    panelAccent: "from-sky/20 via-transparent to-transparent",
    description: "Bespoke autonomous AI agents tailored to your business logic, reasoning, and tool execution.",
    integrations: [
      { icon: faRobot,     label: "Custom LLM"     },
      { icon: faBrain,     label: "Tool Calling"   },
      { icon: faGears,     label: "Automation Hub" },
      { icon: faChartLine, label: "Live Analytics" },
    ],
    tags: ["Autonomous Logic", "Multi-model", "API-first", "Enterprise Ready"],
  },
  {
    id: "integration", label: "AI Integration & RAG", icon: faPlug,
    image: "/projects/service-rag-supabase.jpg",
    tint: "from-sage to-[#d4eddc]", ink: "text-sage-deep",
    panelAccent: "from-sage/15 via-transparent to-transparent",
    description: "Production RAG architectures and Supabase vector database integration for proprietary data.",
    integrations: [
      { icon: faDatabase, label: "Supabase DB"    },
      { icon: faBrain,    label: "RAG Systems"    },
      { icon: faPlug,     label: "Vector Store"   },
      { icon: faGlobe,    label: "REST & Webhooks"},
    ],
    tags: ["Supabase Vector", "RAG Systems", "Custom LLM API", "Enterprise Knowledge"],
  },
  {
    id: "consulting", label: "AI Consulting & Strategy", icon: faLightbulb,
    image: "/gallery/strategy-session.jpg",
    tint: "from-peach to-[#fde8d7]", ink: "text-peach-deep",
    panelAccent: "from-peach/20 via-transparent to-transparent",
    description: "Strategic workflow audits, ROI modeling, and scalable AI infrastructure blueprints.",
    integrations: [
      { icon: faLightbulb, label: "Workflow Audit" },
      { icon: faChartLine, label: "ROI Modeling"   },
      { icon: faRobot,     label: "AI Architecture"},
      { icon: faCheck,     label: "Tech Selection" },
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

        <Reveal data-gsap className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-6 items-start">
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
                  <span className="relative z-10 font-semibold">{cat.label}</span>
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
                className="relative card overflow-hidden p-6 sm:p-8 lg:p-10 border border-line hover:border-brand/20 transition-all shadow-sm"
              >
                {/* Subtle per-service gradient wash in top-right corner */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 right-0 w-80 h-56 bg-gradient-to-bl ${active.panelAccent} rounded-bl-3xl`}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
                  <div>
                    <div className="flex items-start gap-4">
                      <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${active.tint} ${active.ink} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <FontAwesomeIcon icon={active.icon} className="text-base" />
                      </span>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight">
                          {active.label}
                        </h3>
                        <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed max-w-lg">
                          {active.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.tags.map((tag) => (
                        <span
                          key={tag}
                          className="chip border border-brand/10 hover:border-brand/30 transition-colors text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Clean Connected Ecosystem Chips */}
                    <div className="mt-8 pt-6 border-t border-line">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Core Integrations
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                        {active.integrations.map((it) => (
                          <div
                            key={it.label}
                            className="flex items-center gap-2.5 rounded-xl border border-line bg-paper/70 px-3.5 py-2.5 hover:border-brand/30 hover:bg-white transition-all shadow-2xs"
                          >
                            <span className="w-6 h-6 rounded-lg bg-white border border-line flex items-center justify-center text-brand flex-shrink-0">
                              <FontAwesomeIcon icon={it.icon} className="text-xs" />
                            </span>
                            <span className="text-xs font-semibold text-ink truncate">{it.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prominent High-Resolution Service Architecture Preview */}
                  <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-line/80 shadow-md group bg-paper">
                    <Image
                      src={active.image}
                      alt={active.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold text-ink shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                      Live System Architecture
                    </span>
                  </div>
                </div>

                <div className="relative mt-8 pt-6 border-t border-line flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-muted">Ready to deploy within 14 days with full technical handover.</p>
                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn btn-primary btn-sm shadow-md"
                  >
                    Deploy This System
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
