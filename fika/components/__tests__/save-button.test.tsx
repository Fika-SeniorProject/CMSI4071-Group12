import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SaveButton } from "../save-button";
import { useTheme } from "@/app/theme-context";
import { saveCafe, unsaveCafe } from "@/app/actions";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock the useTheme hook
jest.mock("@/app/theme-context", () => ({
  ...jest.requireActual("@/app/theme-context"),
  useTheme: jest.fn(),
}));

jest.mock("@/app/actions", () => ({
  saveCafe: jest.fn().mockResolvedValue({ success: true }),
  unsaveCafe: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
}));



describe("SaveButton", () => {
  it("renders with the correct initial state (saved)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={true} />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "black");
  });

  it("renders with the correct initial state (saved, after hours)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: true });
    render(<SaveButton shopId={1} isInitiallySaved={true} />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "white");
  });

  it("renders with the correct initial state (not saved)", () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={false} />);
    const icon = screen.getByTestId("bookmark-icon");
    expect(icon).toHaveAttribute("fill", "none");
  });

  it("calls the unsave function when clicked", async () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={true} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(unsaveCafe).toHaveBeenCalledWith(1);
    });
  });

  it("calls the save function when clicked", async () => {
    (useTheme as jest.Mock).mockReturnValue({ isAfterHours: false });
    render(<SaveButton shopId={1} isInitiallySaved={false} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(saveCafe).toHaveBeenCalledWith(1);
    });
  });
});
