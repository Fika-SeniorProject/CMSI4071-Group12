
import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { LoadMore } from "../load-more";
import { useInView } from "react-intersection-observer";

vi.mock("react-intersection-observer", () => ({
  useInView: vi.fn(),
}));

describe("LoadMore", () => {
  it("should call loadMoreShops when in view", () => {
    const loadMoreShops = vi.fn();
    (useInView as jest.Mock).mockReturnValue({ inView: true, ref: vi.fn() });

    render(<LoadMore loadMoreShops={loadMoreShops} />);

    expect(loadMoreShops).toHaveBeenCalledTimes(1);
  });
});

