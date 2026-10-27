"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once. ScrollTrigger is bundled inside the gsap package.
gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal for the children matched by `selector` inside `scope`.
 * Elements start hidden (opacity 0 + small y) and animate in with a stagger
 * the first time the scope scrolls into view. Safe on SSR: the initial server
 * render is untouched; GSAP only sets the hidden state on the client, and
 * ScrollTrigger fires immediately for anything already in the viewport.
 *
 * @param {import("react").RefObject} scope - container ref (useGSAP scope)
 * @param {Object} opts
 * @param {string} opts.selector - child selector to animate (default "[data-gsap]")
 * @param {number} opts.stagger - seconds between children (default 0.1)
 * @param {number} opts.y - initial y offset in px (default 24)
 * @param {number} opts.duration - seconds (default 0.7)
 * @param {string} opts.start - ScrollTrigger start position (default "top 85%")
 */
export function useGsapReveal(scope, opts = {}) {
  const {
    selector = "[data-gsap]",
    stagger = 0.1,
    y = 24,
    duration = 0.7,
    start = "top 85%",
  } = opts;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const targets = root.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope }
  );
}

/**
 * Draw a horizontal/vertical line element from 0 → full width/height when it
 * scrolls into view. Used for connector lines between process steps.
 * @param {import("react").RefObject} scope - container ref
 * @param {string} selector - line element selector (default "[data-gsap-line]")
 * @param {string} axis - "x" (scaleX) or "y" (scaleY) (default "x")
 */
export function useGsapLine(scope, opts = {}) {
  const { selector = "[data-gsap-line]", axis = "x", duration = 1.1, start = "top 80%" } = opts;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const lines = root.querySelectorAll(selector);
      if (!lines.length) return;

      const prop = axis === "x" ? "scaleX" : "scaleY";
      gsap.set(lines, { [prop]: 0, transformOrigin: axis === "x" ? "left center" : "top center" });
      gsap.to(lines, {
        [prop]: 1,
        duration,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start, toggleActions: "play none none none" },
      });
    },
    { scope }
  );
}

export { gsap, ScrollTrigger, useGSAP };
