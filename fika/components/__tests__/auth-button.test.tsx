import { render, screen } from "@testing-library/react";
import { AuthButton } from "../auth-button";
import { vi } from "vitest";

const mockUser = { id: "1", email: "test@example.com" };

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

const mockSupabase = {
  auth: {
    onAuthStateChange: vi.fn().mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    }),
    getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    signOut: vi.fn(),
  },
};

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => mockSupabase,
}));

describe("AuthButton", () => {
  it("renders sign in button when user is not authenticated", async () => {
    render(<AuthButton />);
    expect(await screen.findByText("Sign in")).toBeInTheDocument();
  });

  it("renders logout button when user is authenticated", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    render(<AuthButton />);
    expect(await screen.findByText("Logout")).toBeInTheDocument();
  });
});
