import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  searchOpen: boolean;
  notificationPanelOpen: boolean;
  activeWorkspace: string;
  theme: 'dark' | 'light' | 'system';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setNotificationPanelOpen: (open: boolean) => void;
  setActiveWorkspace: (workspace: string) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      sidebarOpen: true,
      commandPaletteOpen: false,
      searchOpen: false,
      notificationPanelOpen: false,
      activeWorkspace: 'ws-1',
      theme: 'dark',
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      setNotificationPanelOpen: (notificationPanelOpen) => set({ notificationPanelOpen }),
      setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeWorkspace: state.activeWorkspace,
        theme: state.theme,
      }),
    }
  )
);
