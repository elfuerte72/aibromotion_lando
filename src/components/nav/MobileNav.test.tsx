import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MobileNav } from "./MobileNav";

// Lenis hook — not relevant for drawer UX tests. Returning `null` makes
// `scrollToAnchor` use the native scrollIntoView fallback.
vi.mock("lenis/react", () => ({
  useLenis: () => null,
}));

function installMatchMedia(): void {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => true,
    })),
  });
}

describe("MobileNav", () => {
  beforeEach(() => {
    installMatchMedia();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders the burger in closed state", () => {
    render(<MobileNav />);
    const burger = screen.getByRole("button", { name: /открыть меню/i });
    expect(burger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the drawer when the burger is pressed", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByRole("button", { name: /открыть меню/i }));
    expect(screen.getByRole("dialog", { name: /меню/i })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes the drawer when Escape is pressed", async () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByRole("button", { name: /открыть меню/i }));
    fireEvent.keyDown(window, { key: "Escape" });
    // Framer Motion's AnimatePresence removes the node after its exit
    // animation — wait for the unmount rather than asserting sync.
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("closes the drawer when the backdrop is clicked", async () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByRole("button", { name: /открыть меню/i }));
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.previousElementSibling as HTMLElement | null;
    expect(backdrop).toBeTruthy();
    if (backdrop) fireEvent.click(backdrop);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
