
'use server'

import { createClient } from "@/lib/supabase/server";

export async function fetchShops(page = 1, limit = 10) {
  try {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: shops, error } = await supabase
      .from("coffee_shops")
      .select(
        `
      *,
      shop_photos (
        photo_url
      )
    `
      )
      .range(from, to);

    if (error) {
      console.error("Error fetching shops:", error);
      return [];
    }

    return shops || [];
  } catch (error) {
    console.error("An unexpected error occurred in fetchShops:", error);
    return [];
  }
}
