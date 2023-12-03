/* eslint-disable react/prop-types */

import React from "react";
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
} from "@nextui-org/react";

import { ChevronDownIcon } from "../../assets/icons/ChevronDown";
import { capitalize } from "../../others/Capitalize";
import { formatDistanceToNow } from "date-fns";

import { columns } from "../dashboard/Data";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import Delete from "../dashboard/DeleteDialog";
import { PlusIcon } from "../../assets/icons/Plus";

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "salary",
  "category",
  "status",
  "actions",
  "posted",
  "deadline",
];

export default function MyJobsTable({ jobs, mutate, isLoading }) {
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
  const renderCell = React.useCallback(
    (item, columnKey) => {
      const job = item;
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
                size="sm"
                variant="solid"
                as={Link}
                to={"/job/update/" + item?._id}
                color="primary"
              >
                Edit
              </Button>

              <Delete mutate={mutate} id={item?._id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [mutate]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <div className="div">
            <span className=" text-xl">Total My Jobs {jobs?.length}</span>
          </div>
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
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
            <Button
              as={Link}
              to={"/dashboard/add"}
              color="primary"
              className="flex md:hidden"
              endContent={<PlusIcon />}
            >
              Add Job
            </Button>
            <Button onClick={() => toPDF()} color="primary">
              Download Summary
            </Button>
          </div>
        </div>
      </div>
    );
  }, [visibleColumns, jobs?.length, toPDF]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContentPlacement="outside"
      ref={targetRef}
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
        items={jobs ? jobs : []}
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
