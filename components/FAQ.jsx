"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { Reveal, ScrollTextReveal } from "@/components/Motion";

const faqs = [
  {
    id: 1,
    question: "What services does NexGenFlows offer?",
    answer: "We build autonomous AI agents, automated CRM pipelines, intelligent voice assistants, custom SaaS platforms, and seamless API integrations.",
  },
  {
    id: 2,
    question: "How can AI automation help my business?",
    answer: "It eliminates manual repetitive tasks, handles client inquiries 24/7, and speeds up operations so your team can focus on growth.",
  },
  {
    id: 3,
    question: "What are AI agents, and how are they different?",
    answer: "Unlike basic chatbots, AI agents can reason, execute multi-step workflows, query databases, and update systems on autopilot.",
  },
  {
    id: 4,
    question: "How long does implementation take?",
    answer: "Standard workflow automations launch in 1 to 2 weeks. Custom agents and enterprise-grade systems typically take 3 to 4 weeks.",
  },
  {
    id: 5,
    question: "Do you integrate with our existing tools?",
    answer: "Yes. We connect natively with HubSpot, Salesforce, WhatsApp, Twilio, Slack, Google Workspace, PostgreSQL, and custom REST APIs.",
  },
  {
    id: 6,
    question: "How do we get started?",
    answer: "Book a free 15-minute discovery call. We'll identify your biggest bottlenecks and map out a clean, actionable automation roadmap.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const sectionRef = useRef(null);

  // Track scroll within FAQ section to animate NG logo downwards as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 70%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const logoY = useTransform(smoothProgress, [0, 1], [0, 240]);
  const logoRotate = useTransform(smoothProgress, [0, 0.5, 1], [-3, 2, -2]);
  const logoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1.04, 1]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#faf9fc] border-y border-brand/10 relative overflow-hidden"
    >
      {/* Background ambient glow matching brand neon blue/violet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 bg-brand/8 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#3b82f6]/8 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column — Sticky heading + scroll-animated 3D NG logo */}
          <div className="lg:sticky lg:top-28 h-fit text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-tint border border-brand/20 shadow-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Our FAQs</span>
              </div>

              <ScrollTextReveal className="display text-4xl sm:text-5xl">
                Do you have any <em>question in mind?</em>
              </ScrollTextReveal>

              <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-sm">
                Everything you need to know about partnering with us, our automation frameworks, and delivery timelines.
              </p>
            </Reveal>

            {/* 3D NG Emblem — actively animates DOWNWARDS as the user scrolls */}
            <motion.div
              style={{
                y: logoY,
                rotate: logoRotate,
                scale: logoScale,
              }}
              className="relative w-60 h-60 sm:w-72 sm:h-72 mt-8 mx-auto lg:mx-0 select-none pointer-events-none"
            >
              <Image
                src="/Neon_Gradient_NG_Ribbon_Emblem-removebg-preview.png"
                alt="NexGenFlows NG Emblem"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-contain drop-shadow-[0_25px_50px_rgba(91,71,224,0.35)]"
                priority
              />
            </motion.div>
          </div>

          {/* Right Column — Cards with connector line and professional SVG icons */}
          <div className="relative pl-2 sm:pl-4">
            {/* Timeline vertical guide line in brand blue/violet gradient */}
            <div
              aria-hidden="true"
              className="absolute left-[23px] sm:left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand via-brand/40 to-line"
            />

            <div className="space-y-6">
              {faqs.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <Reveal key={faq.id} delay={idx * 0.05}>
                    <div className="relative flex items-start gap-4 sm:gap-6 group">
                      
                      {/* Professional SVG Help Icon Badge in brand neon violet/blue gradient */}
                      <button
                        type="button"
                        onClick={() => toggle(faq.id)}
                        aria-label={`Toggle ${faq.question}`}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 cursor-pointer shadow-md ${
                          isOpen
                            ? "bg-gradient-to-br from-brand to-brand-deep text-white shadow-[0_6px_20px_rgba(91,71,224,0.45)] scale-110"
                            : "bg-white border-2 border-brand/30 text-brand group-hover:border-brand group-hover:scale-105"
                        }`}
                      >
                        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>

                      {/* Card with subtle speech pointer and brand styling */}
                      <div
                        onClick={() => toggle(faq.id)}
                        className={`flex-1 relative rounded-2xl bg-white border p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
                          isOpen
                            ? "border-brand/40 shadow-[0_12px_36px_-12px_rgba(91,71,224,0.2)] ring-1 ring-brand/20"
                            : "border-line hover:border-brand/30 shadow-sm"
                        }`}
                      >
                        {/* Triangle pointer */}
                        <div
                          aria-hidden="true"
                          className="hidden sm:block absolute -left-2 top-3 sm:top-4 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white drop-shadow-[-1px_0_1px_rgba(0,0,0,0.03)]"
                        />

                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-bold text-sm sm:text-base text-ink tracking-tight">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                              isOpen ? "bg-brand-tint text-brand" : "bg-paper text-muted"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-3 pt-3 border-t border-line/50 text-sm text-ink-soft leading-relaxed font-normal">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
