import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { SelectLocation } from "./SelectLocation";
import { SearchIcon } from "../../assets/icons/Search";

const SearchBanner = () => {
  return (
    <div className="md:pt-44 pt-24 pb-16 md:pb-28 w-[93%] max-w-5xl mx-auto  ">
      <div>
        <h2 className="font-fira  text-white  md:font-semibold text-2xl text-center md:text-left md:text-4xl">
          One Search, Millions of Jobs
        </h2>
        <div className="flex gap-4 mt-4 md:mt-8">
          <Input
            variant="bordered"
            type="text"
            isClearable
            classNames={{
              label: "text-gray-400",
            }}
            label="Job Title, Skills or Company"
          />
          <Select
            className="hidden md:block"
            variant="bordered"
            classNames={{
              label: "text-gray-400",
            }}
            label="Job Type"
            selectionMode="single"
          >
            {["All", "On Site", "Remote", "Part-Time", "Hybrid"].map((cat) => (
              <SelectItem className="m-0" key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>

          <SelectLocation />
          <Button
            size="lg"
            className="w-[300px]  hidden md:flex"
            variant="solid"
            radius="md"
            color="danger"
          >
            Search Jobs
          </Button>
          <Button
            size="lg"
            className="  md:hidden flex"
            variant="solid"
            radius="md"
            isIconOnly
            color="danger"
          >
            <SearchIcon />
          </Button>
        </div>
        <p className="mt-2 text-sm text-white font-extralight">
          <span className="underline text-center md:text-left  cursor-pointer underline-offset-2">
            Upload or create a resume{" "}
          </span>
          to easily apply to jobs.
        </p>
      </div>
    </div>
  );
};

export default SearchBanner;
