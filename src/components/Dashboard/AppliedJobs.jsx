import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useAxiosSecure from "../../hooks/useAxios";
import { Spinner } from "@nextui-org/react";
import { Helmet } from "react-helmet-async";
import AppliedJobTable from "../tables/AppliedJobTable";

const AppliedJobs = () => {
  const Axios = useAxiosSecure();

  const token = Cookies.get("user");

  const {
    data: items,

    isLoading,
  } = useQuery({
    queryKey: ["applied"],
    queryFn: () =>
      Axios.get(
        "/job/applied",

        {
          headers: {
            Authorization: token,
          },
        }
      ),
    onSuccess: (res) => {
      console.log(res.data.data);
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Helmet>
        <title>Applied Jobs | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <AppliedJobTable jobs={items?.data?.data} isLoading={isLoading} />
    </div>
  );
};

export default AppliedJobs;
