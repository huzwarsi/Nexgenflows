import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutomationMarquee from "@/components/AutomationMarquee";
import Services from "@/components/Services";
import GrowthSection from "@/components/GrowthSection";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FAQBanner from "@/components/FAQBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <Hero />
      <AutomationMarquee />
      <Services />
      <GrowthSection />
      <Process />
      <CaseStudies />
      <CTASection />
      <Testimonials />
      <FAQ />
      <FAQBanner />
      <Contact />
      <Footer />
    </main>
  );
}
