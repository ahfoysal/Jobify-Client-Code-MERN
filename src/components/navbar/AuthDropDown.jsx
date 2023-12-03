/* eslint-disable react/prop-types */
import {
  Avatar,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";

// eslint-disable-next-line react/prop-types
const AuthDropDown = ({ user, logout }) => {
  const { toast } = useToast();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="group relative">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={user.name}
            size="sm"
            src={user?.imageUrl && user.imageUrl}
          />
          <p className="hidden group-hover:block text-primary absolute bg-foreground-50  px-2 py-1 rounded-md bottom-0 left-0 -mb-10 -ml-3">
            {user.name.split(" ")[0]}
          </p>
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 flex">
          <span className="font-semibold">Signed in as </span>
          <span className="font-bold">
            {user?.name || user?.email || user?.reloadUserInfo?.screenName}
          </span>
        </DropdownItem>
        <DropdownItem key="settings">My Jobs</DropdownItem>
        <DropdownItem key="team_settings">Jobs Applied</DropdownItem>
        <DropdownItem key="system">Profile</DropdownItem>
        <DropdownItem key="analytics">Reset Password</DropdownItem>

        <DropdownItem key="logout" className="flex" color="danger">
          <Button
            size="sm"
            className="w-full h-full justify-start hover:bg-transparent"
            onClick={() =>
              logout().then(() =>
                toast({
                  title: "Successfully logged out",

                  duration: 3000,
                })
              )
            }
            variant="ghost"
          >
            Log Out
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AuthDropDown;
