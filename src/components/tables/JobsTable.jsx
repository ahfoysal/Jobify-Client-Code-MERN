/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/icons/Search";
import { ChevronDownIcon } from "../../assets/icons/ChevronDown";
import { capitalize } from "../../others/Capitalize";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { PlusIcon } from "../../assets/icons/Plus";
import ApplyForm from "../Modal/ApplyForm";
import { Link } from "react-router-dom";
import { columns } from "../jobs/CoulumnsData";

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "salary",
  "category",
  // "status",
  "actions",
  "posted",
  "deadline",
];

export default function JobsTable({
  jobs,
  setPage,
  page,
  rowsPerPage,
  setRowsPerPage,
  total,
  refetch,
  setCategory,
  filterValue,
  setFilterValue,
  isLoading,
}) {
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(total / rowsPerPage);
  function createdDate(date) {
    const relativeTime = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });

    return relativeTime.replace("about ", "");
  }

  const renderCell = React.useCallback((job, columnKey) => {
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
      case "status":
        return (
          <Chip
            className="capitalize"
            color={new Date(job.deadline) > new Date() ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {new Date(job.deadline) > new Date() ? " Active" : "Expired"}
          </Chip>
        );
      case "deadline":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {format(parseISO(job?.deadline), "dd MMM, yyyy", {
                awareOfUnicodeTokens: true,
              })}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="flex gap-4">
            <ApplyForm
              title={job?.title}
              companyName={job.companyName}
              size="sm"
              jobID={job?._id}
              postedBy={job?.postedBy?._id}
              isDisabled={new Date(job.deadline) > new Date() ? false : true}
            />
            <Button as={Link} to={"/job/" + job?._id} size="sm" variant="solid">
              Details
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const onRowsPerPageChange = React.useCallback(
    (e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const onSearchChange = React.useCallback(
    (value) => {
      if (value) {
        setFilterValue(value);
        console.log(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [setFilterValue, setPage]
  );

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setPage, setFilterValue]);

  const onPaginate = React.useCallback(
    (value) => {
      console.log(value);
      setPage(value);
      refetch();
    },
    [setPage, refetch]
  );
  const handleFilter = React.useCallback(
    (e) => {
      const selectedType = e.target.value;

      if (selectedType === "All" || selectedType === "") {
        setPage(1);
        setCategory(null);
        refetch();
      } else {
        setPage(1);
        setCategory(selectedType);
        refetch();
      }
    },
    [setCategory, setPage, refetch]
  );
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue || ""}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Select
              onChange={handleFilter}
              variant="flat"
              label="Category"
              className="min-w-[80px] hidden md:flex"
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex ">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
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
            <Button
              as={Link}
              to={"/dashboard/add"}
              color="primary"
              className="flex md:hidden"
              endContent={<PlusIcon />}
            >
              Add Job
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {total} jobs found
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onClear,
    visibleColumns,
    onRowsPerPageChange,
    total,
    onSearchChange,
    handleFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={isLoading ? 1 : page}
            total={isLoading ? 10 : pages}
            onChange={onPaginate}
          />
        }
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, isLoading, onNextPage, onPreviousPage, onPaginate]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-fit",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
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
