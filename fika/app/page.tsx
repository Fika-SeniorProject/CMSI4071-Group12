import { CafeQuickView } from "@/components/cafe-quick-view";
import { Footer } from "@/components/footer";

import { createClient } from "@/lib/supabase/server";
import { CoffeeShop } from "@/lib/types";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: featuredShopsData } = await supabase
    .from("coffee_shops")
    .select(
      `
    *,
    shop_photos (
      photo_url
    )
  `
    )
    .eq("is_featured", true);

  let savedCafeIds: number[] = [];
  let visitedCafeIds: number[] = [];

  if (user && featuredShopsData) {
    const shopIds = featuredShopsData.map((shop) => shop.id);
    const { data: ratings } = await supabase
      .from("ratings")
      .select("shop_id, drinks_quality")
      .eq("user_id", user.id)
      .in("shop_id", shopIds);

    if (ratings) {
      savedCafeIds = ratings
        .filter((r) => r.drinks_quality === null)
        .map((r) => r.shop_id);
      visitedCafeIds = ratings
        .filter((r) => r.drinks_quality !== null)
        .map((r) => r.shop_id);
    }
  }

  const featuredShops: CoffeeShop[] = featuredShopsData?.map(shop => ({
    ...shop,
    isInitiallySaved: savedCafeIds.includes(shop.id),
    isInitiallyVisited: visitedCafeIds.includes(shop.id),
    shop_photos: shop.shop_photos || [],
  })) || [];

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 relative">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <div className="text-center px-4">
          <h1 className="font-bold tracking-tight text-gray-900 text-7xl font-kate">
            <span className="font-light">Welcome to</span>{" "}
            <span className="font-bold">fika</span>
          </h1>
          <p className="mt-6 text-2xl leading-8 text-black font-kate">
            All the best coffee and work spots, all in one place.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-10 max-w-7xl p-5">
          {featuredShops && featuredShops.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl mb-4">Featured Cafes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featuredShops.map((shop) => (
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
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
}
