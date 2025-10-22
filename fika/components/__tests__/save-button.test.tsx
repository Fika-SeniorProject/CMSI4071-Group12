import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SaveButton } from "../save-button";
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
  usePathname: () => "/",
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

describe("SaveButton", () => {
  it("renders with the correct initial state (saved)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={true} userId="123" />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "black");
  });

  it("renders with the correct initial state (saved, after hours)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: true });
    render(<SaveButton shopId={1} isInitiallySaved={true} userId="123" />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "white");
  });

  it("renders with the correct initial state (not saved)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={false} userId="123" />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "none");
  });

  it("calls the unsave function when clicked", async () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={true} userId="123" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const icon = screen.getByTestId("bookmark-icon");
      expect(icon).toHaveAttribute("fill", "none");
    });
  });

  it("calls the save function when clicked", async () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={false} userId="123" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const icon = screen.getByTestId("bookmark-icon");
      expect(icon).toHaveAttribute("fill", "black");
    });
  });
});
