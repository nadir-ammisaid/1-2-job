import { useState } from "react";

function SearchBar({ onSearch }) {
  const [jobType, setJobType] = useState("");
  const [contractType, setContractType] = useState("");

  const handleSearch = () => {
    onSearch({ jobType, contractType });
  };

  const handleClear = () => {
    setJobType("");
    setContractType("");
    onSearch({ jobType: "", contractType: "" });
  };

  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setJobType(value);
  };

  const handleContractTypeChange = (e) => {
    const value = e.target.value;
    setContractType(value);
    onSearch({ jobType, contractType: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={jobType}
              onChange={handleJobTypeChange}
              onKeyDown={handleKeyDown}
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Search by job title..."
            />
          </div>

          <select
            value={contractType}
            onChange={handleContractTypeChange}
            className="rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none md:w-48"
          >
            <option value="">All contracts</option>
            <option value="Permanent">Permanent</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
            <option value="Apprenticeship">Apprenticeship</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              🔍 Search
            </button>

            {(jobType || contractType) && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                title="Clear filters"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </form>

      {(jobType || contractType) && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {jobType && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              Job title: {jobType}
            </span>
          )}
          {contractType && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              Contract type: {contractType}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
