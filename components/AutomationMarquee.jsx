import { Bot, Sparkles, Workflow, Cpu, Brain, Network, MessageSquare, TrendingUp, Zap } from "lucide-react";

const keywords = [
  { label: "AI Automation", icon: Bot },
  { label: "Intelligent Agents", icon: Sparkles },
  { label: "Workflow Optimization", icon: Workflow },
  { label: "Process Automation", icon: Cpu },
  { label: "Machine Learning", icon: Brain },
  { label: "System Integration", icon: Network },
  { label: "AI Chatbots", icon: MessageSquare },
  { label: "Lead Generation", icon: TrendingUp },
];

// Alternating accent colours for the separator dots — keeps it lively without being garish.
const dotColors = [
  "bg-brand",
  "bg-[#9a8af5]",
  "bg-peach-deep",
  "bg-sage-deep",
];

export default function AutomationMarquee() {
  const items = [...keywords, ...keywords];

  return (
    <section
      aria-label="What we do"
      className="relative border-y border-brand/8 py-5 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #f3f0fe 0%, #ede9fc 50%, #f3f0fe 100%)",
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden="true"
        className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#f3f0fe] to-transparent z-10 pointer-events-none"
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#f3f0fe] to-transparent z-10 pointer-events-none"
      />

      <div className="flex animate-marquee whitespace-nowrap w-max items-center">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="flex items-center text-[0.95rem] font-semibold px-6 gap-2.5"
            >
              <Icon className="w-4 h-4 text-brand flex-shrink-0" />
              <span
                style={{
                  background: `linear-gradient(90deg, var(--color-brand) 0%, #9a8af5 60%, var(--color-peach-deep) 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {item.label}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-4 ${dotColors[i % dotColors.length]}`}
                aria-hidden="true"
              />
            </span>
          );
        })}
      </div>
    </section>
  );
}
