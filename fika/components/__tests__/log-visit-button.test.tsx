import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LogVisitButton } from "../log-visit-button";
import { toggleVisitedCafe } from "@/app/actions";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

const mockPush = jest.fn();
// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
}));

// Mock the server action
jest.mock("@/app/actions", () => ({
  toggleVisitedCafe: jest.fn().mockResolvedValue({ success: true }),
}));

describe("LogVisitButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct initial state (visited)", () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={true} />);
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("renders with the correct initial state (not visited)", () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={false} />);
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("calls the toggleVisitedCafe function when clicked (visited -> not visited)", async () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={true} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toggleVisitedCafe).toHaveBeenCalledWith(1, true);
    });
  });

  it("calls the toggleVisitedCafe function when clicked (not visited -> visited)", async () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={false} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toggleVisitedCafe).toHaveBeenCalledWith(1, false);
    });
  });

  it("redirects to login when not logged in", async () => {
    (toggleVisitedCafe as jest.Mock).mockResolvedValueOnce({ success: false, message: "User not found" });

    render(<LogVisitButton shopId={1} isInitiallyVisited={false} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth/login?redirect=/");
    });
  });
});