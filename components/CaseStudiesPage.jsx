"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCheck, faStar, faRobot, faHouse,
  faHospital, faBuilding, faArrowTrendUp, faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { CheckCircle2, Bell, CalendarCheck, MessageSquare, Database, FileText, PhoneCall, Sparkles, User, Bot, AlertCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, SectionHeading, CountUp } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const ease = [0.22, 1, 0.36, 1];

const filters = ["All projects", "Real Estate", "Healthcare", "Operations"];

const featuredStudy = {
  category: "Real Estate",
  badge: "Featured case study",
  title: "AI Lead Assistant for a Real Estate Agency",
  desc: "An AI automation system that captures, qualifies, and routes inbound property enquiries — 24/7, without any manual effort.",
  stats: [
    { value: 70, suffix: "%",  label: "Less manual work"    },
    { value: 60, suffix: "%",  label: "Faster lead response" },
    { text: "24/7",            label: "Always on"            },
    { value: 34, suffix: "%+", label: "Revenue growth"       },
  ],
};

const bottleneckSteps = [
  {
    num: "01", label: "Challenge", icon: faUsers,
    tint: "from-peach to-[#fde8d7] text-peach-deep",
    title: "Slow replies were losing leads",
    desc: "Agents were missing calls, phones and emails stacking up, promising leads going cold before anyone could respond.",
  },
  {
    num: "02", label: "Solution", icon: faRobot,
    tint: "from-brand-tint to-brand-tint-2 text-brand",
    title: "One AI assistant, every channel",
    desc: "A trained AI agent qualified leads via WhatsApp, website chat and email — scoring intent and routing hot leads instantly.",
  },
  {
    num: "03", label: "Result", icon: faArrowTrendUp,
    tint: "from-sage to-[#d4eddc] text-sage-deep",
    title: "More leads, less manual work",
    desc: "The team closed 34% more deals without hiring anyone. Response time dropped from hours to seconds.",
  },
];

const chartBars = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 42 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 60 },
  { label: "May", value: 75 },
  { label: "Jun", value: 90 },
];

const testimonial = {
  quote: "A smart, easy-to-use AI assistant that improved our response time dramatically. We went from losing leads to closing them.",
  name: "Sarah Chen",
  role: "Operations Manager, PropTech Agency",
};

const projects = [
  {
    id: "clinic", category: "Healthcare", icon: faHospital, badge: "New",
    image: "/projects/clinic-project.jpg",
    title: "Appointment Assistant for Clinics",
    desc: "Autonomous patient booking, calendar sync and reminder sequences.",
    stat: { value: "−45%", label: "Patient No-shows" },
    iconWrap: "from-peach to-[#fde8d7] text-peach-deep",
    accentBar: "from-peach-deep via-[#e88a55] to-transparent",
  },
  {
    id: "operations", category: "Operations", icon: faBuilding, badge: "Live",
    image: "/projects/operations-project.jpg",
    title: "Workflow Automation for Operations",
    desc: "Autonomous cross-app data routing across Slack, HubSpot, and Drive.",
    stat: { value: "13h", label: "Saved Weekly" },
    iconWrap: "from-sky to-[#d6e8f5] text-sky-deep",
    accentBar: "from-sky-deep via-[#4a9cc4] to-transparent",
  },
  {
    id: "voice", category: "Real Estate", icon: faHouse, badge: "Featured",
    image: "/projects/voice-ai-project.jpg",
    title: "AI Voice Agent for Real Estate",
    desc: "Human-grade voice agent handling inbound inquiries and scheduling viewings 24/7.",
    stat: { value: "24/7", label: "Live Coverage" },
    iconWrap: "from-brand-tint to-brand-tint-2 text-brand",
    accentBar: "from-brand via-[#9a8af5] to-transparent",
  },
];

