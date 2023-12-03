/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { pdfUpload } from "../../helpers/Cloudinary";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";

export default function ApplyForm({
  companyName,
  isDisabled,
  title,
  jobID,
  postedBy,
  ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const Axios = useAxiosSecure();
  emailjs.init("EAfi-a877NAIhgLbE");
  const onSubmit = (data) => {
    setIsLoading(true);
    if (!data.resume) {
      console.log("ok");
      setIsLoading(false);

      return setError("resume", {
        type: "manual",
        message: "CV is required.",
      });
    }
    data.jobID = jobID;
    console.log(postedBy, user.id);

    mutate(data);
  };
  const token = Cookies.get("user");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (obj) =>
      Axios.post("/job/apply", obj, {
        headers: {
          Authorization: token,
        },
      }),

    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something Went Wrong.");

      setIsLoading(false);
    },
    onSuccess: (mutatedData) => {
      queryClient.invalidateQueries({ queryKey: ["jobs", jobID] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      toast.success("Job applied  Successfully.");
      onClose();
      console.log(mutatedData);
      console.log("name", "email", companyName);
      const data = {
        name: mutatedData.data.data.name,
        email: mutatedData.data.data.email,
        company: companyName,
        title,
      };
      console.log(data);
      emailjs.send("service_tsbphxf", "template_xdnmvut", data).then(
        function (response) {
          console.log("Email sent successfully:", response);
        },
        function (error) {
          console.error("Email not sent, error:", error);
        }
      );
      // navigate("/job/" + mutatedData.data.data._id);

      setIsLoading(false);
    },
  });

  const handleFileChange = async (event) => {
    setIsLoading(true);
    toast.loading("Uploading Resume Please Wait...");

    const file = event.target.files[0];

    if (file) {
      try {
        const imageUrl = await pdfUpload(file);
        console.log(imageUrl);
        const { secure_url } = imageUrl;
        console.log(secure_url);

        setValue("resume", secure_url);
        setIsLoading(false);

        clearErrors("resume");
      } catch (e) {
        console.log(e);
        setIsLoading(false);

        toast.error(
          "Something went wrong while uploading CV. PLease try again."
        );
      }
    }
  };
  const navigate = useNavigate();
  const handleUnauthorizeUser = () => {
    toast.error("Only Logged in user can apply.");
    navigate("/login");
  };
  const handleApply = () => {
    if (postedBy === user?.id) {
      setIsLoading(false);
      return toast.error("You cannot apply to your own job.");
    }
    if (user) {
      onOpen();
    } else {
      handleUnauthorizeUser();
    }
  };

  return (
    <>
      <Button
        onPress={handleApply}
        // size={isBigIcon ? "lg" : "sm"}
        variant="solid"
        {...props}
        // radius={isBigIcon ? "full" : "sm"}
        isDisabled={isDisabled}
        className={` text-white ${isDisabled ? "bg-danger" : "bg-[#2d74c8]"}`}
      >
        {isDisabled ? "Expired" : "Apply"}
      </Button>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onClose}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title || "Apply"}
              </ModalHeader>
              <ModalBody>
                <Controller
                  name="name"
                  defaultValue={user?.name}
                  rules={{
                    required: "Name is required",
                  }}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        label="Name"
                        defaultValue={user?.name || ""}
                        placeholder="Enter your Name"
                        type="text"
                        variant="bordered"
                      />
                      {errors.name && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user?.email}
                  rules={{
                    required: "Email is required",
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        autoFocus
                        defaultValue={user?.email}
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                      />
                      {errors.email && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Input
                  type="file"
                  label="Upload Your Resume"
                  placeholder="file"
                  variant="bordered"
                  className="py-2"
                  onChange={handleFileChange}
                  accept=".pdf, .doc, .docx" // Define accepted file types
                />
                {errors.resume && (
                  <p className="text-left text-red-500 text-sm mt-2">
                    {errors.resume.message}
                  </p>
                )}

                <div className="flex py-2 px-1 justify-between">
                  <Controller
                    name="rememberMe"
                    control={control}
                    rules={{
                      required: "You need to agree to our terms and conditions",
                    }}
                    render={({ field }) => (
                      <div>
                        <Checkbox
                          {...field}
                          classNames={{
                            label: "text-small",
                          }}
                        >
                          I have read and I accept the Privacy Policy{" "}
                        </Checkbox>
                        {errors.rememberMe && (
                          <p className="text-left text-red-500 text-sm mt-2">
                            {errors.rememberMe.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isLoading}
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                  color="primary"
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
