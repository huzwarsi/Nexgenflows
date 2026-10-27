"use client";
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, animate, useInView, useReducedMotion } from "framer-motion";

/** Honors the visitor's "reduce motion" setting for every framer-motion element. */
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades + lifts its children in once, when scrolled into view. */
export function Reveal({ as = "div", delay = 0, y = 14, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts up to `to` the first time it is visible. */
export function CountUp({ to, decimals = 0, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: setVal });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : val;

  return (
    <span ref={ref}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Eyebrow + serif heading + optional blurb. Pass heading as JSX; wrap emphasis in <em>. */
export function SectionHeading({ eyebrow, children, intro, align = "center", className = "" }) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${center ? "eyebrow--center" : ""} mb-4`}>{eyebrow}</p>}
      <h2 className="display text-4xl sm:text-5xl">{children}</h2>
      {intro && <p className="mt-4 text-ink-soft text-base leading-relaxed">{intro}</p>}
    </Reveal>
  );
}
