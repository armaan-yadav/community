import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EventCardShimmer = () => {
  return (
    <Card className=" w-[340px] overflow-hidden rounded-xl border border-gray-200 py-0">
      <div className="relative h-52 w-full overflow-hidden">
        <Skeleton className="h-52 w-full" />
      </div>

      <CardContent className="pt-5 pb-2">
        <Skeleton className="w-20 h-5 rounded-full" />

        <div className="my-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4 mt-1" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-gray-100 px-6 py-6">
        <Skeleton className="w-full h-8 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default EventCardShimmer;
