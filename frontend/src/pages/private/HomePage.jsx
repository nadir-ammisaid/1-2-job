import { useState } from "react";
import Header from "../../components/layout/Header";
import MySummary from "../../components/home/MySummary";
import SearchBar from "../../components/job/SearchBar";
import JobsSection from "../../components/job/JobSection";
import { useAuth } from "../../hooks/useAuth";

function HomePage() {
  const { user, isAuthenticated } = useAuth();

  const [searchFilters, setSearchFilters] = useState({
    jobType: "",
    contractType: "",
  });

  const [totalJobs, setTotalJobs] = useState(0);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    console.log("Search with filters:", filters);
  };

  const handleJobsLoaded = (count) => {
    setTotalJobs(count);
  };

  const getUserDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user?.first_name) {
      return user.first_name;
    } else if (user?.email) {
      return user.email.split("@")[0];
    }
    return "there";
  };

  return (
    <div>
      <Header isAuthenticated={true} showHomeButton={false} />

      <main className="container mx-auto px-4 pb-12">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Hello {isAuthenticated() ? getUserDisplayName() : ""}, Welcome to your
          space!
        </h1>

        <MySummary />

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Job offers</h2>
          <p className="mb-6 text-gray-600">
            {totalJobs > 0
              ? `${totalJobs} job offer${totalJobs > 1 ? "s are" : " is"} published`
              : "Loading job offers..."}
          </p>

          <SearchBar onSearch={handleSearch} />

          <JobsSection
            filters={searchFilters}
            onJobsLoaded={handleJobsLoaded}
          />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
