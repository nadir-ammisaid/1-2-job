import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobCard({
  id_job,
  job_title,
  contract_type,
  short_description,
  full_description,
  salary,
  workplace_type,
  working_time,
  date_posted,
  company_name,
  company_logo,
  company_city,
  company_sector,
  company_id,
  bgColor = "bg-gray-50",
}) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

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
    });
  };

  const handleApplyClick = () => {
    navigate(`/jobs/${id_job}/apply`);
  };

  const handleCompanyClick = () => {
    if (company_id) {
      navigate(`/companies/${company_id}`);
    }
  };

  return (
    <div
      className={`${bgColor} flex flex-col rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md`}
    >
      <div className="mb-4 flex items-start gap-4">
        <div
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-white p-1 transition-all hover:ring-2 hover:ring-blue-300"
          onClick={handleCompanyClick}
          title={`View ${company_name} profile`}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company_name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="text-sm font-bold text-blue-600">
              {company_name ? company_name.substring(0, 2).toUpperCase() : "CO"}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{job_title}</h3>
          {company_name && (
            <p
              className="mt-1 cursor-pointer text-sm text-gray-600 transition-colors hover:text-blue-600 hover:underline"
              onClick={handleCompanyClick}
              title={`View ${company_name} profile`}
            >
              {company_name}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {company_city && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {company_city}
          </span>
        )}
        {contract_type && (
          <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-800">
            {contract_type}
          </span>
        )}
        {company_sector && (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
            {company_sector}
          </span>
        )}
      </div>

      <div className="mb-4 flex-1">
        <p className="mb-2 text-sm text-gray-600">
          {expanded
            ? full_description ||
              short_description ||
              "No description available."
            : short_description || "No description available."}
        </p>

        {expanded && (
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            {salary && (
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Salary:</strong> {salary}
                </span>
              </li>
            )}
            {workplace_type && (
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Workplace:</strong> {workplace_type}
                </span>
              </li>
            )}
            {working_time && (
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Working time:</strong> {working_time}
                </span>
              </li>
            )}
            {date_posted && (
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Posted:</strong> {formatDate(date_posted)}
                </span>
              </li>
            )}
          </ul>
        )}

        {full_description && full_description !== short_description && (
          <button
            className="mt-2 text-sm font-medium text-blue-600 hover:underline focus:outline-none"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <button
        onClick={handleApplyClick}
        className="mx-auto block w-fit rounded-full bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
}

export default JobCard;
