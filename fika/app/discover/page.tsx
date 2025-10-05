"use client";

import { CafeQuickView } from "@/components/cafe-quick-view";
import { DiscoverFilters } from "@/components/discover-filters";
import { Footer } from "@/components/footer";

import { Constants } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/client";
import { CoffeeShop } from "@/lib/types";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function DiscoverPage() {
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchShops = async () => {
      const supabase = createClient();
      let query = supabase.from("coffee_shops").select(
        `
        *,
        shop_photos (
          photo_url
        )
      `
      );

      if (searchParams.get("city")) {
        query = query.eq("city", searchParams.get("city") as string);
      }
      if (searchParams.get("parking")) {
        query = query.eq("parking", searchParams.get("parking") as string);
      }
      if (searchParams.get("seating")) {
        query = query.eq("seating", searchParams.get("seating") as string);
      }
      if (searchParams.get("vibe")) {
        query = query.eq("vibe", searchParams.get("vibe") as string);
      }
      if (searchParams.get("has_wifi")) {
        query = query.eq("has_wifi", searchParams.get("has_wifi") === "Yes");
      }
      if (searchParams.get("has_outlets")) {
        query = query.eq(
          "has_outlets",
          searchParams.get("has_outlets") === "Yes"
        );
      }

      const { data: shops } = await query;
      setShops(shops || []);
    };

    fetchShops();
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col items-center pt-12">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <div className="text-center px-4">
          <h1 className="text-4xl tracking-tight text-gray-900 sm:text-6xl font-kate">
            Discover Cafes
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-kate">
            Browse our collection of coffee shops.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-10 max-w-7xl p-5 w-full">
          <Suspense fallback={<div>Loading filters...</div>}>
            <DiscoverFilters
              cities={Constants.public.Enums.Cities as unknown as string[]}
              parkings={
                Constants.public.Enums[
                  "Parking Difficulty"
                ] as unknown as string[]
              }
              seatings={
                Constants.public.Enums[
                  "Seating Availability"
                ] as unknown as string[]
              }
              vibes={Constants.public.Enums.Vibe as unknown as string[]}
            />
          </Suspense>
          {shops.length > 0 ? (
            <section className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shops.map((shop) => (
                  <CafeQuickView key={shop.id} shop={shop} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center">
              <p>No shops found matching your criteria.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
}
