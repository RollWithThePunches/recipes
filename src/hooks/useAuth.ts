import { useState, useEffect } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by looking for userId in localStorage
    const checkAuthStatus = () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        console.log('checkAuthStatus - storedUserId:', storedUserId, 'isLoggedIn:', isLoggedIn);
        
        if (storedUserId && isLoggedIn) {
          setUserId(storedUserId);
          setIsLoggedIn(true);
          console.log('User is logged in:', storedUserId);
        } else {
          setUserId(null);
          setIsLoggedIn(false);
          console.log('User is not logged in');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUserId(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userId' || e.key === 'isLoggedIn') {
        console.log('Storage changed:', e.key, e.newValue);
        checkAuthStatus();
      }
    };

    // Also listen for custom events (for same-tab changes)
    const handleCustomStorageChange = () => {
      console.log('Custom storage change event received');
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('firstName');
      setUserId(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    isLoggedIn,
    userId,
    isLoading,
    logout
  };
} 