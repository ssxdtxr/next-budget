import React, { FC, PropsWithChildren } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface ISkeletonWrapper {
  isLoading: boolean;
  fullWidth?: boolean;
}

const SkeletonWrapper: FC<PropsWithChildren<ISkeletonWrapper>> = ({
  isLoading,
  children,
  fullWidth,
}) => {
  if (!isLoading) return children;
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
