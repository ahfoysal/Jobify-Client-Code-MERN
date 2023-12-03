import { Skeleton, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import useAxiosSecure from "../../hooks/useAxios";
import JobCardContainer from "./JobCardContainer";

const JobsShowcase = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState(null);

  const Axios = useAxiosSecure();
  const { isLoading, refetch } = useQuery({
    queryFn: () =>
      Axios.get("jobs/", {
        params: {
          limit: 3,
          category,
        },
      }),
    queryKey: ["jobs", category],
    onSuccess: (res) => {
      setJobs(res.data.data);
    },
  });
  const handleChange = (active) => {
    if (active === "All Jobs") {
      setCategory(null);
      return refetch();
    }
    setCategory(active);
    return refetch();
  };
  return (
    <div className="py-10   w-[93%] lg:w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 ">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        onSelectionChange={handleChange}
        classNames={{
          tabList:
            "md:gap-2 gap-6 w-full  relative  px-2  border-divider flex  md:flex-col  overflow-x-scroll  md:justify-center md:h-full justify-start items-start       ",
          cursor: "  bg-[#2d74c8] snap-y w-full  ",
          tab: "w-ful px-0  h-12  justify-start text-left",
          tabContent: " group-data-[selected=true]:text-[#06b6d4]  ",
        }}
      >
        {["All Jobs", "On Site", "Remote", "Part-Time", "Hybrid"].map((cat) => (
          <Tab
            key={cat}
            title={
              <div className="flex items-start hover:text-[#2d74c8]   group-data-[selected=true]:text-[#2d74c8]  text-lg text-primary   md:mx-3  w-full">
                <span> {cat}</span>
              </div>
            }
          >
            {isLoading ? (
              <div className="flex gap-6 h-full w-full">
                <Skeleton className="w-1/3 rounded-lg">
                  <div className="h-full w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton className="w-1/3 rounded-lg">
                  <div className="h-full w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton className="w-1/3 rounded-lg">
                  <div className="h-full w-full rounded-lg bg-secondary"></div>
                </Skeleton>
              </div>
            ) : (
              <JobCardContainer jobs={jobs} />
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default JobsShowcase;
