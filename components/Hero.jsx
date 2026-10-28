"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  Sparkles, ArrowUpRight, Bot, TrendingUp, Calendar, Send, CheckCircle2, Zap
} from "lucide-react";
import { CountUp } from "@/components/Motion";

const metrics = [
  { value: 3.2, decimals: 1, suffix: "M+", label: "Tasks automated" },
  { value: 40, suffix: "+", label: "Businesses served" },
  { value: 98, suffix: "%", label: "Client retention" },
];

const pills = ["No headcount needed", "Live in 2 weeks", "Works 24/7"];
const ease = [0.22, 1, 0.36, 1];

function AnimatedCounter({ to, duration = 1.8, started, suffix = "" }) {
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

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

function LiveCard() {
  const cardRef = useRef(null);
  // Trigger on both PC and mobile when in view; resets when scrolled completely out of view
  const isInView = useInView(cardRef, { amount: 0.3, once: false });
  const [started, setStarted] = useState(false);

  const fullText = "Hi, I saw your ad — I'm interested in your pricing.";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAiDots, setShowAiDots] = useState(false);
  const [showAiReply, setShowAiReply] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setStarted(false);
      setTypedText("");
      setIsTyping(false);
      setShowAiDots(false);
      setShowAiReply(false);
      return;
    }

    setStarted(true);
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        // Calm, professional pause before AI starts analyzing
        const t1 = setTimeout(() => setShowAiDots(true), 600);
        // AI takes a relaxed 2.4s to formulate response (not rushed)
        const t2 = setTimeout(() => {
          setShowAiDots(false);
          setShowAiReply(true);
        }, 3000);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }, 42);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="relative w-full max-w-[440px] mx-auto pt-4 sm:pt-0"
    >
      {/* Glow ring behind card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl blur-2xl opacity-25 bg-gradient-to-br from-brand via-[#7c6de8] to-cyan-400 pointer-events-none scale-105"
      />

      <div className="relative card overflow-hidden shadow-[0_24px_60px_-24px_rgba(60,45,150,0.35)] rounded-2xl border border-brand/20 bg-white">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-paper">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1ef]" />
          </div>
          <span className="text-xs text-muted font-medium flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-brand" /> Sales Assistant
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* Agent Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white shadow-[0_4px_16px_rgba(91,71,224,0.35)]">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-ink leading-tight">Your Autonomous Sales Agent</p>
              <p className="text-xs text-muted mt-0.5">Handling 12 live client conversations</p>
            </div>
          </div>

          {/* Metrics with AnimatedCounter */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Leads", value: 24, tint: "from-brand-tint to-brand-tint-2", text: "text-brand-deep" },
              { label: "Replied", value: 24, tint: "from-[#ecfdf5] to-[#d1fae5]", text: "text-emerald-700" },
              { label: "Booked", value: 7, tint: "from-[#eff6ff] to-[#dbeafe]", text: "text-blue-700" },
            ].map((m) => (
              <div key={m.label} className={`bg-gradient-to-br ${m.tint} rounded-xl px-3 py-2.5 border border-line/60`}>
                <p className={`display text-2xl sm:text-3xl font-extrabold ${m.text}`}>
                  <AnimatedCounter to={m.value} started={started} duration={1.6} />
                </p>
                <p className="text-[11px] font-semibold text-ink-soft mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-muted">Pipeline filled</span>
              <span className="font-bold text-brand">
                <AnimatedCounter to={78} started={started} suffix="%" duration={1.8} />
              </span>
            </div>
            <div className="h-2 rounded-full bg-brand-tint overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: started ? "78%" : "0%" }}
                transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-brand via-[#7c6de8] to-cyan-400"
              />
            </div>
          </div>

          {/* Live Chat Simulation */}
          <div className="space-y-2.5 pt-1">
            {/* User Message (Typing Animation) */}
            <div className="rounded-2xl border border-line bg-paper/80 p-3.5">
              <div className="flex items-center justify-between mb-1 text-[11px] text-muted">
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px]">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </span>
                  WhatsApp Inbound
                </span>
                <span className="text-muted/70">just now</span>
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed font-normal min-h-[22px]">
                &ldquo;{typedText}&rdquo;
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-brand ml-0.5 animate-pulse" />}
              </p>
            </div>

            {/* AI Typing Indicator */}
            <AnimatePresence>
              {showAiDots && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-tint/60 text-brand text-xs font-medium w-fit"
                >
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                  <span>AI agent analyzing intent</span>
                  <span className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping delay-200" />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Generated Reply */}
            <AnimatePresence>
              {showAiReply && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-brand/25 bg-gradient-to-br from-brand-tint/70 to-white p-3.5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5 text-[11px]">
                    <span className="flex items-center gap-1.5 font-bold text-brand">
                      <Sparkles className="w-3.5 h-3.5" /> NexGenFlow AI
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Replied in 2.1s
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink leading-relaxed">
                    &ldquo;Hey! We automate client bookings and pipeline routing in under 14 days. When works for a 15-min discovery call?&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Input Bar */}
          <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
            <span className="text-xs text-muted flex-1 pl-1">Ask your assistant anything…</span>
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center shadow-sm" aria-hidden="true">
              <Send className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: New Booking (Continuous Animation) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -8, 0],
        }}
        transition={{
          x: { duration: 0.6, delay: 0.8 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
        className="hidden sm:flex absolute -right-8 top-10 card items-center gap-3 px-4 py-3 border border-brand/25 shadow-lg bg-white/95 backdrop-blur-md rounded-2xl z-20"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center shadow-sm">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-ink leading-tight">New booking</p>
          <p className="text-[11px] text-muted">Meeting confirmed</p>
        </div>
      </motion.div>

      {/* Floating Badge 2: Revenue +34% (Continuous Animation) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, 8, 0],
        }}
        transition={{
          x: { duration: 0.6, delay: 1.0 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
        }}
        className="hidden sm:flex absolute -left-8 -bottom-4 card items-center gap-3 px-4 py-3 border border-emerald-500/25 shadow-lg bg-white/95 backdrop-blur-md rounded-2xl z-20"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-sm">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-ink leading-tight">Revenue +34%</p>
          <p className="text-[11px] text-muted">This month</p>
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
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
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
              NexGenFlows automates the work that slows your team down — <span className="font-semibold text-ink">lead replies</span>, <span className="font-semibold text-ink">follow-ups</span>, <span className="font-semibold text-ink">bookings</span> and more. Live in <span className="font-semibold text-ink">days</span>, not months.
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
          <div className="flex justify-center lg:justify-end mt-8 sm:mt-10 lg:mt-0 w-full">
            <LiveCard />
          </div>
        </div>
      </div>
    </section>
  );
}
