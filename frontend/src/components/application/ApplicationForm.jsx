import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.js";

function ApplicationForm({ jobId, onSuccess }) {
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    resume: null,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated()) {
      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
      }));
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      setError("You must be logged in to apply for jobs");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const needsProfileUpdate =
        formData.phone !== user.phone || formData.city !== user.city;

      if (needsProfileUpdate) {
        await axios.patch(`/api/users/${user.id_user}`, {
          phone: formData.phone,
          city: formData.city,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profession: user.profession,
          description: user.description,
          hard_skills: user.hard_skills,
          soft_skills: user.soft_skills,
          role: user.role,
        });

        updateUserProfile({
          ...user,
          phone: formData.phone,
          city: formData.city,
        });
      }

      const resumePath = formData.resume
        ? `resumes/${formData.resume.name}`
        : null;

      await axios.post("/api/applications", {
        message: formData.message,
        resume_path: resumePath,
        id_user: user.id_user,
        id_job: jobId,
      });

      setSuccess(true);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Unable to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-20">
        <div className="relative mx-auto max-w-2xl rounded-2xl bg-[#EFECFF] px-6 py-12 md:px-12 md:py-24">
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center md:min-h-[400px]">
            <div className="mb-4 text-5xl md:text-6xl">🔒</div>
            <h2 className="mb-2 text-xl font-bold text-red-600 md:text-2xl">
              Authentication required
            </h2>
            <p className="text-sm text-gray-700 md:text-base">
              Please log in to apply for this job.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-20">
        <div className="relative mx-auto max-w-2xl rounded-2xl bg-[#EFECFF] px-6 py-12 md:px-12 md:py-24">
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center md:min-h-[400px]">
            <div className="mb-4 text-5xl md:text-6xl">✅</div>
            <h2 className="mb-2 text-xl font-bold text-green-600 md:text-2xl">
              Application sent!
            </h2>
            <p className="text-sm text-gray-700 md:text-base">
              Your application has been successfully submitted.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="/my-applications"
                className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:text-base"
              >
                View My Applications
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 md:py-8">
      <div className="relative mx-auto max-w-2xl rounded-2xl bg-[#EFECFF] px-6 py-8 md:px-12 md:py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 md:mb-8 md:text-3xl">
          Application
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-md space-y-4 md:space-y-5"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              First Name:
            </label>
            <input
              required
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full rounded-full border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              Last Name:
            </label>
            <input
              required
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full rounded-full border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-full border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              Phone:
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full rounded-full border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              City:
            </label>
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-full border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              Resume:
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex w-full cursor-pointer items-center justify-between rounded-full border-2 border-blue-400 bg-white px-4 py-2 transition hover:border-blue-600 md:py-3"
              >
                <span className="truncate text-sm text-gray-500 md:text-base">
                  {formData.resume
                    ? formData.resume.name
                    : "Upload your resume"}
                </span>
                <span className="ml-2 text-xl md:text-2xl">☁️</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black md:text-base">
              Cover letter:
            </label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="4"
              className="w-full rounded-2xl border-2 border-blue-400 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500 md:py-3 md:text-base"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs text-red-600 md:text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mx-auto block w-full rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 md:w-fit md:text-base"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
