"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCheck, faHouse, faHospital,
  faBuilding, faCalendarCheck, faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faSlack, faHubspot, faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { Clock, User } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

/* ── Mini dashboard sub-components ─────────────────────────────── */
function MiniCounter({ to, suffix = "", inView }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setVal(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span>{val}{suffix}</span>;
}

function Panel({ title, badge, badgeClass, badgeDot, children }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-ink">{title}</span>
        <span className={`text-[0.7rem] font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {badgeDot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1" />}
          {badge}
        </span>
      </div>
      <div className="divide-y divide-line">{children}</div>
    </div>
  );
}

function RealEstateDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  const leads = [
    { name: "John M.",  stage: "Qualified",      icon: faCheck,      color: "text-sage-deep" },
    { name: "Sarah K.", stage: "In conversation", icon: faWhatsapp,   color: "text-[#1fa855]" },
    { name: "Alex T.",  stage: "Follow-up",       icon: faArrowRight, color: "text-brand" },
  ];
  return (
    <div ref={ref}>
      <Panel title="Lead pipeline" badge="Active" badgeClass="bg-sage text-sage-deep" badgeDot>
        {leads.map((l, idx) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: inView ? idx * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between py-2.5"
          >
            <span className="flex items-center gap-2.5 text-sm text-ink">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand-deep text-xs font-semibold flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </span>
              {l.name}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <FontAwesomeIcon icon={l.icon} className={`text-[10px] ${l.color}`} />
              {l.stage}
            </span>
          </motion.div>
        ))}
      </Panel>
    </div>
  );
}

function ClinicDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  const appts = [
    { time: "09:00", name: "Emma Wilson", status: "Confirmed" },
    { time: "10:30", name: "James Lee",   status: "Reminder sent" },
    { time: "14:00", name: "Maria Garcia",status: "Auto-booked" },
  ];
  return (
    <div ref={ref}>
      <Panel title="Today's schedule" badge="4 upcoming" badgeClass="bg-peach text-peach-deep" badgeDot>
        {appts.map((a, idx) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: inView ? idx * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between py-2.5"
          >
            <span className="flex items-center gap-2.5 text-sm text-ink">
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-peach-deep bg-peach rounded px-2 py-0.5">
                <Clock className="w-3 h-3 text-peach-deep" />
                {a.time}
              </span>
              {a.name}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-[10px] text-peach-deep" />
              {a.status}
            </span>
          </motion.div>
        ))}
      </Panel>
    </div>
  );
}

function OperationsDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35, once: false });

  const flows = [
    { app: "Slack",    icon: faSlack,       action: "Notifications",  num: 48,  suffix: " sent"    },
    { app: "HubSpot",  icon: faHubspot,     action: "CRM sync",        num: 120, suffix: " records"},
    { app: "Drive",    icon: faGoogleDrive, action: "File automation", num: 32,  suffix: " docs"    },
  ];
  return (
    <div ref={ref}>
      <Panel title="Automation status" badge="Running" badgeClass="bg-sage text-sage-deep" badgeDot>
        {flows.map((f, idx) => (
          <motion.div
            key={f.app}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: inView ? idx * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between py-2.5"
          >
            <span className="flex items-center gap-2.5 text-sm text-ink">
              <span className="w-7 h-7 rounded-lg bg-white border border-line flex items-center justify-center text-muted shadow-xs">
                <FontAwesomeIcon icon={f.icon} className="text-xs text-brand" />
              </span>
              <span>
                {f.app}
                <span className="block text-xs text-muted leading-tight">{f.action}</span>
              </span>
            </span>
            <span className="text-xs font-semibold text-sky-deep bg-sky rounded-full px-2.5 py-1">
              <MiniCounter to={f.num} suffix={f.suffix} inView={inView} />
            </span>
          </motion.div>
        ))}
      </Panel>
    </div>
  );
}

/* ── Case study data ────────────────────────────────────────────── */
const caseStudies = [
  {
    id: "real-estate", category: "Real Estate", icon: faHouse,
    image: "/projects/real-estate-project.jpg",
    iconWrap: "from-brand-tint to-brand-tint-2 text-brand",
    accentBar: "from-brand via-[#9a8af5] to-transparent",
    title: "AI Lead Assistant for Real Estate",
    description: "An intelligent lead qualification assistant that automatically engages, scores, and routes inbound property inquiries — 24/7.",
    outcomes: ["Automated lead qualification", "Faster response times", "Improved lead management"],
    Dashboard: RealEstateDashboard,
  },
  {
    id: "clinic", category: "Healthcare", icon: faHospital,
    image: "/projects/clinic-project.jpg",
    iconWrap: "from-peach to-[#fde8d7] text-peach-deep",
    accentBar: "from-peach-deep via-[#e88a55] to-transparent",
    title: "Appointment Assistant for Clinics",
    description: "A smart scheduling assistant that handles patient appointment booking, reminders, and rescheduling automatically.",
    outcomes: ["Automated appointment scheduling", "Reminder notifications", "Reduced manual coordination"],
    Dashboard: ClinicDashboard,
  },
  {
    id: "operations", category: "Operations", icon: faBuilding,
    image: "/projects/operations-project.jpg",
    iconWrap: "from-sky to-[#d6e8f5] text-sky-deep",
    accentBar: "from-sky-deep via-[#4a9cc4] to-transparent",
    title: "Workflow Automation for Operations",
    description: "A connected automation layer that links business applications, eliminates repetitive tasks, and improves operational efficiency.",
    outcomes: ["Connected business applications", "Automated repetitive tasks", "Improved operational efficiency"],
    Dashboard: OperationsDashboard,
  },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function CaseStudies() {
  const sectionRef = useRef(null);
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.13, y: 32, start: "top 82%" });

  return (
    <section id="case-studies" className="py-24 lg:py-32 border-y border-brand/8" style={{ background: "linear-gradient(180deg, #f3f0fe 0%, #ede9fc 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading eyebrow="Case studies" align="left">
            Real solutions for <em>real businesses</em>
          </SectionHeading>
          <Reveal>
            <Link href="/case-studies" className="btn btn-ghost">
              View all case studies
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </Reveal>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((s) => {
            const Dash = s.Dashboard;
            return (
              <div
                key={s.id}
                data-gsap
                className="grad-border card p-6 flex flex-col group hover:-translate-y-2"
              >
                {/* Gradient top accent bar — animates on hover via grad-border ::after */}
                <div
                  aria-hidden="true"
                  className={`h-[3px] w-full rounded-full bg-gradient-to-r ${s.accentBar} mb-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Project visual preview */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 bg-paper border border-line/60 group-hover:border-brand/30 shadow-xs transition-all">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] font-bold text-ink shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    {s.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.iconWrap} flex items-center justify-center shadow-sm`}>
                    <FontAwesomeIcon icon={s.icon} className="text-sm" />
                  </span>
                  <span className="text-sm font-semibold text-ink-soft">{s.category}</span>
                </div>

                <Dash />

                <h3 className="font-bold text-lg text-ink tracking-tight leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">{s.description}</p>

                <ul className="mt-5 space-y-2">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <FontAwesomeIcon icon={faCheck} className="text-xs text-brand" />
                      {o}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/case-studies"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
                >
                  View case study
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
