function AdminStatCard({ icon, value, label, color }) {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
  };

  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
      <div className="mb-4 text-4xl">{icon}</div>
      <div
        className={`mb-2 text-4xl font-bold ${colorClasses[color]} md:text-5xl`}
      >
        {value}
      </div>
      <p className="text-sm font-medium text-gray-700 md:text-base">{label}</p>
    </div>
  );
}

export default AdminStatCard;
