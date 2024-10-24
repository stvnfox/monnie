import type { FunctionComponent } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export const SkeletonTable: FunctionComponent = () => {
  return (
    <div className="rounded-md">
      <div className="border rounded-t-md">
        <div className="h-12 flex items-center px-4">
          <Skeleton className="w-9 h-3 rounded-md" />
        </div>
      </div>
      <div className="border rounded-b-md border-t-0 py-6">
        <div className="flex flex-col gap-4 pl-4 pr-6">
          <SkeletonTableRow />
          <SkeletonTableRow />
          <SkeletonTableRow />
        </div>
      </div>
    </div>
  );
};

const SkeletonTableRow: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-4 min-w-4 h-4 rounded-md" />
      <Skeleton className="w-full h-2 rounded-md" />
      <div className="flex items-center gap-0.5">
        <Skeleton className="w-1 h-1 rounded-full" />
        <Skeleton className="w-1 h-1 rounded-full" />
        <Skeleton className="w-1 h-1 rounded-full" />
      </div>
    </div>
  );
};
