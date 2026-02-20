"use client";

import {
  HomeNav,
  Hero,
  KpiPreviewStrip,
  FeatureGrid,
  DemoPreview,
  PricingSection,
  Testimonials,
  FinalCta,
  Footer,
} from "@/components/marketing/HomeSections";
import { HomeLinks } from "./HomeLinks";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-primary text-slate-200">
      <HomeNav>
        <HomeLinks variant="nav" />
      </HomeNav>
      <Hero>
        <HomeLinks variant="hero" />
      </Hero>
      <KpiPreviewStrip />
      <FeatureGrid />
      <DemoPreview />
      <PricingSection />
      <Testimonials />
      <FinalCta>
        <HomeLinks variant="footer" />
      </FinalCta>
      <Footer />
    </main>
  );
}
