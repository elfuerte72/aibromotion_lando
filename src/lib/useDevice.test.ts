import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useIsMobile, useIsTouch, useReducedMotion } from "./useDevice";

type MediaState = {
  matches: boolean;
  listeners: Set<(event: MediaQueryListEvent) => void>;
};

const states = new Map<string, MediaState>();

function getOrCreateState(query: string): MediaState {
  let state = states.get(query);
  if (!state) {
    state = { matches: false, listeners: new Set() };
    states.set(query, state);
  }
  return state;
}

function setMatches(query: string, matches: boolean): void {
  const state = getOrCreateState(query);
  state.matches = matches;
  for (const listener of state.listeners) {
    listener({ matches, media: query } as MediaQueryListEvent);
  }
}

function installMatchMedia(): void {
  const impl = (query: string) => {
    const state = getOrCreateState(query);
    return {
      matches: state.matches,
      media: query,
      onchange: null,
      addListener: (cb: (event: MediaQueryListEvent) => void) => {
        state.listeners.add(cb);
      },
      removeListener: (cb: (event: MediaQueryListEvent) => void) => {
        state.listeners.delete(cb);
      },
      addEventListener: (
        _type: string,
        cb: (event: MediaQueryListEvent) => void,
      ) => {
        state.listeners.add(cb);
      },
      removeEventListener: (
        _type: string,
        cb: (event: MediaQueryListEvent) => void,
      ) => {
        state.listeners.delete(cb);
      },
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;
  };

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn(impl),
  });
}

describe("useDevice hooks", () => {
  beforeEach(() => {
    states.clear();
    installMatchMedia();
  });

  afterEach(() => {
    states.clear();
  });

  it("useIsMobile returns the current matchMedia value for max-width: 767.98px", () => {
    setMatches("(max-width: 767.98px)", true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("useIsMobile updates when the media query changes", () => {
    setMatches("(max-width: 767.98px)", false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => setMatches("(max-width: 767.98px)", true));
    expect(result.current).toBe(true);
  });

  it("useIsTouch keys off (hover: none) and (pointer: coarse)", () => {
    setMatches("(hover: none) and (pointer: coarse)", true);
    const { result } = renderHook(() => useIsTouch());
    expect(result.current).toBe(true);
  });

  it("useReducedMotion keys off prefers-reduced-motion", () => {
    setMatches("(prefers-reduced-motion: reduce)", true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when matchMedia is not implemented", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
