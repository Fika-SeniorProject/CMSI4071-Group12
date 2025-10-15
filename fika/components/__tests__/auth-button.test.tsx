import { render, screen } from "@testing-library/react";
import { AuthButton } from "../auth-button";

const mockUser = { id: "1", email: "test@example.com" };

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

const mockSupabase = {
  auth: {
    onAuthStateChange: jest.fn().mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    }),
    getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
    signOut: jest.fn(),
  },
};

jest.mock("@/lib/supabase/client", () => ({
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
