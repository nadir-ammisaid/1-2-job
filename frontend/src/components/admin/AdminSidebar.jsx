import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      to: "/admin/jobs",
      label: "Jobs",
      icon: "💼",
    },
    {
      to: "/admin/jobbers",
      label: "Jobbers",
      icon: "👥",
    },
    {
      to: "/admin/companies",
      label: "Companies",
      icon: "🏢",
    },
  ];

  return (
    <aside className="hidden w-64 bg-gray-50 p-6 md:block">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
