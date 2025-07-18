import "@testing-library/jest-dom";

// Extend expect with custom matchers for accessibility testing
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}
