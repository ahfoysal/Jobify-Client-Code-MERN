/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  Clock,
  DollarSign,
  History,
  MapPin,
  TimerOff,
  User,
} from "lucide-react";
import ApplyForm from "../Modal/ApplyForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContextProvider";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  function createdDate(date) {
    const relativeTime = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });

    return relativeTime.replace("about ", "");
  }

  return (
    <Card className="h-full last:hidden lg:last:block bg-transparent border-divider border">
      <CardHeader className="flex gap-3">
        <div className="flex justify-between w-full flex-col">
          <p className="text-md line-clamp-1">{job?.title}</p>
          <p className="text-small text-default-500">{job?.companyName}</p>
        </div>
        <Image
          alt="logo"
          height={40}
          radius="sm"
          src={job?.companyLogo}
          width={40}
        />
      </CardHeader>
      <Divider />
      <CardBody className="md:p-5 p-4 ">
        <div className="md:text-base  text-sm text-muted-foreground grid gap-y-4 grid-cols-2  ">
          <div className="flex gap-3   items-center">
            <Clock className="text-[#2d74c8]" />
            <span>{job?.category}</span>
          </div>
          <div className="flex gap-3   items-center">
            <DollarSign className="text-[#2d74c8]" />
            <span>
              {job.minSalary} - {job.maxSalary}
            </span>
          </div>
          <div className="flex gap-3   items-center">
            <MapPin className="text-[#2d74c8]" />
            <span> {job?.jobLocation}</span>
          </div>

          <div className="flex gap-3   items-center">
            <User className="text-[#2d74c8]" />
            <span>{job?.applied?.length} Applied</span>
          </div>
          <div className="flex gap-3   items-center">
            <History />
            <span className="">{createdDate(job?.createdAt)}</span>
          </div>
          <div className="flex gap-3   items-center">
            <TimerOff className="text-danger" />
            <span className="line-clamp-1">
              {format(parseISO(job?.deadline), "dd MMM, yyyy", {
                awareOfUnicodeTokens: true,
              })}
            </span>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <Button
          color="primary"
          variant="bordered"
          onClick={() => {
            if (user) {
              navigate("/job/" + job?._id);
            } else {
              navigate("/login/");
              toast.error("You have to log in first to view details");
            }
          }}
        >
          View Details
        </Button>
        <ApplyForm
          title={job?.title}
          companyName={job.companyName}
          jobID={job?._id}
          postedBy={job?.postedBy?._id}
          isDisabled={new Date(job.deadline) > new Date() ? false : true}
          isBigIcon={false}
        />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
