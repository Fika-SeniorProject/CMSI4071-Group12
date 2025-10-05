import { CafeQuickView } from "@/components/cafe-quick-view";
import { Footer } from "@/components/footer";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: featuredShops } = await supabase
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

  return (
    <main className="min-h-screen flex flex-col items-center pt-12">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-kate">
            <span className="font-light">Welcome to</span>{" "}
            <span className="font-bold">fika</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-kate">
            All the best coffee and work spots, all in one place.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-10 max-w-7xl p-5">
          {featuredShops && featuredShops.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl mb-4">Featured Cafes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featuredShops.map((shop) => (
                  <CafeQuickView key={shop.id} shop={shop} />
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
