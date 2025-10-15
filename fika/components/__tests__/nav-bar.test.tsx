
import { render, screen } from "@testing-library/react";

import { NavBar } from "../nav-bar";

describe("NavBar", () => {
  it("should render the navigation links and auth button", () => {
    const authButton = <button>auth</button>;
    render(<NavBar authButton={authButton} />);

    const fikaLink = screen.getByRole("link", { name: "fika" });
    const discoverLink = screen.getByRole("link", { name: "discover" });
    const auth = screen.getByRole("button", { name: "auth" });

    expect(fikaLink).toBeInTheDocument();
    expect(discoverLink).toBeInTheDocument();
    expect(auth).toBeInTheDocument();
  });
});
