"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { label: "Home",         href: "/"            },
  { label: "Services",     href: "/services"    },
  { label: "Case Studies", href: "/case-studies"},
  { label: "Solutions",    href: "/#solutions"  },
  { label: "About",        href: "/about"       },
  { label: "Contact",      href: "/contact"     },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const headerRef = useRef(null);
  const logoRef   = useRef(null);
  const linksRef  = useRef(null);
  const ctaRef    = useRef(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP entrance — logo, links, cta stagger in on first mount ── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(logoRef.current, { opacity: 0, x: -18, duration: 0.55 })
      .from(
        linksRef.current?.querySelectorAll("li") ?? [],
        { opacity: 0, y: -10, stagger: 0.06, duration: 0.45 },
        "-=0.3"
      )
      .from(ctaRef.current, { opacity: 0, scale: 0.92, duration: 0.4 }, "-=0.25");
  }, { scope: headerRef });

  const handleHashClick = (e, href) => {
    const hash = href.startsWith("/#") ? href.slice(1) : href;
    if (!hash.startsWith("#")) return;
    e.preventDefault();
    setMobileOpen(false);
    if (pathname !== "/") { router.push("/" + hash); return; }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (href) => {
    if (href.startsWith("#") || href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href) =>
    `relative px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
      isActive(href) ? "text-brand" : "text-ink-soft hover:text-ink"
    }`;

  const renderLink = (link, onClick) => {
    const isHash = link.href.startsWith("#") || link.href.startsWith("/#");
    return isHash ? (
      <a href={link.href} onClick={(e) => handleHashClick(e, link.href)} className={linkClass(link.href)}>
        {link.label}
      </a>
    ) : (
      <Link href={link.href} onClick={onClick} className={linkClass(link.href)}>
        {link.label}
        {/* Gradient active underline */}
        {isActive(link.href) && (
          <span className="absolute left-2 right-2 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-brand to-[#9a8af5]" />
        )}
      </Link>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/88 backdrop-blur-lg shadow-[0_1px_0_rgba(28,27,51,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={
          scrolled
            ? {
                borderBottom: "1px solid transparent",
                backgroundClip: "padding-box",
                WebkitBackgroundClip: "padding-box",
              }
            : undefined
        }
      >
        {/* Gradient hairline under navbar when scrolled */}
        {scrolled && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent pointer-events-none"
          />
        )}

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link ref={logoRef} href="/" className="flex items-center" aria-label="NexGenFlows home">
            <Image
              src="/NexGenFlows_Neon_Gradient_Logo-removebg-preview.png"
              alt="NexGenFlows"
              width={220}
              height={88}
              className="h-24 w-auto object-contain -my-4 -ml-3"
              priority
            />
          </Link>

          <ul ref={linksRef} className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>{renderLink(link)}</li>
            ))}
          </ul>

          <div ref={ctaRef} className="hidden lg:block">
            <Link
              href="/contact"
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              Book a Strategy Call
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center text-ink hover:border-brand/30 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[5.25rem] left-3 right-3 z-40 card p-3 lg:hidden border border-brand/10 shadow-[0_12px_40px_-16px_rgba(91,71,224,0.22)]"
          >
            {/* Gradient top accent */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-10 right-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand/50 to-transparent"
            />
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="border-b border-line last:border-0 [&>a]:block [&>a]:px-3 [&>a]:py-3.5"
                >
                  {renderLink(link, () => setMobileOpen(false))}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary w-full mt-3"
            >
              Book a Strategy Call
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
