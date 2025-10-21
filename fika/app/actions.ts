"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleVisit(shopId: number, isVisited: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (isVisited) {
    // Remove the visit
    const { error } = await supabase
      .from("ratings")
      .delete()
      .eq("user_id", user.id)
      .eq("shop_id", shopId)
      .not("drinks_quality", "is", null);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    // Add the visit
    const { error } = await supabase.from("ratings").insert([
      {
        user_id: user.id,
        shop_id: shopId,
        drinks_quality: 3, // Placeholder rating
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`/cafe/${shopId}`);
  revalidatePath("/profile");
}
