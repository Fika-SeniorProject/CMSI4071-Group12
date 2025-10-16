
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SaveButton } from "../save-button";

// Mock the Supabase client
jest.mock("@/lib/supabase/client", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      delete: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      is: jest.fn().mockResolvedValue({ error: null }),
    })),
  })),
}));

describe("SaveButton", () => {
  it("renders with the correct initial state (saved)", () => {
    render(<SaveButton shopId={1} isInitiallySaved={true} userId="123" />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("renders with the correct initial state (not saved)", () => {
    render(<SaveButton shopId={1} isInitiallySaved={false} userId="123" />);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls the unsave function when clicked", async () => {
    render(<SaveButton shopId={1} isInitiallySaved={true} userId="123" />);
    fireEvent.click(screen.getByText("Saved"));

    await waitFor(() => {
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  it("calls the save function when clicked", async () => {
    render(<SaveButton shopId={1} isInitiallySaved={false} userId="123" />);
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Saved")).toBeInTheDocument();
    });
  });
});
