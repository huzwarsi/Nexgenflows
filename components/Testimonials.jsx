"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Quote, User } from "lucide-react";
import { SectionHeading } from "@/components/Motion";
import { useGsapReveal } from "@/components/useGsap";

const testimonials = [
  {
    id: 1,
    quote: "NexGenFlow delivered exactly what we needed. Their AI automation system handles so many of our enquiries automatically — it's been a genuine time-saver for our whole team.",
    name: "Sarah Chen",
    role: "Operations Manager",
    company: "TechCorp Inc.",
    initials: "SC",
    avatar: "from-brand-tint to-brand-tint-2 text-brand-deep",
    accent: "from-brand via-[#9a8af5] to-transparent",
  },
  {
    id: 2,
    quote: "Professional, responsive and highly skilled. They turned our ideas into a seamless AI solution that actually fits how our business works day-to-day.",
    name: "Oliver Reed",
    role: "Founder & CEO",
    company: "Reed Ventures",
    initials: "OR",
    avatar: "from-peach to-[#fde8d7] text-peach-deep",
    accent: "from-peach-deep via-[#e88a55] to-transparent",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  useGsapReveal(sectionRef, { selector: "[data-gsap]", stagger: 0.16, y: 36, start: "top 80%" });

  return (
    <section className="py-24 lg:py-32 border-y border-brand/8" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Client feedback" className="mb-14">
          What our <em>clients say</em>
        </SectionHeading>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              data-gsap
              className="grad-border grad-top card p-8 flex flex-col hover:-translate-y-1.5"
            >
              {/* Gradient top accent */}
              <div
                aria-hidden="true"
                className={`h-[3px] w-full rounded-full bg-gradient-to-r ${t.accent} mb-6 opacity-70`}
              />

              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <FontAwesomeIcon
                      key={k}
                      icon={faStar}
                      className="text-[#e8a93a] text-sm drop-shadow-[0_1px_2px_rgba(232,169,58,0.25)]"
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-brand/20" />
              </div>

              <blockquote className="display text-[1.65rem] leading-snug text-ink flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-7 pt-5 border-t border-line flex items-center gap-3">
                <span className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatar} flex items-center justify-center text-sm font-semibold shadow-sm`}>
                  <User className="w-5 h-5 opacity-90" />
                </span>
                <span>
                  <span className="block font-semibold text-sm text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role} · {t.company}</span>
                </span>
              </figcaption>

              <p className="mt-4 text-xs text-muted italic">{t.note}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
