import Header from "../../components/layout/Header.jsx";
import EditProfile from "../../components/profile/EditProfile.jsx";

function EditProfilePage() {
  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={true} />
      <EditProfile />
    </div>
  );
}

export default EditProfilePage;
