import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../config/axiosConfig.js";

function SignInUpForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("signin");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOk, setIsOk] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function strongPassword(pw) {
    const minLength = pw.length >= 8;
    const minLetter = /[A-Za-z]/.test(pw);
    const minNumber = /\d/.test(pw);
    const minSpecial = /[^A-Za-z0-9]/.test(pw);
    return minLength && minLetter && minNumber && minSpecial;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (formData.password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsOk(false);
      return;
    }

    if (!strongPassword(formData.password)) {
      setMessage(
        "Weak password: minimum 8 characters, 1 letter, 1 number, 1 special character.",
      );
      setIsOk(false);
      return;
    }

    axios
      .post("/api/users", {
        ...formData,
        role: "jobber",
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
        }

        setIsOk(true);
        setMessage("✅ Account created successfully! Redirecting...");
        setFormData({ first_name: "", last_name: "", email: "", password: "" });
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setIsOk(false);
        setMessage(`${error.response?.data?.message || "Server error"}`);
      });
  }

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsOk(false);

    if (!loginForm.email || !loginForm.password) {
      setMessage("❌ Email and password are required.");
      return;
    }

    axios
      .post("/api/users/login", loginForm)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
        }

        setIsOk(true);
        setMessage("✅ Login successful!");

        login(response.data.user);

        setTimeout(() => {
          navigate("/home");
        }, 500);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setMessage("❌ Invalid credentials.");
        } else {
          setMessage(error.response?.data?.message || "❌ Server error");
        }
      });
  }

  return (
    <div className="mx-8 my-20 md:py-24">
      <div className="relative mx-auto min-h-[620px] max-w-2xl rounded-2xl bg-[#EFECFF] pt-12 md:min-h-[706px] md:py-24">
        <a
          href="/"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black text-white"
          aria-label="Close"
        >
          ×
        </a>

        <div className="mb-6 flex items-center justify-center gap-10">
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`text-lg font-semibold text-blue-600 ${activeTab === "signup" ? "underline underline-offset-4" : "opacity-60"}`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`text-lg font-semibold text-blue-600 ${activeTab === "signin" ? "underline underline-offset-4" : "opacity-60"}`}
          >
            Sign in
          </button>
        </div>

        {activeTab === "signup" && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xs space-y-3"
          >
            <div>
              <label className="mb-1 block text-sm text-black">Last Name</label>
              <input
                required
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-black">
                First Name
              </label>
              <input
                required
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-black">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-black">Password</label>
              <input
                required
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-black">
                Confirm password
              </label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input required type="checkbox" id="terms" name="terms" />
              <label
                htmlFor="terms"
                className="pl-2 text-sm text-black hover:text-blue-800"
              >
                Accept the{" "}
                <span className="cursor-pointer underline">Terms of Use</span>
              </label>
            </div>

            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-sm text-black">Already have an account?</p>
              <button
                type="button"
                onClick={() => setActiveTab("signin")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Sign in
              </button>
            </div>

            <button
              type="submit"
              className="mx-auto block w-fit rounded-full bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Sign up
            </button>
            {message && (
              <p
                className={`mt-2 text-center text-sm ${isOk ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </form>
        )}

        {activeTab === "signin" && (
          <form
            onSubmit={handleLoginSubmit}
            className="mx-auto w-full max-w-xs space-y-3"
          >
            <div>
              <label className="mb-1 block text-sm text-black">Email</label>
              <input
                required
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-black">Password</label>
              <input
                required
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="w-full rounded-full border border-blue-400/70 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-sm text-black">Don't have an account yet?</p>
              <button
                type="button"
                onClick={() => setActiveTab("signup")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Sign up
              </button>
            </div>

            <button
              type="submit"
              className="mx-auto block w-fit rounded-full bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Sign in
            </button>
            {message && (
              <p
                className={`mt-2 text-center text-sm ${isOk ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default SignInUpForm;
