import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const PickUp = () => {
  return (
    <div className="w-full rounded-lg text-[#1A202C]">
      <div className="w-[92px] h-5 ml-12 gap-2 mb-6">
        <input type="radio" name="Pick-up" id="pickup" />
        <label htmlFor="pickup" className="pl-2">
          Pick-Up
        </label>
      </div>
      <div className="grid grid-cols-3 text-center font-bold">
        <div>
          <p>Locations</p>
        </div>
        <div>
          <p>Date</p>
        </div>
        <div>
          <p>Time</p>
        </div>
      </div>
      <div className="grid grid-cols-3 font-medium text-gray-500">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <p className="mr-4">Select your location</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Available locations</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <p className="mr-4">Select your date</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Available dates</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <p className="mr-4">Select your Time</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Available time</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};
export default PickUp;
