import { configureAxe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

// Configure axe for testing
export const axe = configureAxe({
  rules: {
    // Customize rules as needed
    "color-contrast": { enabled: true },
    "button-name": { enabled: true },
    "image-alt": { enabled: true },
    "link-name": { enabled: true },
    list: { enabled: true },
    listitem: { enabled: true },
    "heading-order": { enabled: true },
    "landmark-one-main": { enabled: true },
    "landmark-unique": { enabled: true },
    region: { enabled: true },
    "skip-link": { enabled: true },
  },
});

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Screen reader testing utilities
export const screenReaderTestUtils = {
  // Test if element is announced to screen readers
  async testScreenReaderAnnouncement(
    element: HTMLElement,
    expectedText: string,
  ) {
    // Simulate screen reader announcement
    const announcement =
      element.getAttribute("aria-label") ||
      element.getAttribute("aria-labelledby") ||
      element.textContent;

    expect(announcement).toContain(expectedText);
  },

  // Test keyboard navigation
  async testKeyboardNavigation(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test tab order
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i] as HTMLElement;
      element.focus();
      expect(document.activeElement).toBe(element);
    }
  },

  // Test ARIA live regions
  testLiveRegion(element: HTMLElement, expectedRole: string = "status") {
    expect(element).toHaveAttribute("aria-live", "polite");
    expect(element).toHaveAttribute("role", expectedRole);
  },

  // Test skip links
  testSkipLinks(container: HTMLElement) {
    const skipLinks = container.querySelectorAll('a[href^="#"]');
    expect(skipLinks.length).toBeGreaterThan(0);

    skipLinks.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect(link.textContent).toMatch(/skip|jump/i);
    });
  },

  // Test focus management
  testFocusManagement(
    trigger: HTMLElement,
    target: HTMLElement,
    shouldFocus: boolean = true,
  ) {
    trigger.focus();
    trigger.click();

    if (shouldFocus) {
      expect(target).toHaveFocus();
    } else {
      expect(target).not.toHaveFocus();
    }
  },

  // Test semantic structure
  testSemanticStructure(container: HTMLElement) {
    // Test for main landmark
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    // Test for navigation landmarks
    const nav = container.querySelector("nav");
    if (nav) {
      expect(nav).toHaveAttribute("aria-label");
    }

    // Test for heading hierarchy
    const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headings.length > 0) {
      const headingLevels = Array.from(headings).map((h) =>
        parseInt(h.tagName[1]),
      );
      // Check for proper heading hierarchy (no skipping levels)
      for (let i = 1; i < headingLevels.length; i++) {
        expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
      }
    }
  },
};

// NVDA-specific testing scenarios
export const nvdaTestScenarios = {
  // Test NVDA announcement patterns
  async testNVDAAnnouncement(
    element: HTMLElement,
    expectedAnnouncement: string,
  ) {
    // NVDA typically announces: "element name, role, state"
    const role = element.getAttribute("role") || element.tagName.toLowerCase();
    const name =
      element.getAttribute("aria-label") ||
      element.getAttribute("aria-labelledby") ||
      element.textContent?.trim();
    const state =
      element.getAttribute("aria-expanded") ||
      element.getAttribute("aria-pressed") ||
      element.getAttribute("aria-checked");

    const announcement = [name, role, state].filter(Boolean).join(", ");
    expect(announcement.toLowerCase()).toContain(
      expectedAnnouncement.toLowerCase(),
    );
  },

  // Test NVDA navigation commands
  testNVDAKeyboardCommands(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    focusableElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // Test Tab navigation
      htmlElement.focus();
      expect(document.activeElement).toBe(htmlElement);

      // Test Enter key activation
      if (
        htmlElement.tagName === "BUTTON" ||
        htmlElement.getAttribute("role") === "button"
      ) {
        const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
        htmlElement.dispatchEvent(enterEvent);
      }

      // Test Space key activation
      if (
        htmlElement.tagName === "BUTTON" ||
        htmlElement.getAttribute("role") === "button"
      ) {
        const spaceEvent = new KeyboardEvent("keydown", { key: " " });
        htmlElement.dispatchEvent(spaceEvent);
      }
    });
  },

  // Test NVDA list navigation
  testNVDAListNavigation(container: HTMLElement) {
    const lists = container.querySelectorAll('ul, ol, [role="list"]');

    lists.forEach((list) => {
      const listItems = list.querySelectorAll('li, [role="listitem"]');
      expect(listItems.length).toBeGreaterThan(0);

      listItems.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });
  },

  // Test NVDA form navigation
  testNVDAFormNavigation(container: HTMLElement) {
    const forms = container.querySelectorAll("form");

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach((input) => {
        const htmlInput = input as HTMLElement;

        // Test for proper labels
        const label =
          htmlInput.getAttribute("aria-label") ||
          htmlInput.getAttribute("aria-labelledby") ||
          htmlInput.getAttribute("title");

        if (htmlInput.getAttribute("type") !== "hidden") {
          expect(label).toBeTruthy();
        }

        // Test for proper input types
        if (htmlInput.tagName === "INPUT") {
          const type = htmlInput.getAttribute("type");
          if (type === "checkbox" || type === "radio") {
            expect(htmlInput).toHaveAttribute("role");
          }
        }
      });
    });
  },
};

// Custom render function with accessibility testing
export const renderWithA11y = (ui: ReactElement, options = {}) => {
  const utils = render(ui, options);

  return {
    ...utils,
    axe: async () => {
      const { container } = utils;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      return results;
    },
    testScreenReader: (expectedText: string) => {
      const { container } = utils;
      return screenReaderTestUtils.testScreenReaderAnnouncement(
        container,
        expectedText,
      );
    },
    testNVDA: (expectedAnnouncement: string) => {
      const { container } = utils;
      return nvdaTestScenarios.testNVDAAnnouncement(
        container,
        expectedAnnouncement,
      );
    },
  };
};

// Manual testing checklist for NVDA
export const nvdaManualTestingChecklist = {
  navigation: [
    "Tab navigation works correctly",
    "Arrow keys work for custom components",
    "Enter and Space keys activate buttons",
    "Escape key closes modals and menus",
    "Skip links work and announce properly",
  ],
  announcements: [
    "Page title is announced on load",
    "Form labels are announced with inputs",
    "Button states are announced (pressed, expanded)",
    "Error messages are announced",
    "Loading states are announced",
  ],
  landmarks: [
    "Main content is properly identified",
    "Navigation regions are announced",
    "Search regions are identified",
    "Complementary content is marked",
    "Banner and footer are identified",
  ],
  lists: [
    "List items are properly announced",
    "List length is announced",
    "Current position in list is announced",
    "Nested lists work correctly",
  ],
  forms: [
    "Required fields are announced",
    "Error states are announced",
    "Success messages are announced",
    "Form validation is announced",
  ],
  dynamic: [
    "Content changes are announced",
    "Modal dialogs are announced",
    "Loading states are announced",
    "Status updates are announced",
  ],
};
