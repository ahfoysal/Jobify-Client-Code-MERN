import { Button, Divider, Image } from "@nextui-org/react";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen ">
      <Helmet>
        <title>Page Not Found | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet>
      <div className="flex h-full justify-center items-center gap-4 flex-col">
        <Image
          width={480}
          src={"/404.gif"}
          alt="404"
          className="object-cover"
        />
        <div className="flex  justify-center items-center">
          <p className="font-bold text-2xl"> 404</p>
          <div className="h-12 mx-6">
            <Divider orientation="vertical" />
          </div>
          <p>This page could not be found.</p>
        </div>
        <Button variant="flat" className="w-fit" as={Link} to={"/"}>
          Back To Home
        </Button>
      </div>
    </div>
  );
}
