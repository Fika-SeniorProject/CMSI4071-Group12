export type CoffeeShop = {
  id: number;
  name: string;
  city: string;
  is_laptop_friendly: boolean;
  has_wifi: boolean;
  has_outlets: boolean;
  seating: string;
  parking: string;
  vibe: string;
  pricing: string;
  busyness: string;
  summary: string;
  shop_photos: { photo_url: string }[];
};
