import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../hooks/useAxios";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import JobsTable from "../components/tables/JobsTable";

const Jobs = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [filterValue, setFilterValue] = useState(null);
  const [category, setCategory] = useState(null);

  const Axios = useAxiosSecure();

  const {
    data: items,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["jobs", category, page, rowsPerPage, filterValue],
    queryFn: () =>
      Axios("/jobs", {
        params: {
          page,
          limit: rowsPerPage,
          searchTerm: filterValue,
          category,
        },
      }),
    onSuccess: (res) => {
      setRowsPerPage(res?.data?.meta?.limit);
      setPage(res?.data?.meta?.page);
      setTotal(res?.data?.meta?.total);
    },
  });

  return (
    <motion.div
      exit="exit"
      initial="hidden"
      animate="visible"
      className="py-20 mt-10 container mx-auto"
    >
      <Helmet>
        <title>Jobs in Bangladesh | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <JobsTable
        jobs={items?.data?.data}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        refetch={refetch}
        setCategory={setCategory}
        filterValue={filterValue}
        isLoading={isLoading}
        isSuccess={isSuccess}
        items={items}
        setTotal={setTotal}
        setFilterValue={setFilterValue}
      />
    </motion.div>
  );
};

export default Jobs;
