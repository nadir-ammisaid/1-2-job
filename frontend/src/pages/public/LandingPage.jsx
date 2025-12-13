import Header from "../../components/layout/Header";
import HeroSection from "../../components/home/HeroSection";
import TitleSection from "../../components/home/TitleSection";
import JobsSection from "../../components/job/JobSection";
import Footer from "../../components/layout/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} showHomeButton={false} />

      <main>
        <HeroSection />

        <TitleSection />

        <JobsSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
