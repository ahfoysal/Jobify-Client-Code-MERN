import { Button, Input } from "@nextui-org/react";
import { CameraIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContextProvider";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { Icons } from "../assets/Icons";
import { Button as AuthButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { signUp, user, setUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  const { path } = location.state || {};
  const Axios = useAxiosSecure();

  const onSubmit = async (userData) => {
    setIsLoading(true);
    const { email, password, name, imageUrl } = userData;
    console.log(userData);

    signUp(
      email,
      password,
      name,
      imageUrl || "https://i.pravatar.cc/150?u=" + email
    )
      .then((result) => {
        setUser(result?.data?.data?.user);

        Cookies.set("user", result.data.data.accessToken, { expires: 30 });
        console.log(result?.data?.data?.accessToken);

        navigate(path || "/");
        toast.success("Successfully logged in");

        setIsLoading(false);
        console.log(result);
      })
      .catch((err) => {
        // console.log(err?.response?.data?.message);

        console.log(err);
        setIsLoading(false);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  const providerSignIn = async (token) => {
    const response = await Axios.post(
      "/auth/provider",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.success("Successfully logged in");
    setUser(response?.data?.data?.user);
    Cookies.set("user", response?.data?.data?.accessToken, { expires: 30 });

    navigate(path || "/");

    return response; // Assuming your response contains a user object
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className=" mx-auto w-[93%] max-w-lg flex-col gap-10 min-h-[90vh] my-16 flex items-center justify-center "
    >
      <Helmet>
        <title>Sign Up | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <Link to={"/"} className="flex items-center justify-center text-4xl">
        J<img className=" max-h-[40px] " src="/logo.png" alt="" />
        BIFY
      </Link>
      <Card className="bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            By creating an account , you understand and agree to our Terms.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <AuthButton
              variant="outline"
              onClick={() => {
                googleSignIn()
                  .then((result) => {
                    // setUser(result.user);

                    setIsLoading(false);

                    providerSignIn(result._tokenResponse.idToken);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Continue with Google
            </AuthButton>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-center ">
            <div className="mb-4 ">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                className="w-full"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="test"
                      variant={"bordered"}
                      label="Name"
                    />
                    {errors.name && (
                      <p className="text-left flex-1 text-red-500 text-sm mt-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="email"
                      variant={"bordered"}
                      label="Email"
                    />
                    {errors.email && (
                      <p className="text-left text-red-500 text-sm mt-2  break-words	">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="imageUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      endContent={
                        <CameraIcon className="h-6 w-6 text-default-400 pointer-events-none" />
                      }
                      variant={"bordered"}
                      label="Image Url"
                    />
                  </div>
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                    message:
                      "Password must contain at least one capital letter and one special character",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      variant={"faded"}
                      label="Password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                    />
                    {errors.password && (
                      <p className="text-left text-red-500 text-sm mt-2  w-72 line-clamp-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              color="primary"
              className="w-full font-bold  rounded-lg py-1 "
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className=" text-sm text-center">
            Already have a account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#FF705B] hover:text-[#FFB457] cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>
        </CardFooter>
        <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
      </Card>
    </motion.div>
  );
};

export default SignUp;
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vh",
  },
  exit: {
    x: "-100vh",
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
