import { CafeQuickView } from "@/components/cafe-quick-view";
import { createClient } from "@/lib/supabase/server";
import { CoffeeShop } from "@/lib/types";

export async function FeaturedCafes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: featuredShopsData } = await supabase
    .from("coffee_shops")
    .select(
      `
      *,
      shop_photos (
        photo_url
      ),
      ratings (
        user_id,
        drinks_quality
      )
    `
    )
    .eq("is_featured", true);

  const featuredShops: CoffeeShop[] =
    featuredShopsData?.map((shop) => {
      const userRating = shop.ratings.find(
        (rating: { user_id: string; drinks_quality: number | null }) =>
          rating.user_id === user?.id
      );
      return {
        ...shop,
        isInitiallySaved: userRating?.drinks_quality === null,
        isInitiallyVisited: userRating?.drinks_quality !== null,
        shop_photos: shop.shop_photos || [],
      };
    }) || [];

  return (
    <>
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
    </>
  );
}
