import { Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/Motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NexGenFlows — AI Automation Agency",
  description:
    "NexGenFlows helps businesses automate workflows, deploy intelligent AI agents, and improve productivity with custom AI solutions built for growth.",
  keywords: "AI automation, AI agents, workflow automation, chatbots, CRM automation, AI agency",
  icons: {
    icon: "/Neon_Gradient_NG_Ribbon_Emblem-removebg-preview.png",
    shortcut: "/Neon_Gradient_NG_Ribbon_Emblem-removebg-preview.png",
    apple: "/Neon_Gradient_NG_Ribbon_Emblem-removebg-preview.png",
  },
  openGraph: {
    title: "NexGenFlows — AI Automation Agency",
    description: "Turn Complex Work Into Intelligent Flow. AI automation systems built for modern businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden font-sans" suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
