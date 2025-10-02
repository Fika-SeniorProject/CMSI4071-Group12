import { CoffeeShop } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CafeQuickView({ shop }: { shop: CoffeeShop }) {
  return (
    <Card className="w-full aspect-square flex flex-col">
      <CardHeader>
        <CardTitle>{shop.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {shop.shop_photos && shop.shop_photos.length > 0 ? (
          <img src={shop.shop_photos[0].photo_url} alt={shop.name} className="w-full aspect-square object-cover rounded-md" />
        ) : (
          <div className="w-full h-3/5 bg-gray-200 rounded-md"></div>
        )}
        <p className="text-sm mt-2">{shop.summary}</p>
      </CardContent>
    </Card>
  );
}
