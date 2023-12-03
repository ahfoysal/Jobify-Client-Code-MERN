import { Button, Divider, Input } from "@nextui-org/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContextProvider";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { Icons } from "../assets/Icons";
import { Button as AuthButton } from "@/components/ui/button";
import Cookies from "js-cookie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const Axios = useAxiosSecure();

  const navigate = useNavigate();
  const { signIn, user, setUser, googleSignIn } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  const { path } = location.state || {};

  const onSubmit = async (userData) => {
    setIsLoading(true);
    const { email, password } = userData;
    signIn(email, password)
      .then((result) => {
        Cookies.set("user", result?.data?.data?.accessToken, { expires: 30 });
        setUser(result?.data?.data?.user);
        console.log(result?.data?.data?.accessToken);
        toast.success("Successfully logged in");
        navigate(path || "/");

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      });
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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
    navigate(path || "/");
    Cookies.set("user", response?.data?.data?.accessToken, { expires: 30 });

    console.log(response?.data);

    return response; // Assuming your response contains a user object
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-[93%]  max-w-lg mx-auto gap-10 flex  flex-col min-h-[90vh] my-16  items-center justify-center "
    >
      <Helmet>
        <title>Sign In | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <Link to={"/"} className="flex items-center justify-center text-4xl">
        J <img className=" max-h-[40px] " src="/logo.png" alt="" />
        BIFY
      </Link>
      <Card className="bg-transparent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In to your account</CardTitle>
          <CardDescription>
            By signing in, you understand and agree to our Terms and Conditions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid  gap-6">
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
          <div className="relative flex items-center">
            <Divider className="flex-1" />
            <div className="relative flex justify-center text-xs uppercase">
              <span className=" px-2 text-muted-foreground">Or</span>
            </div>
            <Divider className="flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-center ">
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
                      <p className="text-left text-red-500 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
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
                    message: "Password is incorrect",
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
                      <p className="text-left text-red-500 text-sm mt-2">
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
              className="w-full  rounded-lg py-1 font-bold  "
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing In
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className=" text-sm text-center">
            Dont’t Have An Account ?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#FF705B] hover:text-[#FFB457] cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </CardFooter>
        <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
      </Card>
    </motion.div>
  );
};

export default SignIn;

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
