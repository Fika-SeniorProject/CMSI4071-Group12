"use client";

import { CafeQuickView } from "@/components/cafe-quick-view";
import { DiscoverFilters } from "@/components/discover-filters";
import { CafeCardSkeleton } from "@/components/cafe-card-skeleton";
import { Footer } from "@/components/footer";

import { Constants } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/client";
import { CoffeeShop } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { User } from "@supabase/supabase-js";

export function DiscoverContent({
  initialShops,
  user,
}: {
  initialShops?: CoffeeShop[];
  user: User | null;
}) {
  const [shops, setShops] = useState<CoffeeShop[]>(initialShops || []);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let savedCafeIds: number[] = [];
      let visitedCafeIds: number[] = [];

      if (user) {
        const { data: ratings } = await supabase
          .from("ratings")
          .select("shop_id, drinks_quality")
          .eq("user_id", user.id);

        if (ratings) {
          savedCafeIds = ratings
            .filter((r) => r.drinks_quality === null)
            .map((r) => r.shop_id);
          visitedCafeIds = ratings
            .filter((r) => r.drinks_quality !== null)
            .map((r) => r.shop_id);
        }
      }

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

      const shopsWithStatus = shops?.map((shop) => ({
        ...shop,
        isInitiallySaved: savedCafeIds.includes(shop.id),
        isInitiallyVisited: visitedCafeIds.includes(shop.id),
      })) as CoffeeShop[];

      setShops(shopsWithStatus || []);
      setLoading(false);
    };

    fetchShops();
  }, [searchParams]);

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
            <CafeCardSkeleton size="small" />
          </div>
        ) : shops.length > 0 ? (
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {shops.map((shop) => (
                <CafeQuickView
                  key={shop.id}
                  shop={shop}
                  user={user}
                  isInitiallySaved={shop.isInitiallySaved}
                  isInitiallyVisited={shop.isInitiallyVisited}
                />
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
    </>
  );
}
