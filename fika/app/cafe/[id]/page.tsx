import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CafeDetailsClient from "./cafe-details-client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CafeDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: shop } = await supabase
    .from("coffee_shops")
    .select("*, shop_photos(photo_url)")
    .eq("id", resolvedParams.id)
    .single();

  if (!shop) {
    notFound();
  }

  let isInitiallySaved = false;
  let isInitiallyVisited = false;
  if (user) {
    const { data: saved } = await supabase
      .from("ratings")
      .select("shop_id")
      .eq("user_id", user.id)
      .eq("shop_id", shop.id)
      .is("drinks_quality", null);
    isInitiallySaved = !!saved && saved.length > 0;

    const { data: visited } = await supabase
      .from("ratings")
      .select("shop_id")
      .eq("user_id", user.id)
      .eq("shop_id", shop.id)
      .not("drinks_quality", "is", null);
    isInitiallyVisited = !!visited && visited.length > 0;
  }

  return (
    <CafeDetailsClient
      shop={shop}
      user={user}
      isInitiallySaved={isInitiallySaved}
      isInitiallyVisited={isInitiallyVisited}
    />
  );}
