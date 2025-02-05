import PickUp from "../Pickup/pickup";
import Swap from "../Pickup/swap";
import DropOff from "../Pickup/dropoff";

const PickUpSection = () => {
  return (
    <div>
      {/* This is the pickup section for mobile responsive */}
      <div className="w-full h-full lg:hidden">
        <div className="flex flex-col">
          <div className="my-4">
            <PickUp />
          </div>
          <div>
            <Swap />
          </div>
          <div className="my-4">
            <DropOff />
          </div>
        </div>
      </div>
      {/* This is the section for desktop responsive */}
      <div className="hidden lg:block w-full h-128px">
        <div className="flex justify-evenly">
          <div className="m-4 p-3">
            <PickUp />
          </div>
          <div className="mt-14">
            <Swap />
          </div>
          <div className="m-4 p-3">
            <DropOff />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PickUpSection;
