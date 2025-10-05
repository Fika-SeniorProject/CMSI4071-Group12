import { CoffeeShop } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export function CafeQuickView({ shop }: { shop: CoffeeShop }) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-kate">{shop.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        {shop.shop_photos && shop.shop_photos.length > 0 ? (
          <Image
            src={shop.shop_photos[0].photo_url}
            alt={shop.name || "No name found"}
            width={500}
            height={500}
            priority
            className="w-full aspect-square object-cover rounded-md"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src="/hotLatte.png"
              alt="Hot Latte"
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
        )}
        <Button asChild className="w-full uppercase">
          <Link href={`/cafe/${shop.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
