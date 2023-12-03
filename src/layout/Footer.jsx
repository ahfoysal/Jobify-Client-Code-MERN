import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icons } from "../assets/Icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className=" border-t w-full">
      <div className="max-w-7xl w-[93%] mx-auto py-12 gap-10 lg:gap-0  ">
        <div className="md:flex-row flex-col flex gap-10 items-center">
          <Link to={"/"} className="flex items-center  justify-center text-4xl">
            J <img className=" max-h-[40px] " src="/logo.png" alt="" />
            BIFY
          </Link>
          <ul className=" list-none flex justify-center flex-wrap items-center   gap-4">
            {[
              { name: "About Us", path: "about" },

              { name: "Partners", path: "partners" },
              { name: "Faq", path: "faq" },
              { name: "Popular Jobs", path: "jobs" },
            ].map((el, index) => {
              return (
                <Link key={index} to={`/${el?.path}`}>
                  <motion.li
                    variants={hoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className=" cursor-pointer text-lg font-extralight "
                  >
                    {el.name}
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className=" md:flex-row flex-col flex gap-10 justify-center md:justify-between ">
          <div className="mt-5  flex h-5 justify-center  items-center space-x-4 text-small text-muted-foreground font-extralight">
            <div>+8801861389963</div>
            <Divider orientation="vertical" />
            <div>Mirpur, Dhaka</div>
          </div>

          <div className="flex gap-8 justify-center">
            <Icons.apple className=" h-8 w-8" />
            <Icons.facebookIcon className=" h-8 w-8" />
            <Icons.youtubeIcon className=" h-8 w-8" />

            <LinkedInLogoIcon className=" h-8 w-8" />
          </div>
        </div>
      </div>

      <Divider className="mb-4" />

      <div className="py-3">
        <p className="text-sm text-muted-foreground  font-extralight text-center">
          2023© Jobify by
          <span className="text-secondary-foreground hover:text-[#428ee6]">
            {" "}
            Pewds{" "}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
const hoverVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
  hover: {
    scale: [1, 1.06, 1, 1.06, 1],
    originX: 0,
    color: "#428ee6",
  },
};
