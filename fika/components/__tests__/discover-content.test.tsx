import { render, screen } from "@testing-library/react";
import { DiscoverContent } from "../discover-content";
import { vi } from "vitest";
import { CoffeeShop } from "@/lib/types";

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: false,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase/database.types", () => ({
  Constants: {
    public: {
      Enums: {
        Cities: [],
        "Parking Difficulty": [],
        "Seating Availability": [],
        Vibe: [],
      },
    },
  },
}));

const mockShops: CoffeeShop[] = [
  {
    id: 1,
    name: "Fika Cafe",
    shop_photos: [{ photo_url: "https://example.com/cafe1.jpg" }],
    busyness: "Medium",
    city: "Los Angeles",
    has_outlets: true,
    has_wifi: true,
    is_featured: false,
    is_laptop_friendly: true,
    parking: "Easy",
    pricing: "$$",
    seating: "Plenty",
    summary: "A great place to work and drink coffee.",
    vibe: "Cozy",
    wine_bar: false,
  },
  {
    id: 2,
    name: "Kaffe Landskap",
    shop_photos: [{ photo_url: "https://example.com/cafe2.jpg" }],
    busyness: "Quiet",
    city: "Copenhagen",
    has_outlets: false,
    has_wifi: true,
    is_featured: true,
    is_laptop_friendly: false,
    parking: "Hard",
    pricing: "$$$",
    seating: "Some",
    summary: "A modern cafe with a focus on design.",
    vibe: "Minimalistic",
    wine_bar: true,
  },
];

describe("DiscoverContent", () => {
  it("renders a list of cafes", () => {
    render(<DiscoverContent initialShops={mockShops} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText("Fika Cafe")).toBeInTheDocument();
    expect(screen.getByText("Kaffe Landskap")).toBeInTheDocument();
  });
});
