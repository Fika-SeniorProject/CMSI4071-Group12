"use client";

import { CafeQuickView } from "@/components/cafe-quick-view";
import { DiscoverFilters } from "@/components/discover-filters";
import { Footer } from "@/components/footer";

import { Constants } from "@/lib/supabase/database.types";
import { CoffeeShop } from "@/lib/types";
import { useState } from "react";
import { LoadMore } from "./load-more";
import { fetchShops } from "@/app/actions";

export function DiscoverContent({ initialShops }: { initialShops: CoffeeShop[] }) {
  const [shops, setShops] = useState<CoffeeShop[]>(initialShops);
  const [page, setPage] = useState(1);

  const loadMoreShops = async () => {
    const nextPage = page + 1;
    const newShops = await fetchShops(nextPage);
    if (newShops.length > 0) {
      setPage(nextPage);
      setShops((prevShops) => [...prevShops, ...newShops]);
    }
  };

  return (
    <>
      <div className="text-center px-4">
        <h1 className="text-4xl tracking-tight text-black sm:text-6xl font-kate">
          Discover Cafes
        </h1>
        <p className="mt-6 text-lg leading-8 text-black font-kate">
          Browse our collection of coffee shops.
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-10 max-w-7xl p-5 w-full">
        <DiscoverFilters
          cities={Constants.public.Enums.Cities as unknown as string[]}
          parkings={
            Constants.public.Enums["Parking Difficulty"] as unknown as string[]
          }
          seatings={
            Constants.public.Enums[
              "Seating Availability"
            ] as unknown as string[]
          }
          vibes={Constants.public.Enums.Vibe as unknown as string[]}
        />
        <section className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shops.map((shop) => (
              <CafeQuickView key={shop.id} shop={shop} />
            ))}
          </div>
        </section>
        <LoadMore loadMoreShops={loadMoreShops} />
      </div>
      <Footer />
    </>
  );
}
