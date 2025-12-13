import CompanyDetail from "../../components/company/CompanyDetail.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.js";

function CompanyPage() {
  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={true} />
      <CompanyDetail />
      <Footer />
    </div>
  );
}

export default CompanyPage;
