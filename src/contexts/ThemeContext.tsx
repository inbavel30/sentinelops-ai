// FILE: src/contexts/ThemeContext.tsx
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useUIStore } from '../store/uiStore';

const ThemeContext = createContext<{ theme: string }>({ theme: 'dark' });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useUIStore();
  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);