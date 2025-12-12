function StatCard({ icon, value, label, color = "green" }) {
  const colorClasses = {
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500",
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm">
      <div className={`mb-3 text-4xl ${colorClasses[color]}`}>{icon}</div>
      <div className={`mb-2 text-5xl font-bold ${colorClasses[color]}`}>
        {value}
      </div>
      <p className="text-center text-sm text-gray-700">{label}</p>
    </div>
  );
}

export default StatCard;
