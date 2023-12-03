import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button, Image, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxios";
import {
  Clock,
  DollarSign,
  History,
  MapPin,
  TimerOff,
  User,
} from "lucide-react";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import ApplyForm from "../components/Modal/ApplyForm";
import { Helmet } from "react-helmet-async";
import { HeartIcon } from "../assets/icons/Heart";

const JobDetails = () => {
  const { id } = useParams();
  const Axios = useAxiosSecure();

  const { data: item, isLoading } = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => Axios.get("jobs/" + id),
  });

  if (isLoading)
    return (
      <div className="p-32 ">
        <Spinner />
      </div>
    );

  function createdDate(date) {
    const relativeTime = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });

    return relativeTime.replace("about ", "");
  }
  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      initial="hidden"
      animate="visible"
      className="py-8 md:py-16 max-w-4xl  w-[93%] mx-auto"
    >
      <Helmet>
        <title>
          {item.data.data.title} ({item.data?.data?.category}) | Jobify
        </title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <div className="py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-full flex items-center md:max-h-[164px] max-w-full md:max-w-[25%]  w-full md:w-fit">
            <Image
              radius="sm"
              size="lg"
              className="md:max-h-[164px]  min-h-full  md:min-h-[164px] w-full"
              src={item.data.data.image}
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h3 className=" text-2xl md:text-4xl font-medium ">
                {item.data.data.title}
              </h3>
              <p className="text-lg mt-4 text-foreground-500">
                {item.data.data?.companyName}
              </p>
            </div>
            <div className="md:text-base w-full  text-sm text-muted-foreground grid gap-4 grid-cols-2 md:grid-cols-3  ">
              <div className="flex gap-3   items-center">
                <Clock className="text-[#2d74c8]" />
                <span>{item.data.data.category}</span>
              </div>
              <div className="flex gap-3   items-center">
                <DollarSign className="text-[#2d74c8]" />
                <span>
                  {item.data.data.minSalary} - {item.data.data.maxSalary}
                </span>
              </div>
              <div className="flex gap-3   items-center">
                <MapPin className="text-[#2d74c8]" />
                <span> {item.data.data.jobLocation}</span>
              </div>

              <div className="flex gap-3   items-center">
                <User className="text-[#2d74c8]" />
                <span>{item.data.data.applied?.length} Applied</span>
              </div>
              <div className="flex gap-3   items-center">
                <History />
                <span className="">
                  {createdDate(item.data.data.createdAt)}
                </span>
              </div>
              <div className="flex gap-3   items-center">
                <TimerOff className="text-danger" />
                <span className="line-clamp-1">
                  {format(parseISO(item.data.data.deadline), "dd MMM, yyyy", {
                    awareOfUnicodeTokens: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center my-8">
          <div>
            <h3 className=" text-xl md:text-2xl  ">Job Description</h3>

            <p className="mt-4 max-w-7xl md:text-lg font-thin text-foreground-500">
              {item.data?.data?.description}
            </p>
          </div>
        </div>
        <div className="flex  mx-auto    my-8  gap-4 items-center">
          <ApplyForm
            title={item.data.data?.title}
            companyName={item.data.data.companyName}
            jobID={item.data.data?._id}
            postedBy={item.data.data?.postedBy?._id}
            isDisabled={
              new Date(item.data.data.deadline) > new Date() ? false : true
            }
            size={"md"}
            radius={"sm"}
          />
          <Button isIconOnly color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
          <div></div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vh",
  },
  exit: {
    x: "100vh",
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,

      type: "spring",
    },
  },
};
