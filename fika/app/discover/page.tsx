import { DiscoverContent } from "@/components/discover-content";
import { createClient } from "@/lib/supabase/server";
import { CoffeeShop } from "@/lib/types";
import Image from "next/image";

const PAGE_SIZE = 20;

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function DiscoverPage({ searchParams: searchParamsPromise }: { searchParams: Promise<SearchParams> }) {
  const searchParams = await searchParamsPromise;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let savedCafeIds: Set<number> = new Set();
  let visitedCafeIds: Set<number> = new Set();

  if (user) {
    const { data: savedCafes } = await supabase
      .from("user_saved_cafes")
      .select("coffee_shop_id")
      .eq("profile_id", user.id);
    if (savedCafes) {
      savedCafeIds = new Set(savedCafes.map((cafe) => cafe.coffee_shop_id));
    }

    const { data: visitedCafes } = await supabase
      .from("user_visits")
      .select("coffee_shop_id")
      .eq("profile_id", user.id);
    if (visitedCafes) {
      visitedCafeIds = new Set(
        visitedCafes.map((cafe) => cafe.coffee_shop_id)
      );
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

  if (searchParams.city)
    query = query.eq("city", searchParams.city as string);
  if (searchParams.parking)
    query = query.eq("parking", searchParams.parking as string);
  if (searchParams.seating)
    query = query.eq("seating", searchParams.seating as string);
  if (searchParams.vibe)
    query = query.eq("vibe", searchParams.vibe as string);
  if (searchParams.has_wifi !== undefined)
    query = query.eq("has_wifi", searchParams.has_wifi === "Yes");
  if (searchParams.has_outlets !== undefined)
    query = query.eq("has_outlets", searchParams.has_outlets === "Yes");

  const from = 0;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data: initialShopsData } = await query;

  const initialShops: CoffeeShop[] =
    initialShopsData?.map((shop) => {
      return {
        ...shop,
        isInitiallySaved: savedCafeIds.has(shop.id),
        isInitiallyVisited: visitedCafeIds.has(shop.id),
        shop_photos: shop.shop_photos || [],
      };
    }) || [];

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 relative">
      <Image
        src="/cardamomBun.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block fixed top-20 left-8 z-[-1]"
      />
      <Image
        src="/swanLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block fixed top-1/3 left-20 z-[-1]"
      />
      <Image
        src="/icedMatchaLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block fixed top-24 right-10 z-[-1]"
      />
      <Image
        src="/hotMatchaLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block fixed top-1/2 right-16 z-[-1]"
      />
      <Image
        src="/creamTopLatte.png"
        alt="decoration"
        width={95}
        height={95}
        className="hidden sm:block fixed bottom-8 left-16 z-[-1]"
      />
      <Image
        src="/icedLatte.png"
        alt="decoration"
        width={95}
        height={95}
        className="hidden sm:block fixed bottom-12 right-8 z-[-1]"
      />
      <Image
        src="/cakeSlice.png"
        alt="decoration"
        width={120}
        height={120}
        className="hidden sm:block fixed bottom-1/3 left-5 z-[-1]"
      />
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <DiscoverContent initialShops={initialShops} user={user} />
      </div>
    </main>
  );
}