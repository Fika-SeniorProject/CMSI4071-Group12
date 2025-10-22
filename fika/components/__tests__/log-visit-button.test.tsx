import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LogVisitButton } from "../log-visit-button";
import { toggleVisit } from "@/app/actions";

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
  toggleVisit: jest.fn(),
}));

describe("LogVisitButton", () => {
  it("renders with the correct initial state (visited)", () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={true} user={{ id: "123" }} />);
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("renders with the correct initial state (not visited)", () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={false} user={{ id: "123" }} />);
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("calls the toggleVisit function when clicked (visited -> not visited)", async () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={true} user={{ id: "123" }} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toggleVisit).toHaveBeenCalledWith(1, true);
    });
  });

  it("calls the toggleVisit function when clicked (not visited -> visited)", async () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={false} user={{ id: "123" }} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toggleVisit).toHaveBeenCalledWith(1, false);
    });
  });

  it("redirects to login when not logged in", () => {
    render(<LogVisitButton shopId={1} isInitiallyVisited={false} user={null} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/auth/login?redirect=/");
  });
});
