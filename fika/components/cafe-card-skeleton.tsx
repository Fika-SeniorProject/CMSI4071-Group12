
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CafeCardSkeleton() {
  return (
    <Card className="w-full flex flex-col" role="figure">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        <Skeleton className="w-full aspect-square rounded-md" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
