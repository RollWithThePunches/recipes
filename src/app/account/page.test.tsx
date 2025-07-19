import { render, screen } from '@testing-library/react';
import AccountPage from './page';

// Mock the components and data
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('@/data/content.json', () => ({
  account: {
    favorites: [
      {
        id: 'margaritas',
        title: 'Margaritas',
        description: 'Fresh lime juice, tequila, and triple sec blended with ice creates the perfect margarita.',
        image: '/assets/mixed-drinks.jpg'
      }
    ],
    quickActions: [
      { label: 'Account information', href: '#account-info' },
      { label: 'Change login', href: '#change-login' },
      { label: 'Security', href: '#security' }
    ],
    navigationItems: [
      { id: 'account-info', label: 'Account information' },
      { id: 'your-recipes', label: 'Your recipes' },
      { id: 'favorites', label: 'Favorites' },
      { id: 'security', label: 'Security and privacy' },
      { id: 'help', label: 'Help and support' }
    ]
  },
  ui: {
    navigation: { brand: 'Cooking' },
    buttons: {},
    accountMenu: {},
    footer: {}
  }
}));

describe('AccountPage', () => {
  it('renders the account page with welcome message', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('Welcome Robin!')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('Account information')).toBeInTheDocument();
    expect(screen.getByText('Your recipes')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Security and privacy')).toBeInTheDocument();
    expect(screen.getByText('Help and support')).toBeInTheDocument();
  });

  it('renders most used section', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('Most used')).toBeInTheDocument();
    expect(screen.getByText('Account information')).toBeInTheDocument();
    expect(screen.getByText('Change login')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('renders favorites section', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('Your favorites')).toBeInTheDocument();
    expect(screen.getByText('View all')).toBeInTheDocument();
    expect(screen.getByText('Margaritas')).toBeInTheDocument();
  });

  it('renders your recipes section', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('Your recipes')).toBeInTheDocument();
    expect(screen.getByText('Create a recipe')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    render(<AccountPage />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
}); 