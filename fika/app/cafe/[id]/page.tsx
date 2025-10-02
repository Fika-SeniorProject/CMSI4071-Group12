import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CafeDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: shop } = await supabase
    .from("coffee_shops")
    .select("*, shop_photos(photo_url)")
    .eq("id", resolvedParams.id)
    .single();

  if (!shop) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <NavBar />
        <div className="flex-1 flex flex-col gap-10 max-w-5xl p-5 w-full">
          <h1 className="text-4xl font-bold">{shop.name}</h1>
          <p className="text-lg">Details for this cafe will go here.</p>
          {/* You can display more shop details here */}
        </div>
        <Footer />
      </div>
    </main>
  );
}
