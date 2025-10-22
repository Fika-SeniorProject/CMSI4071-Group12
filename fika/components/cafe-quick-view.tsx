import { CoffeeShop } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogVisitButton } from "./log-visit-button";
import { SaveButton } from "./save-button";
import { User } from "@supabase/supabase-js";

type CafeQuickViewProps = {
  shop: CoffeeShop;
  user: User | null;
  isInitiallySaved: boolean;
  isInitiallyVisited: boolean;
};

export function CafeQuickView({
  shop,
  user,
  isInitiallySaved,
  isInitiallyVisited,
}: CafeQuickViewProps) {
  return (
    <Card className="w-full flex flex-col relative">
      <div className="flex justify-between items-center p-4 pl-6 pr-[1.1rem]">
        <h2 className="font-kate font-semibold leading-none tracking-tight text-lg">
          {shop.name}
        </h2>
        <div className="flex items-center gap-2">
          <LogVisitButton
            shopId={shop.id}
            isInitiallyVisited={isInitiallyVisited}
            user={user}
          />
          <SaveButton
            shopId={shop.id}
            isInitiallySaved={isInitiallySaved}
            userId={user?.id ?? null}
          />
        </div>
      </div>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        {shop.shop_photos && shop.shop_photos.length > 0 ? (
          <Image
            src={shop.shop_photos[0].photo_url}
            alt={shop.name || "No name found"}
            width={300}
            height={300}
            priority
            className="w-full aspect-square object-cover rounded-md"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src="/hotLatte.png"
              alt="Hot Latte"
              width={300}
              height={300}
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
