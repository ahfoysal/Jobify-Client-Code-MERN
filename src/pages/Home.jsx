import FeaturedLocations from "../components/home/FeaturedLocations";
import JobsShowcase from "../components/home/JobsShowcase";
import Promo from "../components/home/Promo";
import SearchBanner from "../components/home/SearchBanner";

const Home = () => {
  return (
    <div>
      <div className="bg-[#051a49]  bg-left-bottom sm:bg-[center_100px] md:bg-[center_130px] bg-[url('/bg.svg')] bg-no-repeat     w-full">
        <SearchBanner />
      </div>
      <JobsShowcase />
      <Promo />
      <FeaturedLocations />
    </div>
  );
};

export default Home;
