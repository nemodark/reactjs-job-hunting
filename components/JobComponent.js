import SkeletonLoader from "@/components/SkeletonLoader";
import { useEffect, useState } from "react";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/outline";

//set the sort types to be used in sorting

const JobComponent = ({ data }) => {
  //the limit of content to be shown on load or every click of the "show more" button
  const jobsPerPage = 10;

  //create a variable to contain the values after sorting/filtering the data from the API
  const [jobs, setJobs] = useState([]);

  //create a variable to contain the values after filtering and sorting
  const [jobsToShow, setJobsToShow] = useState([]);
  //create a variable to declare the total number of posts to be shown after clicking "show more"
  const [next, setNext] = useState(10);

  //variables set to check if contents are finish loading
  const [pageLoading, setPageLoading] = useState(false);

  const [showMoreLoading, setShowMoreLoading] = useState(false);

  const [currentSort, setNextSort] = useState("default");

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [filterTick, setFilterTick] = useState(false);
  //watch the state changes for the props data to populate data with the specific values
  useEffect(() => {
    sortData();
  }, [data.jobs]);

  const handleSortingJobs = () => {
    let nextSort;
    if (currentSort === "down") nextSort = "up";
    if (currentSort === "up") nextSort = "default";
    if (currentSort === "default") nextSort = "down";

    setNextSort(nextSort);
  };

  //check for any changes in the state then call functions once state changes
  useEffect(() => {
    sortData();
  }, [currentSort]);

  const sortData = () => {
    const newJobs = [...data.jobs];
    let sortedJobs;
    setPageLoading(true);
    setTimeout(() => {
      if (currentSort == "default") {
        sortedJobs = newJobs;
      } else if (currentSort == "up") {
        sortedJobs = newJobs.sort((a, b) =>
          a.companyName > b.companyName ? 1 : -1
        );
      } else if (currentSort == "down") {
        sortedJobs = newJobs.sort((a, b) =>
          a.companyName < b.companyName ? 1 : -1
        );
      }
      setJobs(sortedJobs);
    }, 1000);
  };

  //check for any changes in the state then call functions once state changes
  useEffect(() => {
    filterJobs();
  }, [jobs]);

  //filter button ticker function to set the ticker to true if the filter is not yet applied then call the filter function
  const handleFilterJobs = () => {
    setPageLoading(true);
    let filter = filterTick == true ? false : true;
    setFilterTick(filter);
  };

  useEffect(() => {
    filterJobs();
  }, [filterTick]);

  //create a function to filter jobs on the last 7 days
  const filterJobs = () => {
    setTimeout(() => {
      if (filterTick == true) {
        const newJobs = [...jobs];
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const endDate = new Date();
        const currentJobs = newJobs.filter((job) => {
          let jobDate = new Date(job.OBJpostingDate);
          return jobDate >= startDate && jobDate <= endDate;
        });
        setFilteredJobs(currentJobs);
      } else {
        setFilteredJobs(jobs);
      }
    }, 1000);
  };

  useEffect(() => {
    loopWithSlice(0, jobsPerPage);
  }, [filteredJobs]);

  //loop the values from the data and slice based on the limit per page to show the corresponding data
  const loopWithSlice = (start, end) => {
    const slicedJobs = filteredJobs.slice(start, end);
    setJobsToShow(slicedJobs);
  };

  //check for any changes in the state then call functions once state changes
  useEffect(() => {
    setPageLoading(false);
  }, [jobsToShow]);

  const handleShowMoreJobs = () => {
    setShowMoreLoading(true);
    setTimeout(() => {
      loopWithSlice(0, next + jobsPerPage);
      setNext(next + jobsPerPage);
      setShowMoreLoading(false);
    }, 1500);
  };

  return (
    <div className="mb-10">
      <div className="flex md:flex-row flex-col space-y-4 md:space-x-4 md:items-center justify-between w-full my-4 lg:px-4">
        <div className="mr-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-7 md:leading-10 mb-1 truncate">
            Jobs
          </h2>
          <div className="font-base tracking-tight text-gray-600">
            Find the best job for you
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-4">
          <button
            onClick={handleSortingJobs}
            className="px-5 text-sm rounded-md bg-gray-900 text-white font-semibold py-2 tracking-wider border-gray-900 border hover:bg-gray-800 flex flex-wrap items-center justify-center"
          >
            Sort by Company Name{" "}
            {currentSort === "up" ? (
              <SortAscendingIcon className="h-4 w-4 ml-2" />
            ) : currentSort === "down" ? (
              <SortDescendingIcon className="h-4 w-4 ml-2" />
            ) : (
              ""
            )}
            {/* bg-gray-900 px-5 py-2 text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800 */}
          </button>
          <button
            onClick={handleFilterJobs}
            className={
              filterTick === true
                ? "text-white bg-gray-900 px-5 text-sm rounded-md font-semibold py-2 tracking-wider border hover:bg-gray-800 flex flex-wrap items-center justify-center"
                : "text-black border-gray-900 px-5 text-sm rounded-md font-semibold py-2 tracking-wider border hover:bg-gray-800 flex flex-wrap items-center justify-center"
            }
          >
            Filter jobs last 7 days
            {/* bg-gray-900 px-5 py-2 text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800 */}
          </button>
        </div>
      </div>
      {!pageLoading && (
        <div className="mt-8 flex flex-col lg:flex-row lg:flex-wrap justify-space-between transition duration-500 ease-in-out space-y-8 lg:space-y-0">
          {jobsToShow &&
            jobsToShow.map((post) => (
              <div
                key={post.jobId}
                className="flex flex-col transition duration-500 ease-in-out lg:w-1/2 w-full lg:p-4"
              >
                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                  <div className="flex md:items-center items-start justify-between md:space-x-4">
                    <div className="flex-col items-center h-24 w-1/6 mb-0 hidden md:flex">
                      {post.companyLogo && (
                        <img
                          src={post.companyLogo}
                          alt="Company logo"
                          className="w-full object-scale-down h-full rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex-auto justify-between py-2 w-3/4">
                      <div className="flex flex-wrap">
                        <div className="flex-col items-center h-full h-16 w-1/6 mb-1 flex md:hidden">
                          {post.companyLogo && (
                            <img
                              src={post.companyLogo}
                              alt="Company logo"
                              className="w-full object-scale-down h-full rounded-md"
                            />
                          )}
                        </div>
                        <div className="w-full flex-none text-sm text-blue-700 font-medium text-left">
                          {post.companyName}
                        </div>
                        <h2 className="flex-auto xl:text-xl text-lg font-medium">
                          {post.jobTitle}
                        </h2>
                        <div className="w-full flex align-center space-x-2 text-xs text-gray-400">
                          {post.location}
                        </div>
                      </div>
                      <div className="w-full flex py-4 text-sm text-gray-600">
                        <div className="w-full">
                          <p className="line-clamp-2 lg:w-full w-full">
                            {post.shortDesc + "..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {pageLoading && <SkeletonLoader loaderCount="4" />}
      {!showMoreLoading &&
        !pageLoading &&
        jobsToShow.length != filteredJobs.length && (
          <div className="flex items-center justify-center w-full mt-4">
            <button
              onClick={handleShowMoreJobs}
              className="px-5 rounded-md bg-gray-900  text-white font-semibold py-2 tracking-wider hover:bg-gray-800"
            >
              Load More
              {/* bg-gray-900 px-5 py-2 text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800 */}
            </button>
          </div>
        )}
      {showMoreLoading && <SkeletonLoader loaderCount="2" />}
    </div>
  );
};

export default JobComponent;
