"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPuzzlePiece, faPlug, faChartLine, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Zap, CheckCircle2, Clock } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const outcomes = [
  {
    icon: faPuzzlePiece,
    title: "Tailored solutions",
    desc: "Custom AI systems designed around your exact workflow and business goals — not generic templates.",
    iconWrap: "from-brand-tint to-brand-tint-2 text-brand",
  },
  {
    icon: faPlug,
    title: "Seamless integrations",
    desc: "Connect effortlessly with your existing tools — CRMs, ERPs, messaging platforms, and more.",
    iconWrap: "from-peach to-[#fde8d7] text-peach-deep",
  },
  {
    icon: faChartLine,
    title: "Scalable support",
    desc: "Start lean and grow confidently. Our AI systems scale with your business without added overhead.",
    iconWrap: "from-sage to-[#d4eddc] text-sage-deep",
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
            <h2 className="display text-4xl sm:text-5xl">
              Built for <em>your growth</em>
            </h2>
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

          <div className="space-y-4">
            {outcomes.map((item) => (
              <div
                key={item.title}
                data-gsap
                className="grad-border card flex items-start gap-4 p-5 bg-white/90 hover:-translate-y-1"
              >
                <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconWrap} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
