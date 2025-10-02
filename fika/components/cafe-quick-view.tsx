import { CoffeeShop } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export function CafeQuickView({ shop }: { shop: CoffeeShop }) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>{shop.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        {shop.shop_photos && shop.shop_photos.length > 0 ? (
          <img
            src={shop.shop_photos[0].photo_url}
            alt={shop.name}
            className="w-full aspect-square object-cover rounded-md"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
        )}
        <Button asChild className="w-full">
          <Link href={`/cafe/${shop.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
