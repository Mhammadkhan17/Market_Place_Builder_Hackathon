import Image from "next/image";
import { Heart, BellDot, Settings } from "lucide-react";

const MainHeader = () => {
  return (
    <div>
      {/* Mobile Header (visible on mobile) */}
      <div className="w-[327px] h-7 mt-8 mx-5 lg:hidden">
        <div className="flex justify-between">
          <p className="text-2xl font-bold w-[108px] text-[#3563E9]">Morent</p>
          <Image
            src="/Image.png"
            height={350}
            width={350}
            alt="avatar"
            className="w-7 h-7 rounded-full"
          />
        </div>
        <div className="flex w-[270px] h-[55px] text-center ml-[25px] mt-[92px]">
          <input
            type="text"
            placeholder="Search something here"
            className="py-2 text-center rounded-3xl border border-gray-300 bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Desktop Header (visible on large screens) */}
      <div className="hidden lg:block w-full h-[124px] border">
        <div className="flex justify-around">
          <p className="w-[148px] h-[44px] text-[32px] text-[#3563E9] font-bold pt-10 pl-[60px]">
            MORENT
          </p>
          <input
            type="text"
            className="w-[492px] h-11 text-center ml-[270px] block pr-4 mt-[40px] py-2 border border-gray-300 bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Search something here!"
          />
          <div className="flex mt-[40px]">
            <Heart className="m-2" />
            <BellDot className="m-2" />
            <Settings className="m-2" />
            <Image
              src="/avatar.png"
              alt="avatar"
              height={350}
              width={350}
              className="w-8 h-8 m-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
