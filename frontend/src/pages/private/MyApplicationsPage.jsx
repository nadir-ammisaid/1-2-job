import Header from "../../components/layout/Header";
import ApplicationsList from "../../components/application/ApplicationsList";
import Footer from "../../components/layout/Footer";
// import { useParams } from "react-router-dom";

function MyApplicationsPage() {
  // const userId = useParams;
  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={true} />
      <main className="mb-8 text-3xl font-bold md:text-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">My applications</h1>

        {/* <ApplicationsList userId={4} /> */}
        <ApplicationsList />
      </main>
      <Footer />
    </div>
  );
}

export default MyApplicationsPage;
