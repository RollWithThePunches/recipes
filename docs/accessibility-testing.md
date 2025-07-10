# Accessibility Testing Setup

This project includes comprehensive accessibility testing with both automated and manual testing capabilities, specifically designed for NVDA screen reader compatibility.

## Overview

The accessibility testing setup includes:

1. **Automated Testing**: Axe-core integration with Jest
2. **Screen Reader Testing**: NVDA-specific test scenarios
3. **Manual Testing**: Comprehensive NVDA testing guide
4. **Focus Management**: Keyboard navigation testing
5. **ARIA Testing**: Semantic structure validation

## Quick Start

### Run All Accessibility Tests
```bash
npm run test:a11y
```

### Run NVDA-Specific Tests
```bash
npm run test:nvda
```

### Run All Tests with Coverage
```bash
npm run test:coverage
```

## Automated Testing

### Axe-Core Integration

The project uses `jest-axe` to run automated accessibility tests:

```typescript
import { renderWithA11y } from '@/lib/accessibility-testing';

it('should pass axe-core accessibility tests', async () => {
  const { axe } = renderWithA11y(<YourComponent />);
  const results = await axe();
  expect(results).toHaveNoViolations();
});
```

### Screen Reader Testing

Test NVDA-specific announcements and behaviors:

```typescript
import { nvdaTestScenarios } from '@/lib/accessibility-testing';

it('should announce button properly to NVDA', async () => {
  const { testNVDA } = renderWithA11y(<YourComponent />);
  const button = screen.getByRole('button', { name: /button name/i });
  await testNVDA('button name, button');
});
```

### Focus Management Testing

Test keyboard navigation and focus management:

```typescript
import { screenReaderTestUtils } from '@/lib/accessibility-testing';

it('should have proper keyboard navigation', async () => {
  const { container } = renderWithA11y(<YourComponent />);
  await screenReaderTestUtils.testKeyboardNavigation(container);
});
```

## Manual Testing with NVDA

### Prerequisites

1. Install NVDA from [nvaccess.org](https://www.nvaccess.org/download/)
2. Use Chrome, Firefox, or Edge for testing
3. Disable browser extensions that might interfere

### Basic NVDA Commands

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dialogs and menus
- **H**: Navigate through headings
- **L**: Navigate through lists
- **F**: Navigate through forms
- **R**: Navigate through regions/landmarks

### Testing Checklist

#### Page Load
- [ ] Page title is announced correctly
- [ ] Main content is identified as "main"
- [ ] Skip links are available and functional
- [ ] Navigation landmarks are properly identified

#### Navigation
- [ ] Tab order is logical and intuitive
- [ ] All interactive elements are reachable via keyboard
- [ ] Focus indicators are visible and clear
- [ ] No keyboard traps exist

#### Components
- [ ] Buttons announce their purpose clearly
- [ ] Links have descriptive text
- [ ] Form inputs have proper labels
- [ ] Images have alt text or are decorative
- [ ] Lists are properly structured

## Testing Utilities

### `renderWithA11y`

Enhanced render function with accessibility testing capabilities:

```typescript
const { axe, testScreenReader, testNVDA } = renderWithA11y(<Component />);

// Run axe-core tests
const results = await axe();

// Test screen reader announcements
await testScreenReader('expected text');

// Test NVDA-specific announcements
await testNVDA('expected announcement');
```

### `screenReaderTestUtils`

Utilities for testing screen reader compatibility:

```typescript
// Test keyboard navigation
await screenReaderTestUtils.testKeyboardNavigation(container);

// Test semantic structure
screenReaderTestUtils.testSemanticStructure(container);

// Test focus management
screenReaderTestUtils.testFocusManagement(trigger, target);

// Test skip links
screenReaderTestUtils.testSkipLinks(container);
```

### `nvdaTestScenarios`

NVDA-specific testing scenarios:

```typescript
// Test NVDA keyboard commands
nvdaTestScenarios.testNVDAKeyboardCommands(container);

// Test NVDA list navigation
nvdaTestScenarios.testNVDAListNavigation(container);

// Test NVDA form navigation
nvdaTestScenarios.testNVDAFormNavigation(container);
```

## Test Structure

### Component Tests

Each component should have accessibility tests:

```typescript
describe('ComponentName Accessibility', () => {
  describe('Automated Accessibility Testing', () => {
    it('should pass axe-core accessibility tests', async () => {
      // Axe-core tests
    });
  });

  describe('NVDA Screen Reader Testing', () => {
    it('should announce elements properly to NVDA', async () => {
      // NVDA-specific tests
    });
  });

  describe('Focus Management', () => {
    it('should manage focus properly', async () => {
      // Focus management tests
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation', async () => {
      // Keyboard navigation tests
    });
  });
});
```

### Page Tests

Test complete page accessibility:

```typescript
describe('PageName Accessibility', () => {
  it('should have proper page structure', () => {
    // Test page landmarks, headings, etc.
  });

  it('should support screen reader navigation', async () => {
    // Test screen reader announcements
  });
});
```

## Common Issues and Solutions

### Missing ARIA Labels

**Issue**: Elements not announced properly
**Solution**: Add proper `aria-label` or `aria-labelledby`

```typescript
// Bad
<button><Icon /></button>

// Good
<button aria-label="Close dialog"><Icon /></button>
```

### Improper Focus Management

**Issue**: Focus not managed when dialogs open/close
**Solution**: Implement proper focus trapping and return

```typescript
useEffect(() => {
  if (isOpen) {
    // Trap focus in dialog
    const focusableElements = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements?.length) {
      (focusableElements[0] as HTMLElement).focus();
    }
  } else {
    // Return focus to trigger
    triggerRef.current?.focus();
  }
}, [isOpen]);
```

### Missing Semantic Structure

**Issue**: Screen readers can't understand page structure
**Solution**: Use proper HTML semantics and ARIA landmarks

```typescript
// Bad
<div className="header">...</div>

// Good
<header role="banner">...</header>
```

## Continuous Integration

### GitHub Actions

Add accessibility testing to your CI pipeline:

```yaml
- name: Run Accessibility Tests
  run: npm run test:a11y

- name: Run NVDA Tests
  run: npm run test:nvda
```

### Pre-commit Hooks

Ensure accessibility tests run before commits:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:a11y"
    }
  }
}
```

## Reporting Issues

When reporting accessibility issues:

1. **Include test case**: Provide the failing test
2. **Describe the issue**: What doesn't work for screen readers
3. **Provide steps**: How to reproduce the issue
4. **Include context**: Browser, NVDA version, etc.

## Resources

- [NVDA Testing Guide](./nvda-testing-guide.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Testing Library Documentation](https://testing-library.com/)

## Best Practices

1. **Test Early**: Include accessibility testing in your development workflow
2. **Test Often**: Run tests on every component change
3. **Manual Testing**: Complement automated tests with manual NVDA testing
4. **User Testing**: Test with actual screen reader users when possible
5. **Documentation**: Keep accessibility documentation up to date
6. **Training**: Train team members on accessibility testing 