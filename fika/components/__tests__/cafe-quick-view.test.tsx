import { render, screen } from "@testing-library/react";
import { CafeQuickView } from "../cafe-quick-view";
import { CoffeeShop } from "@/lib/types";
import { useTheme } from "@/app/theme-context";

// Mock the useTheme hook
jest.mock("@/app/theme-context", () => ({
  ...jest.requireActual("@/app/theme-context"),
  useTheme: jest.fn(),
}));

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock the Supabase client
jest.mock("@/lib/supabase/client", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      delete: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      is: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}));

// Mock the server action
jest.mock("@/app/actions", () => ({
  toggleVisit: jest.fn(),
}));

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
  isInitiallySaved: false,
  isInitiallyVisited: false,
};

describe("CafeQuickView", () => {
  it("renders cafe name, address, and photo", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(
      <CafeQuickView
        shop={mockShop}
        user={null}
        isInitiallySaved={false}
        isInitiallyVisited={false}
      />
    );

    expect(screen.getByText("Fika Cafe")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src");
  });
});
