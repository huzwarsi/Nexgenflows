"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRocket, faBolt, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useGsapReveal } from "@/components/useGsap";

const features = [
  { icon: faRocket,       label: "Fast deployment", tint: "from-brand-tint to-brand-tint-2 text-brand" },
  { icon: faBolt,         label: "AI-powered",       tint: "from-amber to-[#fce9b8] text-amber-deep"   },
  { icon: faShieldHalved, label: "Secure & reliable", tint: "from-sage to-[#d4eddc] text-sage-deep"    },
];

export default function CTASection() {
  const sectionRef = useRef(null);
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.1, y: 24, start: "top 88%" });

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8" ref={sectionRef}>
      <div
        data-gsap
        className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-line px-6 py-14 sm:px-10 lg:px-16 lg:py-16"
        style={{
          background:
            "linear-gradient(135deg, #fff4ec 0%, #fbeefa 50%, #f1edfe 100%)",
        }}
      >
        {/* Decorative ambient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-brand/12 to-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-br from-peach/40 to-transparent blur-3xl"
        />

        {/* Gradient top accent bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-12 right-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div data-gsap className="max-w-xl">
            <p className="eyebrow mb-4">Get started today</p>
            <h2 className="display text-4xl sm:text-5xl">
              Let&apos;s find the right flow <em>for your business</em>
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
              Whether you&apos;re starting your AI journey or looking to scale your automation — let&apos;s talk about
              what&apos;s possible.
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {features.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-sm text-ink-soft hover:border-brand/30 hover:bg-white transition-colors"
                >
                  <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${f.tint} flex items-center justify-center flex-shrink-0`}>
                    <FontAwesomeIcon icon={f.icon} className="text-[10px]" />
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
          </div>

          <div data-gsap className="self-start lg:self-center">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary px-8 py-4 shadow-[0_8px_28px_-8px_rgba(91,71,224,0.45)] hover:shadow-[0_12px_36px_-8px_rgba(91,71,224,0.55)] transition-shadow"
            >
              Start a project
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
