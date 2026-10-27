"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faArrowRight, faComments } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const faqs = [
  {
    id: 1,
    question: "What services does NextGenFlow offer?",
    answer: "NextGenFlow offers a full suite of AI automation services including AI chatbots and support systems, AI voice agents, WhatsApp and lead automation, AI workflow automation, CRM and sales automation, custom AI agents, AI integration, and AI consulting and strategy. Each solution is tailored to your specific business needs.",
  },
  {
    id: 2,
    question: "How can AI automation help my business?",
    answer: "AI automation can dramatically reduce manual effort, speed up response times, eliminate human error, and allow your team to focus on high-value tasks. Common benefits include 24/7 customer support coverage, faster lead qualification, automated data entry, and streamlined operations — all of which contribute to lower costs and higher growth.",
  },
  {
    id: 3,
    question: "What are AI agents, and how can they help my team?",
    answer: "AI agents are autonomous software systems that can perceive information, reason, plan, and take actions on behalf of your team. Unlike simple chatbots, they can handle multi-step tasks like researching leads, updating CRMs, sending follow-ups, and more — acting as a digital team member that never sleeps.",
  },
  {
    id: 4,
    question: "Can you build a custom solution or MVP?",
    answer: "Absolutely. We specialise in building custom AI solutions and rapid MVPs tailored to your exact workflow. Whether you need a proof-of-concept to validate an idea or a full production system, our team can scope, design, and deliver it efficiently.",
  },
  {
    id: 5,
    question: "How much do your services cost?",
    answer: "Pricing varies depending on the complexity, scope, and scale of your project. We offer flexible engagement models — from fixed-price projects to ongoing retainer agreements. The best way to get an accurate estimate is to book a free strategy call so we can understand your specific requirements.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const sectionRef = useRef(null);

  // Stagger the accordion items + the sticky intro card in on scroll.
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.1, y: 28, start: "top 85%" });

  return (
    <section id="faq" className="py-24 lg:py-32 border-y border-brand/8" style={{ background: "linear-gradient(180deg, #eee9fc 0%, #f3f0fe 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-14">
          {/* Left — sticky intro */}
          <div data-gsap className="lg:sticky lg:top-28 h-fit">
            <Reveal>
              <p className="eyebrow mb-4">FAQ</p>
              <h2 className="display text-4xl sm:text-5xl">
                Got questions? We&apos;ve got <em>answers.</em>
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-sm">
                Can&apos;t find what you&apos;re looking for? Reach out to our team directly — we&apos;re always happy to
                help.
              </p>
            </Reveal>

            <div
              data-gsap
              className="relative mt-8 rounded-2xl overflow-hidden bg-brand-tint border border-brand-tint-2 p-6 max-w-sm"
            >
              {/* Decorative gradient corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand/20 to-transparent blur-2xl"
              />
              <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white to-brand-tint-2 text-brand flex items-center justify-center mb-4 shadow-sm">
                <FontAwesomeIcon icon={faComments} className="text-sm" />
              </span>
              <h3 className="relative font-semibold text-ink">Still have a question?</h3>
              <p className="relative mt-1.5 text-sm text-ink-soft leading-relaxed">
                Talk to our team and we&apos;ll help you find the right solution.
              </p>
              <a href="mailto:hello@nextgenflow.ai" className="relative btn btn-primary btn-sm mt-5">
                Talk to our team
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const open = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  data-gsap
                  className={`rounded-2xl border bg-white transition-colors ${
                    open
                      ? "border-transparent shadow-[0_10px_30px_-18px_rgba(60,45,150,0.3)]"
                      : "border-line hover:border-[#d3cdea]"
                  }`}
                >
                  <h3>
                    <button
                      onClick={() => setOpenId(open ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${faq.id}`}
                    >
                      <span className={`font-semibold leading-snug ${open ? "text-brand-deep" : "text-ink"}`}>
                        {faq.question}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          open
                            ? "bg-gradient-to-br from-brand to-brand-deep text-white"
                            : "bg-paper text-muted"
                        }`}
                      >
                        <FontAwesomeIcon icon={open ? faMinus : faPlus} className="text-xs" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {/* Gradient left accent inside the open answer */}
                        <div className="relative px-6 pb-6">
                          <span
                            aria-hidden="true"
                            className="absolute left-6 top-0 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-brand via-[#9a8af5] to-peach-deep opacity-30"
                          />
                          <p className="relative pl-4 text-ink-soft leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
