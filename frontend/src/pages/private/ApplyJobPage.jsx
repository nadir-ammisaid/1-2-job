import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import ApplicationForm from "../../components/application/ApplicationForm.jsx";
import Footer from "../../components/layout/Footer.js";

function ApplyJobPage() {
  const { jobId } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={true} />
      <main className="pt-20">
        {!isSuccess && (
          <h1 className="text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Apply for the job
          </h1>
        )}
        <ApplicationForm jobId={jobId} onSuccess={handleSuccess} />
      </main>
      <Footer />
    </div>
  );
}

export default ApplyJobPage;
