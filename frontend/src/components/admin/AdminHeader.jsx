import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/12jobLogo.png";

function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/admin/dashboard");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="flex h-12 w-12 items-center justify-center transition-transform hover:scale-105"
              title="Return to site"
            >
              <img
                src={logo}
                alt="1, 2, Job Logo"
                className="h-full w-full object-contain"
              />
            </button>
            <span className="text-xl font-bold text-blue-600">Admin Panel</span>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <button
              onClick={handleHomeClick}
              className="rounded-lg border border-blue-600 px-6 py-2 font-semibold text-blue-600 transition-colors hover:border-blue-700 hover:text-blue-700"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Sign out
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col space-y-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen ? "mt-4 max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col space-y-3 border-t py-4">
            <button
              onClick={handleHomeClick}
              className="rounded-lg border border-blue-600 px-6 py-2 text-center font-semibold text-blue-600 transition-colors hover:border-blue-700 hover:text-blue-700"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-blue-600 px-6 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
