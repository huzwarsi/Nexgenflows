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

/** Scroll-triggered text animation that animates smoothly as the user scrolls */
export function ScrollTextReveal({
  children,
  as = "h2",
  className = "",
  delay = 0,
  y = 28,
  amount = 0.25,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount, once: false });
  const Tag = motion[as] ?? motion.h2;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + display heading + optional blurb with scroll-reactive text animations. */
export function SectionHeading({ eyebrow, children, intro, align = "center", className = "" }) {
  const center = align === "center";
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.25, once: false });

  return (
    <div ref={ref} className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`eyebrow ${center ? "eyebrow--center" : ""} mb-3 sm:mb-4`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 26, filter: "blur(6px)" }}
        transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="display text-4xl sm:text-5xl"
      >
        {children}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-ink-soft text-base sm:text-lg leading-relaxed"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
