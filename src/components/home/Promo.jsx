import { Button } from "@nextui-org/react";

const Promo = () => {
  return (
    <div className=" mb-10 text-[#161616]  bg-[length:100%_334px] rounded-2xl  w-[93%] lg:w-full max-w-7xl  bg-center  bg-no-repeat  mx-auto lg:bg-[url('/banner.jpg')] bg-[url('/banner_m.jpg')]      ">
      <div className="p-10 justify-center h-[230px] md:h-[334px]  flex flex-col gap-5">
        <h2 className="text-3xl md:text-5xl max-w-[500px]">
          Better job matches than ever before.
        </h2>
        <Button
          className="w-fit font-semibold bg-[#d4d4d8] text-[#161616] "
          size="lg"
        >
          Find Now!
        </Button>
      </div>
    </div>
  );
};

export default Promo;
