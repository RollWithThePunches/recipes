import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import FavoritesModal from './FavoritesModal';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

const mockPathname = '/recipe/test-recipe';

describe('FavoritesModal', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<FavoritesModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays correct title', () => {
    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText('Sign in to add to Favorites')).toBeInTheDocument();
  });

  it('displays sign in button', () => {
    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays create account text', () => {
    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("Don&apos;t have an account?")).toBeInTheDocument();
    expect(screen.getByText('Create one to get started')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop!);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('navigates to login page when sign in button is clicked', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/login?redirectTo=%2Frecipe%2Ftest-recipe');
  });

  it('navigates to create account page when create account link is clicked', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const createAccountLink = screen.getByText('Create one to get started');
    fireEvent.click(createAccountLink);
    
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/create-account?redirectTo=%2Frecipe%2Ftest-recipe');
  });

  it('handles keyboard navigation for close button', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation for sign in button', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.keyDown(signInButton, { key: 'Enter' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/login?redirectTo=%2Frecipe%2Ftest-recipe');
  });

  it('handles keyboard navigation for create account link', () => {
    const onClose = jest.fn();
    render(<FavoritesModal isOpen={true} onClose={onClose} />);
    
    const createAccountLink = screen.getByText('Create one to get started');
    fireEvent.keyDown(createAccountLink, { key: 'Enter' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/create-account?redirectTo=%2Frecipe%2Ftest-recipe');
  });

  it('has proper ARIA attributes', () => {
    render(<FavoritesModal isOpen={true} onClose={jest.fn()} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
  });
}); 