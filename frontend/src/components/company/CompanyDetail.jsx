import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirstSection from "./FirstSection.jsx";
import SecondSection from "./SecondSection.jsx";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setError("Company ID is required");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/companies/${companyId}`)
      .then((response) => {
        const companyData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setCompany(companyData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading company data", err);
        setError("Unable to load company data");
        setLoading(false);
      });
  }, [companyId]);

  if (loading) return <div className="mt-20">Loading...</div>;
  if (error) return <div className="mt-20 text-red-600">{error}</div>;
  if (!company) return <div className="mt-20">No company found</div>;

  return (
    <div className="mx-auto mt-20 max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Company Profile</h1>

      <FirstSection
        logo_path={company.logo_path}
        name={company.name}
        sector={company.sector}
        email={company.email}
        phone={company.phone}
        city={company.city}
      />

      <SecondSection description={company.description} />
    </div>
  );
}

export default CompanyDetail;
