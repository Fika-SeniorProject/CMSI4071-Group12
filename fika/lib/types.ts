import { Database } from "./supabase/database.types";

export type CoffeeShop = Database["public"]["Tables"]["coffee_shops"]["Row"] & {
  shop_photos: { photo_url: string }[];
  isInitiallySaved: boolean;
  isInitiallyVisited: boolean;
  ratings: { user_id: string; drinks_quality: number | null }[];
};
