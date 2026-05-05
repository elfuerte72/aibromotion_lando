import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SnapCarousel } from "./SnapCarousel";

const ITEMS = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
  { id: "c", label: "Gamma" },
];

function renderCarousel() {
  return render(
    <SnapCarousel
      label="Test carousel"
      items={ITEMS}
      getKey={(x) => x.id}
      slideClassName="w-[80vw] shrink-0 snap-start"
      renderItem={(x) => <div data-testid={`slide-${x.id}`}>{x.label}</div>}
    />,
  );
}

describe("SnapCarousel", () => {
  beforeEach(() => {
    // jsdom has no scrollIntoView — stub it so keyboard / indicator
    // handlers don't throw.
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders a slide for every item with a11y roles", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: /test carousel/i });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getAllByRole("group")).toHaveLength(ITEMS.length);
    ITEMS.forEach((item) => {
      expect(screen.getByTestId(`slide-${item.id}`)).toBeInTheDocument();
    });
  });

  it("renders a numbered indicator per item", () => {
    renderCarousel();
    ITEMS.forEach((_, i) => {
      expect(
        screen.getByRole("tab", { name: `Перейти к слайду ${i + 1}` }),
      ).toBeInTheDocument();
    });
  });

  it("scrolls to next slide on ArrowRight", () => {
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    renderCarousel();
    const track = screen
      .getByRole("region", { name: /test carousel/i })
      .querySelector('[tabindex="0"]') as HTMLElement;
    expect(track).toBeTruthy();
    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(spy).toHaveBeenCalled();
  });

  it("scrolls to a slide when its indicator is clicked", () => {
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    renderCarousel();
    fireEvent.click(
      screen.getByRole("tab", { name: "Перейти к слайду 3" }),
    );
    expect(spy).toHaveBeenCalled();
  });
});
