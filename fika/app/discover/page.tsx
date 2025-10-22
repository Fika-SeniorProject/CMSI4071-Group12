import { DiscoverContent } from "@/components/discover-content";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { CoffeeShop } from "@/lib/types";

export default async function DiscoverPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: shops } = await supabase.from("coffee_shops").select(
    `
    *,
    shop_photos (
      photo_url
    )
  `
  );

  const initialShops = shops?.map((shop) => ({
    ...shop,
    isInitiallySaved: false,
    isInitiallyVisited: false,
  })) as CoffeeShop[];

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
        <DiscoverContent user={user} initialShops={initialShops} />
      </div>
    </main>
  );
}
