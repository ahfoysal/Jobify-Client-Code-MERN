/* eslint-disable react/prop-types */

import JobCard from "./JobCard";

const JobCardContainer = ({ jobs }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobCardContainer;
