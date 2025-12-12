import CompanyDetail from "../../components/company/CompanyDetail.jsx";
import Header from "../../components/layout/Header.jsx";

function CompanyPage(){
    return(
        <div>
            <Header isAuthenticated={true} showHomeButton={true} />
            <CompanyDetail />
        </div>
    )
}

export default CompanyPage;