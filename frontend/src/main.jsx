import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";

import "./config/axiosConfig.js";

import AuthenticationPage from "./pages/public/AuthenticationPage.jsx";
import LandingPage from "./pages/public/LandingPage";

import ApplyJobPage from "./pages/private/ApplyJobPage.jsx";
import CompanyPage from "./pages/private/CompanyPage.jsx";
import EditProfilePage from "./pages/private/EditProfilePage";
import HomePage from "./pages/private/HomePage";
import MyApplicationsPage from "./pages/private/MyApplicationsPage.jsx";
import ProfilePage from "./pages/private/ProfilePage";
// import JobsPage from "./pages/private/JobsPage";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminJobbers from "./pages/admin/AdminJobbers.jsx";
// import AdminJobs from "./pages/admin/AdminJobs.jsx";
// import AdminCompanies from "./pages/admin/AdminCompanies.jsx";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute.jsx";

const router = createBrowserRouter([
  // public routes
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/authentication",
    element: <AuthenticationPage />,
  },

  // private routes
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/:jobId/apply",
        element: (
          <ProtectedRoute>
            <ApplyJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <ProtectedRoute>
            <MyApplicationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "companies/:companyId?",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // admin routes
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      // {
      //   path: "jobs",
      //   element: <AdminJobs />,
      // },
      {
        path: "jobbers",
        element: <AdminJobbers />,
      },
      // {
      //   path: "companies",
      //   element: <AdminCompanies />,
      // },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