/* ── Animated bar chart ─────────────────────────────────────── */
function AnimatedChart() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const max  = Math.max(...chartBars.map((b) => b.value));

  return (
    <div ref={ref} className="grad-border card p-6 h-full hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <p className="font-semibold text-ink">Qualified leads per week</p>
          <p className="text-xs text-muted mt-0.5">First six months after AI deployment</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-sage to-[#d4eddc] text-sage-deep text-xs font-semibold px-3 py-1 flex-shrink-0">
          <FontAwesomeIcon icon={faArrowTrendUp} className="text-[10px]" /> +34%
        </span>
      </div>

      <div
        className="flex items-end gap-3 h-40"
        role="img"
        aria-label="Bar chart: qualified leads per week rising from 30 in January to 90 in June"
      >
        {chartBars.map((bar, i) => {
          const isLast = i === chartBars.length - 1;
          return (
            <div key={bar.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
              <span className="text-xs font-semibold text-ink-soft">{bar.value}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: inView ? `${(bar.value / max) * 82}%` : 0 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease }}
                className="w-full rounded-t-lg overflow-hidden"
                style={
                  isLast
                    ? {
                        background:
                          "linear-gradient(to top, var(--color-brand), #9a8af5)",
                      }
                    : {
                        background:
                          "linear-gradient(to top, var(--color-brand-tint-2), var(--color-brand-tint))",
                      }
                }
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-2 pt-2 border-t border-line">
        {chartBars.map((bar) => (
          <span key={bar.label} className="flex-1 text-center text-xs text-muted">
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Featured mock card ─────────────────────────────────────── */
function MockCounter({ to, duration = 1.8, started }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) {
      setVal(0);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setVal(Math.round(latest)),
    });
    return () => controls.stop();
  }, [started, to, duration]);

  return <span>{val}</span>;
}

function FeaturedMock() {
  const cardRef = useRef(null);
  // Responsive scroll trigger: triggers when in view, resets when scrolled out of view on mobile/PC
  const inView = useInView(cardRef, { once: false, amount: 0.35 });
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0); // 0: init, 1: user msg, 2: typing, 3: reply 1, 4: typing 2, 5: confirmed

  useEffect(() => {
    if (!inView) {
      setStarted(false);
      setStep(0);
      return;
    }

    setStarted(true);

    // Realistic calm conversation tempo:
    const t1 = setTimeout(() => setStep(1), 500);   // User message pops in
    const t2 = setTimeout(() => setStep(2), 1600);  // AI typing dots appear
    const t3 = setTimeout(() => setStep(3), 4200);  // AI relaxed reply 1 appears (2.6s typing!)
    const t4 = setTimeout(() => setStep(4), 6200);  // Second typing dots ("Confirming booking...")
    const t5 = setTimeout(() => setStep(5), 8400);  // Final confirmation appears with checkmark

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [inView]);

  return (
    <div ref={cardRef} className="relative w-full max-w-[340px] pt-4 sm:pt-0">
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl blur-2xl opacity-25 bg-gradient-to-br from-brand via-[#9a8af5] to-peach-deep pointer-events-none scale-105" />
      <div className="relative card p-5 border border-brand/20 shadow-[0_24px_50px_-24px_rgba(60,45,150,0.38)] bg-white">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4" />
            </span>
            NexGen Assistant
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
          </span>
        </div>

        <div className="space-y-2.5 text-[0.82rem] leading-snug min-h-[145px] flex flex-col justify-start">
          {/* Message 1: User Query */}
          <AnimatePresence>
            {step >= 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-end"
              >
                <p className="bg-gradient-to-br from-brand to-brand-deep text-white rounded-2xl rounded-br-md px-3.5 py-2 max-w-[85%] shadow-xs">
                  Tell me about the listing on Baker Street
                </p>
              </motion.div>
            ) : (
              <div className="h-8" />
            )}
          </AnimatePresence>

          {/* Typing 1 */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-tint/80 text-brand text-xs w-fit"
              >
                <Bot className="w-3.5 h-3.5 animate-bounce" />
                <span className="text-[11px] font-medium">Assistant analyzing listing</span>
                <span className="flex gap-1 ml-0.5">
                  <span className="w-1 h-1 rounded-full bg-brand animate-ping" />
                  <span className="w-1 h-1 rounded-full bg-brand animate-ping delay-100" />
                  <span className="w-1 h-1 rounded-full bg-brand animate-ping delay-200" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply 1 (Relaxed timing) */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-paper border border-line text-ink rounded-2xl rounded-bl-md px-3.5 py-2 max-w-[90%]"
              >
                3-bed, £450k. I can book you a viewing — when works?
              </motion.p>
            )}
          </AnimatePresence>

          {/* Typing 2 */}
          <AnimatePresence>
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-tint/80 text-brand text-xs w-fit"
              >
                <CalendarCheck className="w-3.5 h-3.5 animate-bounce" />
                <span className="text-[11px] font-medium">Confirming booking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply 2: Confirmation */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-emerald-50 border border-emerald-200/70 text-emerald-900 rounded-2xl rounded-bl-md px-3.5 py-2 max-w-[90%] flex items-center justify-between gap-2 shadow-xs"
              >
                <span>Viewing booked for Thursday, 3pm.</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Animated Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-line/60">
          {[
            { label: "Leads",     value: 12, t: "from-brand-tint to-brand-tint-2 text-brand-deep" },
            { label: "Qualified", value: 9,  t: "from-sage to-[#d4eddc] text-sage-deep"           },
            { label: "Booked",    value: 5,  t: "from-peach to-[#fde8d7] text-peach-deep"         },
          ].map((s) => (
            <div key={s.label} className={`bg-gradient-to-br ${s.t} rounded-xl py-2.5 text-center`}>
              <p className="display text-2xl leading-none">
                <MockCounter to={s.value} started={started} duration={1.6} />
              </p>
              <p className="text-[0.7rem] mt-1 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  const [active, setActive] = useState("All projects");
  const show           = (cat) => active === "All projects" || active === cat;
  const visibleProjects= projects.filter((p) => show(p.category));
  const showFeatured   = show(featuredStudy.category);

  const stepsRef    = useRef(null);
  const projectsRef = useRef(null);

  useGsapReveal(stepsRef,    { selector: "[data-gsap]", stagger: 0.13, y: 30, start: "top 82%" });
  useGsapReveal(projectsRef, { selector: "[data-gsap]", stagger: 0.13, y: 30, start: "top 82%" });

  return (
    <div className="min-h-screen" style={{ background: "#f8f7fe" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative pt-36 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #ede9fc 0%, #f3f0fe 55%, #f8f7fe 100%)",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-brand/12 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-gradient-to-br from-[#9a8af5]/10 to-transparent blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow eyebrow--center"
          >
            Case studies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display mt-5 text-5xl sm:text-6xl lg:text-7xl"
          >
            From business challenge to <em>measurable flow.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-6 text-lg text-ink-soft leading-relaxed max-w-xl mx-auto"
          >
            A closer look at how intelligent automation turns everyday bottlenecks into real results.
          </motion.p>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-9 flex flex-wrap justify-center gap-2"
            role="group" aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-all ${
                  active === f
                    ? "bg-gradient-to-r from-brand to-brand-deep text-white border-transparent shadow-[0_4px_14px_-4px_rgba(91,71,224,0.45)]"
                    : "bg-white text-ink-soft border-line hover:border-brand/30 hover:text-brand"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured ── */}
      {showFeatured && (
        <section className="py-8 px-4 sm:px-6 lg:px-8" style={{ background: "#ffffff" }}>
          <Reveal
            className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-line p-8 lg:p-12"
            style={{
              background: "linear-gradient(135deg, #fff4ec 0%, #fbeefa 50%, #f1edfe 100%)",
            }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-brand/12 to-transparent blur-3xl" />
            <div aria-hidden="true" className="absolute top-0 left-12 right-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded-full bg-gradient-to-r from-brand to-brand-deep text-white text-xs font-semibold px-3 py-1">
                    {featuredStudy.badge}
                  </span>
                  <span className="rounded-full bg-white border border-line text-ink-soft text-xs font-medium px-3 py-1">
                    {featuredStudy.category}
                  </span>
                </div>
                <h2 className="display text-4xl sm:text-5xl">{featuredStudy.title}</h2>
                <p className="mt-4 text-ink-soft leading-relaxed">{featuredStudy.desc}</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
                  {featuredStudy.stats.map((s) => (
                    <div
                      key={s.label}
                      className="border-l-2 pl-4"
                      style={{ borderImage: "linear-gradient(to bottom, var(--color-brand), #9a8af5) 1" }}
                    >
                      <dd className="display text-4xl text-ink leading-none">
                        {s.text ?? <CountUp to={s.value} suffix={s.suffix} />}
                      </dd>
                      <dt className="mt-1.5 text-xs text-muted">{s.label}</dt>
                    </div>
                  ))}
                </dl>

                <Link href="/#contact" className="btn btn-primary mt-8 shadow-[0_8px_28px_-8px_rgba(91,71,224,0.4)]">
                  Read full case study <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </div>

              <div className="flex justify-center lg:justify-end">
                <FeaturedMock />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Approach steps ── */}
      {showFeatured && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-brand/8" style={{ background: "linear-gradient(180deg, #eee9fc 0%, #f3f0fe 100%)" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="The approach" align="left" className="mb-10">
              How we turned a bottleneck into <em>flow</em>
            </SectionHeading>

            <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {bottleneckSteps.map((step) => (
                <div key={step.num} data-gsap className="grad-border card p-6 hover:-translate-y-1.5">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.tint} flex items-center justify-center shadow-sm`}>
                      <FontAwesomeIcon icon={step.icon} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {step.num} · {step.label}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-ink uppercase tracking-tight leading-snug">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Reveal><AnimatedChart /></Reveal>
              <Reveal delay={0.08}>
                <div
                  className="grad-border card p-7 flex flex-col justify-between hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(160deg, var(--color-brand-tint) 0%, #ffffff 55%)",
                  }}
                >
                  <div>
                    <div className="flex gap-1 mb-5" role="img" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="text-[#e8a93a] text-sm drop-shadow-[0_1px_2px_rgba(232,169,58,0.25)]"
                        />
                      ))}
                    </div>
                    <blockquote className="display text-[1.75rem] leading-snug text-ink">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-7 pt-5 border-t border-brand-tint-2 flex items-center gap-3">
                    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand font-semibold text-sm flex items-center justify-center">
                      <User className="w-5 h-5 text-brand" />
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-ink">{testimonial.name}</p>
                      <p className="text-xs text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── More projects ── */}
      {visibleProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand/8" style={{ background: "#ffffff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="More work" align="left" className="mb-10">
              Explore other <em>projects</em>
            </SectionHeading>

            <div
              ref={projectsRef}
              className={`grid gap-5 ${
                visibleProjects.length === 1
                  ? "grid-cols-1 max-w-sm"
                  : visibleProjects.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-2xl"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {visibleProjects.map((p) => (
                <div key={p.id} data-gsap className="grad-border card p-6 flex flex-col group hover:-translate-y-2 transition-all duration-300">
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.iconWrap} flex items-center justify-center shadow-xs`}>
                        <FontAwesomeIcon icon={p.icon} className="text-xs" />
                      </span>
                      <span className="text-xs font-bold text-ink uppercase tracking-wider">{p.category}</span>
                    </span>
                    <span className="chip text-[11px] font-semibold border border-brand/15 bg-white/80">{p.badge}</span>
                  </div>

                  {/* Prominent Large Project Visual */}
                  <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden mb-5 bg-paper border border-line shadow-sm group-hover:shadow-md group-hover:border-brand/40 transition-all">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold text-ink shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Solution
                    </span>
                  </div>

                  {/* Clean Content */}
                  <h3 className="font-bold text-base sm:text-lg text-ink tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">
                    {p.desc}
                  </p>

                  {/* Impact Stat & Link */}
                  <div className="mt-5 pt-4 border-t border-line flex items-end justify-between">
                    <div>
                      <p className="display text-3xl font-extrabold text-brand leading-none">{p.stat.value}</p>
                      <p className="text-[11px] font-semibold text-muted mt-1 uppercase tracking-wider">{p.stat.label}</p>
                    </div>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
                    >
                      View Case Study <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand/8" style={{ background: "linear-gradient(180deg, #f3f0fe 0%, #ede9fc 100%)" }}>
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
              <p className="eyebrow mb-4">Your turn</p>
              <h2 className="display text-4xl sm:text-5xl">
                Let&apos;s build your <em>success story</em>
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Have a project in mind? Get in touch for a no-pressure chat about what&apos;s possible for you.
              </p>
            </div>
            <Link
              href="/#contact"
              className="btn btn-primary self-start lg:self-center px-8 py-4 shadow-[0_8px_28px_-8px_rgba(91,71,224,0.45)]"
            >
              Contact us <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
