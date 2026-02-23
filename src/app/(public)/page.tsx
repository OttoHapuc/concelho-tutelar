import { Header } from "./components/page.landing.header";
import { Footer } from "./components/page.landing.footer";
import { HeroSection } from "./components/page.landing.hero-section";
import { ImportanceSection } from "./components/page.landing.importance-section";
import { StatsSection } from "./components/page.landing.stats-section";
import { SignsSection } from "./components/page.landing.signs-section";
import { CTASection } from "./components/page.landing.cta-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImportanceSection />
        <StatsSection />
        <SignsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
