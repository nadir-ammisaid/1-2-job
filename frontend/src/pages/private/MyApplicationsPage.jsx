import Header from "../../components/layout/Header";
import ApplicationsList from "../../components/application/ApplicationsList";
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
    </div>
  );
}

export default MyApplicationsPage;
