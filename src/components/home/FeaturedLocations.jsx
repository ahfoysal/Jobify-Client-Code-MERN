/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import Autoplay from "./../../../node_modules/swiper/modules/autoplay.mjs";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Image } from "@nextui-org/react";

SwiperCore.use([Autoplay]);

const FeaturedLocations = () => {
  return (
    <div className="  w-[93%] lg:w-full max-w-7xl mx-auto   mb-10  md:mt-0  flex flex-col  justify-center gap-4 md:gap-6 ">
      <h1 className=" inline  text-left font-normal from-[#aaaaaa] to-[#ffffff] text-2xl lg:text-4xl  ">
        Find job opportunities in your suitable location
      </h1>
      <div className="w-full h-full flex justify-center items-center">
        <Swiper
          breakpoints={{
            256: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1600: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1920: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
          }}
          spaceBetween={5}
          effect={"slide"}
          speed={500}
          autoplay={{
            delay: 1000,
          }}
        >
          {locationObjects.map((item, index) => (
            <SwiperSlide key={Math.random() * index}>
              <Image
                src={item?.image}
                height={222}
                width={600}
                isZoomed
                alt=""
                className={`md:w-full  fill-white object-contain   bg-transparent  overflow-hidden w-full h-full `}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedLocations;
const locationObjects = [
  { name: "Dhaka", image: "https://skill.jobs//divisions/Dhaka.png" },
  { name: "Chattogram", image: "https://skill.jobs//divisions/Chattogram.png" },
  { name: "Barishal", image: "https://skill.jobs//divisions/Barishal.png" },
  { name: "Khulna", image: "https://skill.jobs//divisions/Khulna.png" },
  { name: "Mymensingh", image: "https://skill.jobs//divisions/Mymensingh.png" },
  { name: "Rajshahi", image: "https://skill.jobs//divisions/Rajshahi.png" },
  { name: "Rangpur", image: "https://skill.jobs/divisions/Rangpur.png" },
  { name: "Sylhet", image: "https://skill.jobs//divisions/Sylhet.png" },
];
