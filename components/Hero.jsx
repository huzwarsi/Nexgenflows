"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, faCheck, faRobot, faPaperPlane,
  faCalendarCheck, faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/Motion";

const metrics = [
  { value: 3.2, decimals: 1, suffix: "M+", label: "Tasks automated" },
  { value: 40, suffix: "+", label: "Businesses served" },
  { value: 98, suffix: "%", label: "Client retention" },
];

const pills = ["No headcount needed", "Live in 2 weeks", "Works 24/7"];
const ease = [0.22, 1, 0.36, 1];

function LiveCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease }}
      className="relative w-full max-w-[420px] mx-auto"
    >
      {/* Glow ring behind card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br from-brand via-[#9a8af5] to-peach-deep pointer-events-none scale-105"
      />
      <div className="relative card overflow-hidden shadow-[0_24px_60px_-24px_rgba(60,45,150,0.38)] rounded-2xl border border-brand/20">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-paper">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
          </div>
          <span className="text-xs text-muted font-medium">Sales assistant</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-sage-deep">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-deep animate-dot-pulse" />
            Live
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Agent */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 flex items-center justify-center text-brand shadow-sm">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-ink leading-tight">Your AI Sales Agent</p>
              <p className="text-xs text-muted mt-0.5">Handling 12 live conversations</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Leads", value: "24", tint: "from-brand-tint to-brand-tint-2", text: "text-brand-deep" },
              { label: "Replied", value: "24", tint: "from-sage to-[#d4eddc]", text: "text-sage-deep" },
              { label: "Booked", value: "7", tint: "from-peach to-[#fde8d7]", text: "text-peach-deep" },
            ].map((m) => (
              <div key={m.label} className={`bg-gradient-to-br ${m.tint} rounded-xl px-3 py-3`}>
                <p className={`display text-3xl ${m.text}`}>{m.value}</p>
                <p className="text-xs text-ink-soft mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted font-medium">Pipeline filled</span>
              <span className="font-semibold text-ink">78%</span>
            </div>
            <div className="h-2 rounded-full bg-brand-tint overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-brand via-[#7c6de8] to-[#9a8af5]"
              />
            </div>
          </div>

          {/* Message */}
          <div className="rounded-xl border border-line bg-paper p-4">
            <div className="flex items-center gap-2 mb-2 text-xs text-muted">
              <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faWhatsapp} className="text-[11px]" />
              </span>
              WhatsApp · just now
            </div>
            <p className="text-sm text-ink leading-relaxed">
              &ldquo;Hi, I saw your ad — I&apos;m interested in your pricing.&rdquo;
            </p>
            <p className="mt-2.5 pt-2.5 border-t border-line text-xs font-semibold text-sage-deep flex items-center gap-1.5">
              <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
              AI replied in 0.4s
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-line bg-white pl-4 pr-1.5 py-1.5">
            <span className="text-sm text-muted flex-1">Ask your assistant anything…</span>
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center" aria-hidden="true">
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            </span>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease }}
        className="hidden sm:flex absolute -right-10 top-8 card items-center gap-3 px-3.5 py-3 border border-peach shadow-md"
      >
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-peach to-[#fde8d7] text-peach-deep flex items-center justify-center">
          <FontAwesomeIcon icon={faCalendarCheck} className="text-sm" />
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">New booking</p>
          <p className="text-xs text-muted">Meeting confirmed</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease }}
        className="hidden sm:flex absolute -left-10 -bottom-6 card items-center gap-3 px-3.5 py-3 border border-sage shadow-md"
      >
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-sage to-[#d4eddc] text-sage-deep flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowTrendUp} className="text-sm" />
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">Revenue +34%</p>
          <p className="text-xs text-muted">This month</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  // Slow floating orb animation — purely decorative, no scroll deps
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(orb1Ref.current, { x: 40, y: -30, duration: 8, ease: "sine.inOut" }, 0)
      .to(orb2Ref.current, { x: -35, y: 25, duration: 9, ease: "sine.inOut" }, 0)
      .to(orb3Ref.current, { x: 20, y: 40, duration: 10, ease: "sine.inOut" }, 0);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, transparent 72%, var(--color-paper) 100%), radial-gradient(60rem 28rem at 100% 0%, rgba(91,71,224,0.09), transparent 60%), radial-gradient(40rem 24rem at 0% 100%, rgba(252,233,220,0.7), transparent 60%), var(--color-paper)",
      }}
    >
      {/* Decorative orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={orb1Ref}
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-brand/10 to-[#9a8af5]/5 blur-3xl"
        />
        <div
          ref={orb2Ref}
          className="absolute top-1/3 -left-40 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-peach/30 to-brand-tint/20 blur-3xl"
        />
        <div
          ref={orb3Ref}
          className="absolute bottom-0 right-1/3 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-brand-tint/30 to-sage/20 blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-12 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand/20 px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-soft shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              AI automation for growing businesses
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="display mt-6 text-[3.4rem] sm:text-7xl lg:text-[5.4rem]"
            >
              Your next hire is an <em>AI agent.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md"
            >
              NexGenFlows automates the work that slows your team down — lead replies, follow-ups, bookings and more.
              Live in days, not months.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
            >
              {pills.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheck} className="text-[8px]" />
                  </span>
                  {p}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button onClick={() => go("#contact")} className="btn btn-primary">
                Book a Free Call
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
              <button onClick={() => go("#case-studies")} className="btn btn-ghost flex items-center gap-1.5">
                See Our Work
                <ArrowUpRight className="w-4 h-4 text-ink-soft" />
              </button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-line grid grid-cols-3 gap-4 sm:flex sm:gap-x-10"
            >
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="display text-3xl sm:text-4xl text-ink leading-none">
                    <CountUp to={m.value} decimals={m.decimals} suffix={m.suffix} />
                  </dd>
                  <p className="text-sm text-muted mt-1.5" aria-hidden="true">{m.label}</p>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <LiveCard />
          </div>
        </div>
      </div>
    </section>
  );
}
