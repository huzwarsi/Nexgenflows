"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faWrench, faGears, faRocket } from "@fortawesome/free-solid-svg-icons";
import { SectionHeading } from "@/components/Motion";
import { useGsapReveal, useGsapLine } from "@/components/useGsap";

const steps = [
  {
    number: "01", title: "Discover", icon: faMagnifyingGlass,
    description: "We dive deep into your business, understand your workflow bottlenecks, and map out exactly where AI can create the most impact.",
    tint: "from-brand-tint to-brand-tint-2 text-brand",
  },
  {
    number: "02", title: "Build", icon: faWrench,
    description: "Our team designs and develops the right automation solution — tailored to your stack, your team, and your goals.",
    tint: "from-peach to-[#fde8d7] text-peach-deep",
  },
  {
    number: "03", title: "Automate", icon: faGears,
    description: "We connect your systems, deploy intelligent workflows, and ensure everything runs smoothly from day one.",
    tint: "from-sage to-[#d4eddc] text-sage-deep",
  },
  {
    number: "04", title: "Grow", icon: faRocket,
    description: "Track performance, measure ROI, and continuously optimize. Your automation gets smarter as your business scales.",
    tint: "from-sky to-[#d6e8f5] text-sky-deep",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  // Stagger the four step cards in on scroll.
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.14, y: 30, start: "top 80%" });
  // Draw the connector lines between steps from left → right.
  useGsapLine(sectionRef, { selector: "[data-gsap-line]", axis: "x", start: "top 80%" });

  return (
    <section id="solutions" className="py-24 lg:py-32 border-y border-brand/8" style={{ background: "linear-gradient(180deg, #eee9fc 0%, #f3f0fe 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The process" className="mb-16">
          A simple process. <em>Real results.</em>
        </SectionHeading>

        <ol ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, i) => (
            <li key={step.title} data-gsap className="relative grad-border card p-6 hover:-translate-y-1.5">
              {/* connector (desktop) — drawn in by GSAP */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  data-gsap-line
                  className="hidden lg:block absolute top-[3.25rem] left-[5.5rem] right-[-1rem] h-[2px] rounded-full bg-gradient-to-r from-brand/50 via-[#9a8af5]/40 to-line"
                />
              )}
              <div className="flex items-center gap-4">
                <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.tint} flex items-center justify-center shadow-sm`}>
                  <FontAwesomeIcon icon={step.icon} />
                </span>
                <span className="display text-4xl text-brand/30">{step.number}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
