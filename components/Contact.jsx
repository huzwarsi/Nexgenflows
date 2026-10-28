"use client";
import { useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendarCheck, faRobot, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useGsapReveal } from "@/components/useGsap";

const perks = [
  { icon: faCalendarCheck, label: "Free strategy call",   tint: "from-sage to-[#d4eddc] text-sage-deep"      },
  { icon: faRobot,         label: "Practical AI solutions",tint: "from-brand-tint to-brand-tint-2 text-brand" },
  { icon: faBolt,          label: "Quick turnaround",      tint: "from-amber to-[#fce9b8] text-amber-deep"   },
];

export default function Contact() {
  const sectionRef = useRef(null);
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.12, y: 28, start: "top 88%" });

  return (
    <section id="contact" ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div
        data-gsap
        className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-brand/15 px-6 py-16 sm:px-12 lg:py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, #efeafe 0%, #f8effa 45%, #fdeee3 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-brand/15 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-peach/35 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full bg-gradient-to-r from-brand-tint/50 to-rose/20 blur-3xl" />

        {/* Gradient top bar */}
        <div aria-hidden="true" className="absolute top-0 left-16 right-16 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

        <div className="relative">
          <p data-gsap className="eyebrow eyebrow--center mb-5">Free strategy call — no commitment</p>

          <h2 data-gsap className="display text-5xl sm:text-6xl lg:text-7xl">
            Ready to automate <em>your business?</em>
          </h2>

          <p data-gsap className="mt-6 text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
            Let&apos;s talk about your goals. Book a free strategy call and we&apos;ll show you exactly how AI
            automation can save your team hours every week.
          </p>

          <ul data-gsap className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {perks.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-ink-soft hover:bg-white hover:border-brand/20 transition-colors"
              >
                <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${p.tint} flex items-center justify-center flex-shrink-0`}>
                  <FontAwesomeIcon icon={p.icon} className="text-[10px]" />
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          <div data-gsap className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="btn btn-primary px-9 py-4 text-base shadow-[0_8px_32px_-8px_rgba(91,71,224,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(91,71,224,0.6)] transition-shadow"
            >
              Get in touch
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
            <p className="text-sm text-muted">info@nexgenflow.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
