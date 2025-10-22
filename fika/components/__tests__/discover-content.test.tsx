import { render, screen } from "@testing-library/react";
import { DiscoverContent } from "../discover-content";
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
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock the Supabase client
jest.mock("@/lib/supabase/client", () => ({
  createClient: jest.fn(() => {
    const mockQueryBuilder = {
      eq: jest.fn().mockReturnThis(),
      is: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
      then: jest.fn((resolve) => resolve({ data: mockShops, error: null })),
    };

    return {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue(mockQueryBuilder),
      }),
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      },
    };
  }),
}));

// Mock the server action
jest.mock("@/app/actions", () => ({
  toggleVisit: jest.fn(),
}));

jest.mock("@/lib/supabase/database.types", () => ({
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
    isInitiallySaved: false,
    isInitiallyVisited: false,
    ratings: [], // Added missing property
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
    isInitiallySaved: false,
    isInitiallyVisited: false,
    ratings: [], // Added missing property
  },
];

describe("DiscoverContent", () => {
  it("renders a list of cafes", async () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<DiscoverContent initialShops={[]} user={null} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    expect(await screen.findByText("Fika Cafe")).toBeInTheDocument();
    expect(await screen.findByText("Kaffe Landskap")).toBeInTheDocument();
  });
});
