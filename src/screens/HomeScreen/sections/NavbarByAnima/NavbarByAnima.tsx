import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavbarByAnima = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { name: "Home", active: true },
    { name: "About", active: false },
    { name: "Services", active: false, hasDropdown: true },
    { name: "Onboarding", active: false },
  ];

  return (
    <nav className="flex items-center justify-between gap-[76px] px-[88px] relative rounded-[30px] overflow-hidden">
      <div className="flex items-center gap-[118px] relative rounded-[50px]">
        <div className="flex items-center gap-80 relative">
          <img
            className="relative w-[87px] h-[60px]"
            alt="Element"
            src="/4443cec1-459d-46f4-98cb-bc856971882e-1.png"
          />

          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="flex w-[574px] items-center gap-10 px-0 py-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    className={`inline-flex items-center gap-2 p-2.5 relative ${
                      item.active ? "border-b-2 border-[#790000]" : ""
                    }`}
                  >
                    <span className="relative w-fit mt-[-2.00px] font-normal text-black text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                      {item.name}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDownIcon className="relative w-[9px] h-[5px] mr-[-0.50px]" />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <Button className="px-[46.27px] py-[16.97px] bg-[#790000] rounded-[12.34px] hover:bg-[#790000]/90">
        <span className="font-semibold text-[#ffb800] text-[13.9px] tracking-[0] leading-[20.8px] whitespace-nowrap">
          Let&apos;s Talk
        </span>
      </Button>
    </nav>
  );
};
