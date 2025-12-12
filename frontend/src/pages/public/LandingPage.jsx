import Header from "../../components/layout/Header";
import HeroSection from "../../components/home/HeroSection";
import TitleSection from "../../components/home/TitleSection";
import JobsSection from "../../components/job/JobSection";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} showHomeButton={false} />

      <main>
        <HeroSection />

        <TitleSection />

        <JobsSection />
      </main>
    </div>
  );
}

export default LandingPage;
