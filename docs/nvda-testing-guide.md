# NVDA Screen Reader Testing Guide

This guide provides comprehensive instructions for testing your application with NVDA (NonVisual Desktop Access) screen reader to ensure accessibility compliance.

## Prerequisites

1. **Install NVDA**: Download and install NVDA from [nvaccess.org](https://www.nvaccess.org/download/)
2. **Test Environment**: Use a clean browser session with no extensions that might interfere
3. **Browser**: Test with Chrome, Firefox, and Edge (NVDA works best with these browsers)

## NVDA Basic Commands

### Navigation Commands
- **Tab**: Navigate through interactive elements
- **Arrow Keys**: Navigate within components
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dialogs and menus
- **H**: Navigate through headings
- **L**: Navigate through lists
- **F**: Navigate through forms
- **R**: Navigate through regions/landmarks

### Screen Reader Commands
- **Ctrl + NVDA + Space**: Toggle NVDA on/off
- **NVDA + Up/Down**: Read current line
- **NVDA + Left/Right**: Read character by character
- **NVDA + Shift + Up/Down**: Read line by line
- **NVDA + Tab**: Read current focus

## Testing Checklist

### 1. Page Load and Navigation

#### Initial Page Load
- [ ] Page title is announced correctly
- [ ] Main content is identified as "main"
- [ ] Skip links are available and functional
- [ ] Navigation landmarks are properly identified

#### Navigation Testing
- [ ] Tab order is logical and intuitive
- [ ] All interactive elements are reachable via keyboard
- [ ] Focus indicators are visible and clear
- [ ] No keyboard traps exist

### 2. Header Component Testing

#### Search Functionality
1. **Open Search**:
   - Navigate to search button (Tab)
   - Press Enter or Space to activate
   - Verify: "Open search, button" is announced
   - Verify: Focus moves to search input
   - Verify: "Search recipes, textbox" is announced

2. **Search Input**:
   - Type in search field
   - Verify: Each character is announced
   - Press Escape to close
   - Verify: Focus returns to search button
   - Verify: "Close search, button" is announced when clicking X

3. **Search Submit**:
   - Enter search term and press Enter
   - Verify: Search functionality works
   - Verify: Appropriate feedback is provided

#### Menu Navigation
1. **Hamburger Menu**:
   - Navigate to menu button (Tab)
   - Press Enter or Space to activate
   - Verify: "Open navigation menu, button" is announced
   - Verify: Menu opens and focus moves appropriately

### 3. Drawer Component Testing

#### Menu Structure
- [ ] Menu items are announced as "menuitem"
- [ ] Menu length is announced (e.g., "List with 5 items")
- [ ] Current position in menu is announced
- [ ] Arrow keys navigate through menu items
- [ ] Enter activates menu items
- [ ] Escape closes the menu

#### Menu Content
- [ ] Each menu item has descriptive text
- [ ] Icons have appropriate alt text or are decorative
- [ ] Menu items are properly grouped
- [ ] Sub-menus are announced correctly

### 4. Recipe Components Testing

#### Recipe Cards
1. **Recipe List**:
   - Navigate through recipe cards
   - Verify: Recipe titles are announced clearly
   - Verify: Recipe descriptions are read
   - Verify: Action buttons are properly labeled

2. **Recipe Details**:
   - Navigate to "View recipe" links
   - Verify: "View recipe for [recipe name]" is announced
   - Press Enter to navigate to recipe page
   - Verify: Page loads and focus is managed properly

#### Recipe Page
1. **Recipe Information**:
   - Verify: Recipe title is announced as main heading
   - Verify: Ingredients list is properly structured
   - Verify: Instructions are read in logical order
   - Verify: Cooking time and difficulty are announced

2. **Interactive Elements**:
   - Test favorite button: "Add to favorites" / "Remove from favorites"
   - Test share button: "Share recipe"
   - Test print button: "Print recipe"
   - Verify: Button states are announced (pressed, expanded)

### 5. Form Testing

#### Search Forms
- [ ] Form labels are announced with inputs
- [ ] Required fields are identified
- [ ] Error messages are announced immediately
- [ ] Success messages are announced
- [ ] Form validation is clear and helpful

#### User Account Forms
- [ ] Login form is accessible
- [ ] Registration form is accessible
- [ ] Password fields are properly masked
- [ ] Error states are announced
- [ ] Success states are announced

### 6. Dynamic Content Testing

#### Loading States
- [ ] Loading indicators are announced
- [ ] Progress is communicated to users
- [ ] Loading complete is announced

#### Content Updates
- [ ] New content is announced when it loads
- [ ] Status updates are communicated
- [ ] Error states are announced clearly

#### Modal Dialogs
- [ ] Modal opens and focus is trapped
- [ ] Modal title is announced
- [ ] Modal content is read
- [ ] Close button is accessible
- [ ] Escape key closes modal
- [ ] Focus returns to trigger when modal closes

### 7. Keyboard Navigation Testing

#### Tab Navigation
- [ ] Tab order is logical
- [ ] All interactive elements are reachable
- [ ] No keyboard traps
- [ ] Focus indicators are visible

#### Arrow Key Navigation
- [ ] Custom components respond to arrow keys
- [ ] Dropdown menus work with arrow keys
- [ ] Sliders and other custom controls work

#### Keyboard Shortcuts
- [ ] Enter activates buttons and links
- [ ] Space activates buttons
- [ ] Escape closes dialogs and menus
- [ ] Tab moves through focusable elements

## Common NVDA Announcements to Verify

### Proper Announcements
- ✅ "Button, [name]"
- ✅ "Link, [name]"
- ✅ "Heading level 1, [title]"
- ✅ "List with [number] items"
- ✅ "Textbox, [name]"
- ✅ "Checkbox, [name], checked/unchecked"
- ✅ "Radio button, [name], selected/not selected"

### Problematic Announcements
- ❌ "Button" (no name)
- ❌ "Link" (no name)
- ❌ "Image" (no alt text)
- ❌ "Div" (should have role)
- ❌ "Span" (should have role)

## Testing Scenarios

### Scenario 1: New User Experience
1. Load the homepage
2. Navigate through the main navigation
3. Search for a recipe
4. View recipe details
5. Add recipe to favorites
6. Navigate back to search results

### Scenario 2: Returning User Experience
1. Load the homepage
2. Access user account menu
3. View saved recipes
4. Edit user preferences
5. Log out

### Scenario 3: Error Handling
1. Try to search with invalid input
2. Attempt to access restricted content
3. Test form validation
4. Verify error messages are announced

## Reporting Issues

When reporting accessibility issues, include:

1. **Issue Description**: What doesn't work
2. **Steps to Reproduce**: Exact steps to trigger the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **NVDA Version**: Version of NVDA used
6. **Browser**: Browser and version used
7. **Screen Recording**: If possible, include a screen recording

## Automated Testing Integration

This manual testing should be complemented with automated testing:

1. **Axe-core**: Run automated accessibility tests
2. **Jest-axe**: Integrate with your test suite
3. **Lighthouse**: Use for broader accessibility audits
4. **Pa11y**: Command-line accessibility testing

## Continuous Testing

- Run manual NVDA tests before each release
- Include accessibility testing in your CI/CD pipeline
- Regular audits with different screen reader users
- Monitor accessibility metrics over time

## Resources

- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [WebAIM Screen Reader Survey](https://webaim.org/projects/screenreadersurvey/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Quick Reference

### NVDA Commands for Testing
```
Tab - Navigate elements
Enter/Space - Activate
Escape - Close/Cancel
H - Headings
L - Lists
F - Forms
R - Regions
Ctrl+NVDA+Space - Toggle NVDA
```

### Common Issues to Check
- Missing alt text on images
- Improper heading hierarchy
- Missing ARIA labels
- Keyboard traps
- Focus management issues
- Color contrast problems
- Insufficient touch targets 