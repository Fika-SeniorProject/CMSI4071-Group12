import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CafeDetailsClient from "./cafe-details-client";

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

  return <CafeDetailsClient shop={shop} />;}
