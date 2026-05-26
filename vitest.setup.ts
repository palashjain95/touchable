import "@testing-library/jest-dom/vitest";
import "./src/styles/tokens.css";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
