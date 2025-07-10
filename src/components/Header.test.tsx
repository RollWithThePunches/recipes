import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithA11y, nvdaTestScenarios, screenReaderTestUtils } from '@/lib/accessibility-testing';
import Header from './Header';

// Mock the content data
jest.mock('@/data/content.json', () => ({
  ui: {
    navigation: {
      brand: 'Recipes',
      searchPlaceholder: 'Search recipes',
    },
  },
}));

describe('Header Accessibility', () => {
  describe('Automated Accessibility Testing', () => {
    it('should pass axe-core accessibility tests', async () => {
      const { axe } = renderWithA11y(<Header />);
      
      const results = await axe();
      expect(results).toHaveNoViolations();
    });

    it('should have proper semantic structure', () => {
      const { container } = renderWithA11y(<Header />);
      
      screenReaderTestUtils.testSemanticStructure(container);
    });

    it('should have proper keyboard navigation', async () => {
      const { container } = renderWithA11y(<Header />);
      
      await screenReaderTestUtils.testKeyboardNavigation(container);
    });
  });

  describe('NVDA Screen Reader Testing', () => {
    it('should announce search button properly to NVDA', async () => {
      const { testNVDA } = renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      await testNVDA('open search, button');
    });

    it('should announce menu button properly to NVDA', async () => {
      const { testNVDA } = renderWithA11y(<Header />);
      
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      await testNVDA('open navigation menu, button');
    });

    it('should support NVDA keyboard commands', () => {
      const { container } = renderWithA11y(<Header />);
      
      nvdaTestScenarios.testNVDAKeyboardCommands(container);
    });

    it('should announce search input properly when focused', async () => {
      const { testNVDA } = renderWithA11y(<Header />);
      
      // Open search
      const searchButton = screen.getByRole('button', { name: /open search/i });
      fireEvent.click(searchButton);
      
      await waitFor(() => {
        const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
        expect(searchInput).toBeInTheDocument();
      });
      
      const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
      await testNVDA('search recipes, textbox');
    });

    it('should announce button states correctly', async () => {
      const { testNVDA } = renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      
      // Test expanded state
      fireEvent.click(searchButton);
      await waitFor(() => {
        expect(searchButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      await testNVDA('open search, button, expanded');
    });
  });

  describe('Focus Management', () => {
    it('should manage focus properly when search is opened', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      fireEvent.click(searchButton);
      
      await waitFor(() => {
        const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
        expect(searchInput).toHaveFocus();
      });
    });

    it('should return focus when search is closed', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      fireEvent.click(searchButton);
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close search/i });
        fireEvent.click(closeButton);
      });
      
      await waitFor(() => {
        expect(searchButton).toHaveFocus();
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper ARIA labels', () => {
      renderWithA11y(<Header />);
      
      expect(screen.getByRole('button', { name: /open search/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute('aria-label');
    });

    it('should have proper ARIA expanded states', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      expect(searchButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(searchButton);
      
      await waitFor(() => {
        expect(searchButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support Enter key activation', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      
      fireEvent.keyDown(searchButton, { key: 'Enter' });
      
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /search recipes/i })).toBeInTheDocument();
      });
    });

    it('should support Space key activation', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      
      fireEvent.keyDown(searchButton, { key: ' ' });
      
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /search recipes/i })).toBeInTheDocument();
      });
    });

    it('should support Escape key to close search', async () => {
      renderWithA11y(<Header />);
      
      const searchButton = screen.getByRole('button', { name: /open search/i });
      fireEvent.click(searchButton);
      
      await waitFor(() => {
        const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
        fireEvent.keyDown(searchInput, { key: 'Escape' });
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('textbox', { name: /search recipes/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Screen Reader Announcements', () => {
    it('should announce search functionality to screen readers', async () => {
      const { testScreenReader } = renderWithA11y(<Header />);
      
      await testScreenReader('search');
    });

    it('should announce navigation functionality to screen readers', async () => {
      const { testScreenReader } = renderWithA11y(<Header />);
      
      await testScreenReader('navigation');
    });
  });
}); 