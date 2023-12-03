/* eslint-disable react/prop-types */

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { ChevronDownIcon } from "../../assets/icons/ChevronDown";
import { capitalize } from "../../others/Capitalize";
import { formatDistanceToNow } from "date-fns";
import { usePDF } from "react-to-pdf";

import { columns } from "../dashboard/Data";
import { Link } from "react-router-dom";

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "salary",
  "category",
  "status",
  "actions",
  "posted",
  "deadline",
];

export default function AppliedJobTable({
  jobs,

  isLoading,
}) {
  const [filteredData, setFilteredData] = useState(jobs);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  function createdDate(date) {
    const relativeTime = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });

    return relativeTime.replace("about ", "");
  }
  const renderCell = React.useCallback((item, columnKey) => {
    const job = item?.job;
    const cellValue = job[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{ radius: "lg", src: job?.companyLogo, size: "lg" }}
            description={job?.companyName}
            name={job?.title}
          ></User>
        );
      case "posted":
        return (
          <User
            avatarProps={{
              radius: "full",
              src: job.postedBy?.imageUrl,

              size: "sm",
            }}
            description={createdDate(job?.createdAt)}
            name={job?.postedBy?.name}
          ></User>
        );
      case "salary":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  capitalize">
              {job.minSalary} - {job.maxSalary}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="flex gap-4">
            <Button
              onClick={() => window.open(item?.resume, "_blank", "noreferrer")}
              size="sm"
              variant="solid"
            >
              View Resume
            </Button>

            <Button
              to={"/job/" + job?._id}
              as={Link}
              color="primary"
              size="sm"
              variant="solid"
            >
              Details
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleFilter = React.useCallback(
    (e) => {
      const selectedType = e.target.value;

      if (selectedType === "All") {
        setFilteredData(jobs);
      } else {
        const filteredJobs = jobs.filter(
          (job) => job.job.category === selectedType
        );
        setFilteredData(filteredJobs);
      }
    },
    [jobs]
  );
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <div className="div">
            <span className=" text-xl">
              Total Job Applied {filteredData?.length}
            </span>
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small " />}
                  variant="flat"
                  className="w-fit"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Select
              onChange={handleFilter}
              variant="flat"
              label="Category"
              className="min-w-[80px]"
              selectionMode="single"
              labelPlacement="outside"
            >
              {["All", "On Site", "Remote", "Part-Time", "Hybrid"].map(
                (cat) => (
                  <SelectItem className="m-0" key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                )
              )}
            </Select>

            <Button
              color="primary"
              className="w-fit min-w-[150px]"
              onClick={() => toPDF()}
            >
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    );
  }, [visibleColumns, filteredData?.length, toPDF, handleFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      ref={targetRef}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-fit",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={"center"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        emptyContent={isLoading ? "Loading Jobs" : "No jobs found"}
        items={filteredData ? filteredData : []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
