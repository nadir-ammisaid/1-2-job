import Header from "../../components/layout/Header.jsx";
import DetailProfil from "../../components/profile/DetailProfil.jsx";
function ProfilePage() {
  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={true} />
      <DetailProfil />
    </div>
  );
}

export default ProfilePage;
