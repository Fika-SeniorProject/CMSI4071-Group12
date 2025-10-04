import { Database } from "./supabase/database.types";

export type CoffeeShop = Database["public"]["Tables"]["coffee_shops"]["Row"];

