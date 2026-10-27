"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useGsapReveal } from "@/components/useGsap";

export default function FAQBanner() {
  const ref = useRef(null);
  useGsapReveal(ref, { selector: "[data-gsap]", stagger: 0.1, y: 20, start: "top 92%" });

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-8" ref={ref}>
      <div
        data-gsap
        className="relative max-w-7xl mx-auto rounded-[2rem] bg-white overflow-hidden border border-line px-6 py-10 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand/20 transition-colors group"
      >
        {/* Gradient top accent — expands on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-16 right-16 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/40 to-transparent group-hover:left-6 group-hover:right-6 group-hover:via-brand/70 transition-all duration-500"
        />

        {/* Subtle ambient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-brand-tint/50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div data-gsap className="relative max-w-xl">
          <h2 className="display text-3xl sm:text-4xl">
            Still wondering if AI is <em>right for you?</em>
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Tell us how your team works today. We&apos;ll give you an honest take on what&apos;s worth automating —
            and what isn&apos;t.
          </p>
        </div>

        <button
          data-gsap
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          className="relative btn btn-ghost flex-shrink-0 self-start md:self-center hover:border-brand/30 hover:text-brand transition-colors"
        >
          Book a free call
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </div>
    </section>
  );
}
