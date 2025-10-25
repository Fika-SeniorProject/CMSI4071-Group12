"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { UserSavedCafe, UserVisit } from "@/lib/types"; // Import new types

// --- Saved Cafes Actions ---

export async function saveCafe(
  cafeId: number
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  // Check if already saved to prevent unique constraint violation
  const alreadySaved = await isCafeSaved(cafeId);
  if (alreadySaved) {
    return { success: true }; // Already saved, so consider it a success
  }

  const { error } = await supabase.from("user_saved_cafes").insert([
    {
      profile_id: user.id,
      coffee_shop_id: cafeId,
    },
  ]);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(`/cafe/${cafeId}`);
  revalidatePath("/profile");
  return { success: true };
}

export async function unsaveCafe(
  cafeId: number
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const { error } = await supabase
    .from("user_saved_cafes")
    .delete()
    .eq("profile_id", user.id)
    .eq("coffee_shop_id", cafeId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(`/cafe/${cafeId}`);
  revalidatePath("/profile");
  return { success: true };
}

export async function isCafeSaved(cafeId: number): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false; // If no user, it's not saved
  }

  const { data, error } = await supabase
    .from("user_saved_cafes")
    .select("id")
    .eq("profile_id", user.id)
    .eq("coffee_shop_id", cafeId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows found
    return false;
  }

  return !!data;
}

export async function getSavedCafes(): Promise<UserSavedCafe[] | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("user_saved_cafes")
    .select("*, coffee_shops(*)") // Select all from user_saved_cafes and join coffee_shops
    .eq("profile_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    return null;
  }

  return data as UserSavedCafe[];
}

// --- Visited Cafes Actions ---

export async function toggleVisitedCafe(
  cafeId: number,
  isCurrentlyVisited: boolean
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not found" };
  }

  let error: { message: string } | null = null;

  if (isCurrentlyVisited) {
    const { error: deleteError } = await supabase
      .from("user_visits")
      .delete()
      .eq("profile_id", user.id)
      .eq("coffee_shop_id", cafeId);
    error = deleteError;
  } else {
    const { error: insertError } = await supabase.from("user_visits").insert([
      {
        profile_id: user.id,
        coffee_shop_id: cafeId,
      },
    ]);
    error = insertError;
  }

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(`/cafe/${cafeId}`);
  revalidatePath("/profile");
  return { success: true };
}

export async function getVisitedCafes(): Promise<UserVisit[] | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("user_visits")
    .select("*, coffee_shops(*)") // Select all from user_visits and join coffee_shops
    .eq("profile_id", user.id)
    .order("visited_at", { ascending: false });

  if (error) {
    return null;
  }

  return data as UserVisit[];
}

export async function hasUserVisitedCafe(cafeId: number): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false; // If no user, it's not visited
  }

  const { data, error } = await supabase
    .from("user_visits")
    .select("id")
    .eq("profile_id", user.id)
    .eq("coffee_shop_id", cafeId)
    .limit(1); // We only need to know if at least one visit exists

  if (error) {
    return false;
  }

  return data !== null && data.length > 0;
}

// --- Existing Logout Action ---

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  revalidatePath("/discover");
}
