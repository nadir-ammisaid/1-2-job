import { useAuth } from "../../hooks/useAuth";
import FirstSection from "./FirstSection.jsx";
import SecondSection from "./SecondSection.jsx";

function DetailProfil() {
  const { user, loading } = useAuth();

  if (loading) return <div className="mt-20">Loading...</div>;
  if (!user) return <div className="mt-20">User not found</div>;

  return (
    <div className="mx-auto mt-20 max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">My profile</h1>

      <FirstSection
        first_name={user.first_name}
        last_name={user.last_name}
        profession={user.profession}
        photo={user.photo_path}
        email={user.email}
        phone={user.phone}
        city={user.city}
      />

      <SecondSection
        description={user.description}
        hard_skills={user.hard_skills}
        soft_skills={user.soft_skills}
      />
    </div>
  );
}

export default DetailProfil;
