"use client";
import { useRef } from "react";
import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useGsapReveal } from "@/components/useGsap";

const footerLinks = {
  Services: [
    { label: "AI Automation", href: "/services" },
    { label: "AI Voice Agents", href: "/services" },
    { label: "AI Chatbots", href: "/services" },
    { label: "AI Integrations", href: "/services" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Case studies", href: "/case-studies" },
    { label: "All services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: faXTwitter,  href: "#", label: "X (Twitter)" },
  { icon: faLinkedin,  href: "#", label: "LinkedIn" },
  { icon: faInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  // Server snapshot is used while prerendering (this Next version rejects reading the clock there);
  // the browser then swaps in the real current year.
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026
  );

  const footerRef = useRef(null);
  useGsapReveal(footerRef, { selector: "[data-gsap]", stagger: 0.08, y: 20, start: "top 95%" });

  return (
    <footer ref={footerRef} className="mt-8 border-t border-brand/10" style={{ background: "linear-gradient(180deg, #f3f0fe 0%, #ede9fc 100%)" }}>
      {/* Gradient top divider — thin neon-violet to peach line */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-brand-tint/40 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 mb-14">
          <div data-gsap>
            <Image
              src="/Neon_Gradient_NG_Ribbon_Emblem-removebg-preview.png"
              alt="NexGenFlows NG emblem"
              width={500}
              height={500}
              className="h-20 w-20 object-contain -ml-2 mb-1 drop-shadow-[0_4px_12px_rgba(91,71,224,0.25)]"
            />
            <p className="text-sm text-ink-soft leading-relaxed max-w-[280px]">
              We build intelligent AI automation systems that help businesses eliminate manual work and accelerate
              growth.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grad-border w-9 h-9 rounded-full text-ink-soft hover:text-brand flex items-center justify-center bg-white"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} data-gsap>
              <h3 className="text-sm font-semibold text-ink mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand transition-colors"
                    >
                      <span className="w-0 h-[1px] bg-gradient-to-r from-brand to-[#9a8af5] group-hover:w-3 transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-gsap>
            <h3 className="text-sm font-semibold text-ink mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-tint to-brand-tint-2 text-brand flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                </span>
                <a href="mailto:info@nexgenflow.com" className="hover:text-brand transition-colors">info@nexgenflow.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-peach to-[#fde8d7] text-peach-deep flex items-center justify-center">
                  <FontAwesomeIcon icon={faGlobe} className="text-xs" />
                </span>
                www.nexgenflow.com
              </li>
            </ul>
            <Link href="/contact" className="btn btn-primary btn-sm mt-6">Book a call</Link>
          </div>
        </div>

        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {year} NexGenFlows. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
