"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Zap, CheckCircle2, Clock, Cpu, Workflow, TrendingUp, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Reveal, ScrollTextReveal } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const outcomes = [
  {
    icon: Cpu,
    title: "Tailored AI Systems",
    badge: "100% Bespoke",
    desc: "Custom AI systems designed around your exact workflow and business goals — never generic, fragile templates.",
    iconGlow: "from-brand to-brand-deep text-white shadow-[0_8px_24px_rgba(91,71,224,0.4)]",
    tagColor: "bg-brand-tint text-brand border-brand/20",
  },
  {
    icon: Workflow,
    title: "Seamless Ecosystem Integrations",
    badge: "50+ Tools Connected",
    desc: "Deep two-way sync with your existing stack — CRMs, WhatsApp, Slack, Stripe, and internal databases.",
    iconGlow: "from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)]",
    tagColor: "bg-sky text-sky-deep border-sky-deep/20",
  },
  {
    icon: TrendingUp,
    title: "Autonomous Scalable Support",
    badge: "Enterprise Grade",
    desc: "Start lean and grow confidently. Our AI systems scale with your business volume without added headcount.",
    iconGlow: "from-[#059669] to-[#047857] text-white shadow-[0_8px_24px_rgba(5,150,105,0.35)]",
    tagColor: "bg-sage text-sage-deep border-sage-deep/20",
  },
];

const stats = [
  { value: "10x", label: "Faster workflows", icon: Zap, iconColor: "text-brand" },
  { value: "80%", label: "Less manual work", icon: CheckCircle2, iconColor: "text-sage-deep" },
  { value: "24/7", label: "AI uptime", icon: Clock, iconColor: "text-peach-deep" },
];

export default function GrowthSection() {
  const sectionRef = useRef(null);
  // GSAP scroll-reveal for the outcome cards + stat blocks (staggered).
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.12, y: 28 });

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto wash-peach rounded-[2rem] border border-line px-6 py-14 sm:px-10 lg:px-16 lg:py-20 relative overflow-hidden">
        {/* Soft ambient gradient wash inside the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-brand-tint/40 to-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-peach/40 to-transparent blur-3xl"
        />

        <div ref={sectionRef} className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Why NexGenFlows</p>
            <ScrollTextReveal className="display text-4xl sm:text-5xl">
              Built for <em>your growth</em>
            </ScrollTextReveal>
            <p className="mt-5 text-ink-soft leading-relaxed max-w-md">
              We don&apos;t just implement AI — we engineer intelligent growth engines. Every system we build is
              purpose-built to eliminate bottlenecks, accelerate decisions, and create compounding value for your
              business.
            </p>

            <dl className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-gsap
                  className="border-l-2 pl-4 rounded-l-sm"
                  style={{ borderImage: "linear-gradient(to bottom, var(--color-brand), #9a8af5) 1" }}
                >
                  <dd className="display text-4xl text-ink leading-none flex items-center gap-1.5">
                    {s.value}
                    <s.icon className={`w-4 h-4 ${s.iconColor} inline-block`} />
                  </dd>
                  <dt className="mt-1.5 text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>

            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary mt-9"
            >
              Explore Services
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
          </Reveal>

          {/* Right Column — Professional FAQ-style interactive cards with timeline connector and corner light */}
          <div className="relative pl-1 sm:pl-3">
            {/* Timeline vertical connector line */}
            <div
              aria-hidden="true"
              className="absolute left-[21px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand via-[#3b82f6]/40 to-line"
            />

            <div className="space-y-6">
              {outcomes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    data-gsap
                    className="relative flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Glowing Circular Icon Badge */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 shadow-md bg-gradient-to-br ${item.iconGlow} group-hover:scale-110`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Card Box with Pointer and Corner Ambient Light ("kone pe light") */}
                    <div className="flex-1 relative rounded-2xl bg-white border border-line p-5 sm:p-6 transition-all duration-300 group-hover:border-brand/40 group-hover:shadow-[0_16px_40px_-12px_rgba(91,71,224,0.18)] group-hover:-translate-y-1 shadow-sm overflow-hidden">
                      {/* Speech pointer */}
                      <div
                        aria-hidden="true"
                        className="hidden sm:block absolute -left-2 top-4 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_0_1px_rgba(0,0,0,0.03)]"
                      />

                      {/* Corner ambient light sheen on hover */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 right-0 w-36 h-28 bg-gradient-to-bl from-brand/12 via-[#3b82f6]/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-bold text-base sm:text-lg text-ink group-hover:text-brand transition-colors">
                            {item.title}
                          </h3>
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
