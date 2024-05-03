import Navbar from "@/components/Navbar";
import React, { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
