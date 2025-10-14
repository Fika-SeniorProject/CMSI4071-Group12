import { Database } from "./supabase/database.types";

export type CoffeeShop = Database["public"]["Tables"]["coffee_shops"]["Row"] & {
  shop_photos: { photo_url: string }[];
};
