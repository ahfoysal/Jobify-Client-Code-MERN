import { useNavigate, useParams } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/react";
import AddJob from "../components/Dashboard/AddAJob";
import { useEffect, useState } from "react";
import AppliedJobs from "../components/Dashboard/AppliedJobs";
import MyJobs from "../components/Dashboard/MyJobs";

const DashboardLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(id);
  useEffect(() => {
    setSelected(id);
  }, [id]);

  const handleChange = (active) => {
    setSelected(active);
    navigate("/dashboard/" + active, { replace: true });
  };
  return (
    <div className=" py-32 w-[93%]  flex flex-col md:flex-row gap-10 mx-auto  min-h-[600px] ">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        onSelectionChange={handleChange}
        selectedKey={selected}
        classNames={{
          tabList:
            "md:gap-2 gap-2 w-full  relative  px-2  border-divider flex  md:flex-col  overflow-x-scroll  justify-start items-start       ",
          cursor: "  bg-[#2d74c8] snap-y w-full  ",
          tab: "w-ful px-0  h-12  justify-start text-left",
          tabContent: " group-data-[selected=true]:text-[#06b6d4]  ",
        }}
      >
        <Tab
          key="add"
          title={
            <div className="flex items-start text-lg text-primary group-data-[selected=true]:text-[#2d74c8]  hover:text-[#2d74c8]   md:mx-3  w-full">
              <span>Add Job</span>
            </div>
          }
        >
          <AddJob />
        </Tab>

        <Tab
          key="applied"
          title={
            <div className="flex items-start group-data-[selected=true]:text-[#2d74c8] hover:text-[#2d74c8]  text-lg text-primary  mx-3">
              <span>Applied Jobs</span>
            </div>
          }
        >
          <AppliedJobs />
        </Tab>
        <Tab
          key="my-jobs"
          title={
            <div className="flex items-start text-lg  group-data-[selected=true]:text-[#2d74c8] hover:text-[#2d74c8] text-primary   mx-3">
              <span>My Jobs</span>
            </div>
          }
        >
          <MyJobs />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashboardLayout;
