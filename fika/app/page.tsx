import { CafeQuickView } from "@/components/cafe-quick-view";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
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
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <NavBar />
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            welcome to fika
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            All the best coffee and work spots, all in one place.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-10 max-w-5xl p-5">
          {featuredShops && featuredShops.length > 0 && (
            <section className="flex flex-col gap-6 px-4">
              <h2 className="font-medium text-xl mb-4">Featured Cafes</h2>
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
