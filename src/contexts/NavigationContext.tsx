import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage, isScrolled, setIsScrolled }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
