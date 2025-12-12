import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const DEFAULT_FILTERS = { jobType: "", contractType: "" };

function JobsSection({ filters = DEFAULT_FILTERS, onJobsLoaded }) {
  const INITIAL_JOBS_TO_SHOW = 6;
  const JOBS_PER_PAGE = 3;

  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(INITIAL_JOBS_TO_SHOW);

  useEffect(() => {
    axios
      .get("/api/jobs")
      .then((response) => {
        setAllJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);

        if (onJobsLoaded) {
          onJobsLoaded(response.data.length);
        }
      })
      .catch((err) => {
        console.error("Error loading job offers:", err);
        setError("Unable to load job offers");
        setLoading(false);
      });
  }, [onJobsLoaded]);

  useEffect(() => {
    if (allJobs.length === 0) return;

    let result = [...allJobs];

    if (filters?.jobType && filters.jobType.trim() !== "") {
      const searchTerm = filters.jobType.toLowerCase().trim();
      result = result.filter((job) =>
        job.job_title.toLowerCase().includes(searchTerm),
      );
    }

    if (filters?.contractType && filters.contractType !== "") {
      result = result.filter(
        (job) => job.contract_type === filters.contractType,
      );
    }

    setFilteredJobs(result);
    setItemsToShow(INITIAL_JOBS_TO_SHOW);
  }, [filters, allJobs]);

  useEffect(() => {
    setDisplayedJobs(filteredJobs.slice(0, itemsToShow));
  }, [itemsToShow, filteredJobs]);

  const handleViewMore = () => {
    setItemsToShow((prev) => prev + JOBS_PER_PAGE);
  };

  const hasMoreJobs = itemsToShow < filteredJobs.length;

  const noResultsMessage = () => {
    if (filters?.jobType || filters?.contractType) {
      return "No jobs match your search criteria. Try adjusting your filters.";
    }
    return "No job offers available at the moment.";
  };

  return (
    <section className="bg-white py-5 md:py-4" id="jobs">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-blue-600 md:mb-12 md:text-4xl">
          Our latest jobs
        </h2>

        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">{noResultsMessage()}</p>
          </div>
        )}

        {!loading && !error && filteredJobs.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            {filteredJobs.length === allJobs.length ? (
              <p>Showing all {filteredJobs.length} job offers</p>
            ) : (
              <p>
                Found {filteredJobs.length} job
                {filteredJobs.length > 1 ? "s" : ""} matching your criteria
              </p>
            )}
          </div>
        )}

        {!loading && !error && displayedJobs.length > 0 && (
          <>
            <div className="space-y-4 md:hidden">
              {displayedJobs.map((job) => (
                <JobCard
                  key={job.id_job}
                  id_job={job.id_job}
                  job_title={job.job_title}
                  contract_type={job.contract_type}
                  short_description={job.short_description}
                  full_description={job.full_description}
                  salary={job.salary}
                  workplace_type={job.workplace_type}
                  working_time={job.working_time}
                  date_posted={job.date_posted}
                  company_name={job.company_name}
                  company_logo={job.company_logo}
                  company_city={job.company_city}
                  company_sector={job.company_sector}
                  company_id={job.id_company}
                  bgColor="bg-blue-50"
                />
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {displayedJobs.map((job) => (
                <JobCard
                  key={job.id_job}
                  id_job={job.id_job}
                  job_title={job.job_title}
                  contract_type={job.contract_type}
                  short_description={job.short_description}
                  full_description={job.full_description}
                  salary={job.salary}
                  workplace_type={job.workplace_type}
                  working_time={job.working_time}
                  date_posted={job.date_posted}
                  company_name={job.company_name}
                  company_logo={job.company_logo}
                  company_city={job.company_city}
                  company_sector={job.company_sector}
                  company_id={job.id_company}
                  bgColor="bg-blue-50"
                />
              ))}
            </div>

            {hasMoreJobs && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleViewMore}
                  className="rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  View more jobs ({filteredJobs.length - itemsToShow} remaining)
                </button>
              </div>
            )}

            {!hasMoreJobs && filteredJobs.length > INITIAL_JOBS_TO_SHOW && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  All jobs displayed ({filteredJobs.length} total)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default JobsSection;
