import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_Backend_Url,
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          Cookies.remove("user");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
