import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../config/axiosConfig";
import EditFirstSection from "./EditFirstSection";
import EditSecondSection from "./EditSecondSection";

function EditProfile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.patch(`/api/users/${user.id_user}`, formData);
      updateUserProfile(formData);
      console.log("Data updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user data", error);
      setError("Unable to update user data");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (authLoading) return <div className="mt-20">Loading...</div>;
  if (error) return <div className="mt-20 text-red-600">{error}</div>;
  if (!user) return <div className="mt-20">User not found</div>;

  return (
    <div className="mx-auto mt-20 max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Change my Informations</h1>
      <form onSubmit={handleSubmit}>
        <EditFirstSection formData={formData} onChange={handleChange} />
        <EditSecondSection formData={formData} onChange={handleChange} />

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full border border-blue-600 bg-white px-8 py-2 font-medium text-blue-600 transition-colors hover:border-blue-700 hover:text-blue-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
