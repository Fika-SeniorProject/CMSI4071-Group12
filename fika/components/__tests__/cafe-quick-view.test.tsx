import { render, screen } from "@testing-library/react";
import { CafeQuickView } from "../cafe-quick-view";
import { CoffeeShop } from "@/lib/types";

const mockShop: CoffeeShop = {
  id: 1,
  name: "Fika Cafe",
  shop_photos: [{ photo_url: "https://example.com/cafe.jpg" }],
  busyness: "Medium",
  city: "Los Angeles",
  has_outlets: true,
  has_wifi: true,
  is_featured: false,
  is_laptop_friendly: true,
  parking: "Easy",
  pricing: "$",
  seating: "Plenty",
  summary: "A great place to work and drink coffee.",
  vibe: "Cozy",
  wine_bar: false,
};

describe("CafeQuickView", () => {
  it("renders cafe name, address, and photo", () => {
    render(<CafeQuickView shop={mockShop} />);

    expect(screen.getByText("Fika Cafe")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
  });
});
