import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useAxiosSecure from "../../hooks/useAxios";
import { Spinner } from "@nextui-org/react";

import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import MyJobsTable from "../tables/MyJobTable";

const MyJobs = () => {
  const Axios = useAxiosSecure();

  const token = Cookies.get("user");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id) =>
      Axios.delete(
        "/jobs/" + id,

        {
          headers: {
            Authorization: token,
          },
        }
      ),
    onSuccess: (mutatedData) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast("Job Deleted  Successfully.");
      console.log(mutatedData.data.data.id);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something Went Wrong when deleting job.");
    },
  });

  const {
    data: items,

    isLoading,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      Axios.get(
        "/auth",

        {
          headers: {
            Authorization: token,
          },
        }
      ),
    onSuccess: (res) => {
      console.log(res?.data);
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Helmet>
        <title>My Jobs | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <MyJobsTable
        jobs={items?.data?.data?.user?.myJobs}
        isLoading={isLoading}
        mutate={mutate}
      />
    </div>
  );
};

export default MyJobs;
