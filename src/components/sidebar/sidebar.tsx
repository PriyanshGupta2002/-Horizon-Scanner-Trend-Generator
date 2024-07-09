"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const handleNavigateLink = useCallback(
    (link: string) => {
      router.push(`/${link}`);
    },
    [router]
  );

  return (
    <div className="bg-[#FFFFFF] shadow-md fixed h-[500px] w-[244px] overflow-y-auto p-3">
      <div className="flex items-center gap-2 text-darkBlack700 text-base">
        <Image src={"/assets/burger.svg"} width={24} height={24} alt="burger" />
        <span>Menu</span>
      </div>
      <ScrollArea className="p-2 mt-2 text-sdzBlue800 font-semibold">
        <div
          onClick={() => handleNavigateLink("/generate-trend")}
          className={cn(
            "cursor-pointer",
            pathName === "/generate-trend"
              ? "bg-activeSidebarLink px-3 py-2 rounded-md"
              : ""
          )}
        >
          Generate Ecosystem
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
