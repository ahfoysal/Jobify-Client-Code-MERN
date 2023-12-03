import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { imageUpload } from "../helpers/Cloudinary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxios";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

const UpdateJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [date, setDate] = useState(new Date());
  const [bannerUrl, setBannerUrl] = useState();
  const [logoUrl, setLogoUrl] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bannerRef = useRef(null);
  const companyLogoRef = useRef(null);
  const Axios = useAxiosSecure();

  const onSubmit = async (inputData) => {
    if (!bannerUrl) {
      return toast.error("Job Banner is required");
    }
    if (!logoUrl) {
      return toast.error("Company Logo is required");
    }
    setIsLoading(true);

    inputData.deadline = date;
    inputData.image = bannerUrl;
    inputData.companyLogo = logoUrl;
    console.log(inputData);

    mutate(inputData);
  };
  const token = Cookies.get("user");

  const { mutate } = useMutation({
    mutationFn: (obj) =>
      Axios.patch("/jobs/" + id, obj, {
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: (mutatedData) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Job Updated  Successfully.");
      console.log(mutatedData.data.data.id);

      navigate("/job/" + mutatedData.data.data._id);
      setIsLoading(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something Went Wrong.");

      setIsLoading(false);
    },
  });

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await imageUpload(selectedFile);
        const { secure_url } = imageUrl;
        console.log(secure_url);
        setBannerUrl(secure_url);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleCompanyFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await imageUpload(selectedFile);

        const { secure_url } = imageUrl;
        setLogoUrl(secure_url);
        console.log(secure_url);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleButtonClick = () => {
    if (bannerRef.current) {
      bannerRef.current.click();
    }
  };
  const handleCompanyButtonClick = () => {
    if (companyLogoRef.current) {
      companyLogoRef.current.click();
    }
  };
  const {
    data: items,

    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => Axios.get("jobs/" + id),
    onSuccess: (res) => {
      console.log(res?.data?.data?.deadline);
      setDate(new Date(res?.data?.data?.deadline));
      setBannerUrl(res?.data?.data?.image);
      setLogoUrl(res?.data?.data?.companyLogo);
    },
  });

  if (isQueryLoading) return <Spinner />;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-[93%] mx-auto  py-32   flex items-center justify-center "
    >
      <Helmet>
        <title>Update Job | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <Card className=" bg-transparent w-full  ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl mb-4">Update Job</CardTitle>
          <Divider />
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" gap-4 grid grid-cols-1 md:grid-cols-4 text-center"
          >
            <div className="md:col-span-3">
              {" "}
              <div className="mb-4">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={items?.data?.data.title}
                  rules={{ required: "Job Title is required" }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="text"
                        variant={"bordered"}
                        label="Job Title *"
                      />
                      {errors.title && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="mb-4 flex-1">
                  <Controller
                    name="jobLocation"
                    control={control}
                    defaultValue={items?.data?.data.jobLocation}
                    rules={{ required: "Job Location is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          variant={"bordered"}
                          label="Job Location *"
                        />
                        {errors.jobLocation && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.jobLocation.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="mb-4 flex-1">
                  <Controller
                    name="category"
                    control={control}
                    defaultValue={items?.data?.data.category}
                    rules={{ required: "Job Type is required" }}
                    render={({ field }) => (
                      <div>
                        <Select
                          {...field}
                          label="Job Type *"
                          variant="bordered"
                          defaultSelectedKeys={[items?.data?.data?.category]}
                        >
                          {["On Site", "Remote", "Part-Time", "Hybrid"].map(
                            (item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            )
                          )}
                        </Select>
                        {errors.category && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="mb-4 flex-1">
                  <Controller
                    name="companyName"
                    control={control}
                    defaultValue={items?.data?.data.companyName}
                    rules={{ required: "Company Name is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          variant={"bordered"}
                          label="Company Name *"
                        />
                        {errors.companyName && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="mb-4 flex-1">
                  <div className="w-full h-full  border-default-200 border-medium flex-col rounded-medium py-2 px-3 flex text-left justify-center">
                    <span className="text-sm text-foreground-600">
                      Deadline *
                    </span>
                    <DatePicker
                      selected={date}
                      className="bg-transparent flex-1 focus:outline-none w-full "
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex gap-4 w-full">
                <div className="mb-4 flex-1">
                  <Controller
                    name="minSalary"
                    control={control}
                    defaultValue={items?.data?.data.minSalary}
                    rules={{ required: "Minimum Salary is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="number"
                          variant="bordered"
                          label="Minimum Salary *"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                        />
                        {errors.minSalary && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.minSalary.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="mb-4 flex-1">
                  <Controller
                    name="maxSalary"
                    control={control}
                    defaultValue={items?.data?.data.maxSalary}
                    rules={{ required: "Maximum Salary is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="number"
                          variant="bordered"
                          label="Maximum Salary *"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                        />
                        {errors.maxSalary && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.maxSalary.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <Controller
                  name="description"
                  rules={{ required: "Description is required" }}
                  control={control}
                  defaultValue={items?.data?.data.description}
                  render={({ field }) => (
                    <div>
                      <Textarea
                        {...field}
                        type="text"
                        variant="bordered"
                        label=" Description"
                      />
                      {errors.description && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="div flex flex-col justify-center items-center gap-4">
              <Card
                onClick={handleButtonClick}
                className="cursor-pointer w-full border-divider bg-transparent border-dashed flex-1"
              >
                {bannerUrl ? (
                  <img
                    src={bannerUrl}
                    alt="a"
                    className="overflow-hidden w-full h-full"
                  />
                ) : (
                  <CardContent className="flex justify-center items-center flex-col  min-h-[150px]  gap-4 h-full w-full">
                    <Image />

                    <p>Add Job Banner</p>
                  </CardContent>
                )}

                <input
                  type="file"
                  ref={bannerRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Card>
              <Card
                onClick={handleCompanyButtonClick}
                className="cursor-pointer w-full border-divider bg-transparent border-dashed flex-1"
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="a"
                    className="overflow-hidden h-full w-full"
                  />
                ) : (
                  <CardContent className="flex justify-center  min-h-[150px]  items-center flex-col gap-4 h-full w-full">
                    <Image />
                    <p>Add Company Logo</p>
                  </CardContent>
                )}
                <input
                  type="file"
                  ref={companyLogoRef}
                  className="hidden"
                  onChange={handleCompanyFileChange}
                />
              </Card>
            </div>
            <Button
              color="primary"
              isLoading={isLoading}
              size="lg"
              className="w-full  rounded-lg py-1 font-bold  "
              type="submit"
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpdateJob;

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
