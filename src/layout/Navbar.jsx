import {
  Navbar,
  NavbarContent,
  Button,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";

import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../components/ModeToggle";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContextProvider";
import AuthDropDown from "../components/navbar/AuthDropDown";
import { motion } from "framer-motion";
import { PlusIcon } from "../assets/icons/Plus";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar
      isBordered={false}
      shouldHideOnScroll
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className=" bg-black/30 text-white dark:bg-background/50 backdrop-blur-sm fixed top-0 "
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#428ee6]",
          "data-[active=true]:text-[#428ee6]",
          "data-[active=false]:hover:text-[#428ee6]",
        ],
      }}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="start" className="flex gap-12">
        <motion.div
          className="flex justify-center "
          initial="hidden"
          animate="visible"
          variants={logoVariant}
        >
          <Link to={"/"} className="flex items-center justify-center text-4xl">
            J <img className=" max-h-[40px] " src="/logo.png" alt="" />
            BIFY
          </Link>
        </motion.div>
        <div className="hidden md:flex gap-8">
          <motion.div
            initial="hidden"
            className="flex gap-6"
            animate="visible"
            variants={menuVariant}
          >
            <motion.div variants={childVariant}>
              <NavLink to="/">
                {({ isActive }) => (
                  <NavbarItem
                    className="hover:text-[#428ee6] link-underline"
                    isActive={isActive}
                  >
                    {" "}
                    Home{" "}
                  </NavbarItem>
                )}
              </NavLink>
            </motion.div>

            <motion.div variants={childVariant}>
              <NavLink to="/jobs" aria-current="page">
                {({ isActive }) => (
                  <NavbarItem
                    className="hover:text-[#428ee6] link-underline"
                    isActive={isActive}
                  >
                    Browse Jobs
                  </NavbarItem>
                )}
              </NavLink>
            </motion.div>

            {user && (
              <motion.div variants={childVariant}>
                <NavLink to="/dashboard/applied">
                  {({ isActive }) => (
                    <NavbarItem
                      className="hover:text-[#428ee6] link-underline"
                      isActive={isActive}
                    >
                      Applied
                    </NavbarItem>
                  )}
                </NavLink>
              </motion.div>
            )}
            {user && (
              <motion.div variants={childVariant}>
                <NavLink to="/dashboard/my-jobs">
                  {({ isActive }) => (
                    <NavbarItem
                      className="hover:text-[#428ee6] link-underline "
                      isActive={isActive}
                    >
                      My Jobs
                    </NavbarItem>
                  )}
                </NavLink>
              </motion.div>
            )}
            <motion.div variants={childVariant}>
              <NavLink to="/blogs" aria-current="page">
                {({ isActive }) => (
                  <NavbarItem
                    className="hover:text-[#428ee6] link-underline"
                    isActive={isActive}
                  >
                    Blogs
                  </NavbarItem>
                )}
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </NavbarContent>

      <NavbarContent
        className=" flex flex-1 items-center gap-4 justify-center"
        justify="center"
      ></NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        {user && (
          <Button
            as={Link}
            to={"/dashboard/add"}
            color="primary"
            className="hidden md:flex"
            endContent={<PlusIcon />}
          >
            Add Job
          </Button>
        )}
        {user ? (
          <AuthDropDown user={user} logout={logout} />
        ) : (
          <div>
            <Button
              as={Link}
              to={"/login"}
              color="default"
              className="text-white"
              variant="flat"
            >
              Login
            </Button>
          </div>
        )}
        <div className=" hidden md:block">
          <ModeToggle />
        </div>
      </NavbarContent>
      <NavbarMenu>
        <NavLink to="/">
          {({ isActive }) => (
            <NavbarItem
              className="hover:text-[#428ee6] h-fit mb-4"
              isActive={isActive}
            >
              Home
            </NavbarItem>
          )}
        </NavLink>

        <NavLink to="/jobs" aria-current="page">
          {({ isActive }) => (
            <NavbarItem
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#428ee6] h-fit mb-4"
              isActive={isActive}
            >
              Jobs
            </NavbarItem>
          )}
        </NavLink>
        {user && (
          <NavLink to="/dashboard/add" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#428ee6] h-fit mb-4"
                isActive={isActive}
              >
                Add Job
              </NavbarItem>
            )}
          </NavLink>
        )}

        {user && (
          <NavLink to="/dashboard/applied" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#428ee6] h-fit mb-4"
                isActive={isActive}
              >
                Applied Jobs
              </NavbarItem>
            )}
          </NavLink>
        )}
        {user && (
          <NavLink to="/dashboard/my-jobs" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#428ee6] h-fit mb-4"
                isActive={isActive}
              >
                My Jobs
              </NavbarItem>
            )}
          </NavLink>
        )}
        <NavLink to="/blogs" aria-current="page">
          {({ isActive }) => (
            <NavbarItem
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#428ee6] h-fit mb-4"
              isActive={isActive}
            >
              Blogs
            </NavbarItem>
          )}
        </NavLink>

        <ModeToggle />
      </NavbarMenu>
    </Navbar>
  );
}

const logoVariant = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 80,
    },
  },
};
const menuVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const childVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
};
