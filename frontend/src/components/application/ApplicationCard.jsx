import { useState } from "react";

function ApplicationCard({
  id_application,
  job_title,
  company_name,
  company_logo,
  contract_type,
  date_applied,
  message,
  onDelete,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const logoUrl = company_logo
    ? `${import.meta.env.VITE_API_URL}/${company_logo}`
    : null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      onDelete(id_application);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={company_name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-sm font-bold text-blue-600">
                {company_name
                  ? company_name.substring(0, 2).toUpperCase()
                  : "CO"}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{job_title}</h3>
            {company_name && (
              <p className="mt-1 text-sm text-gray-600">{company_name}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
          title="Delete application"
        >
          🗑️
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {contract_type && (
          <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-800">
            {contract_type}
          </span>
        )}
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          Application sent
        </span>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Applied on {formatDate(date_applied)}
      </div>

      {message && (
        <div className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? "Hide" : "View"} cover letter →
          </button>

          {isExpanded && (
            <div className="mt-3 rounded-lg bg-white p-4 text-sm text-gray-700">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ApplicationCard;
