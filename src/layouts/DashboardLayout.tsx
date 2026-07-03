// FILE: src/layouts/DashboardLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { CommandPalette } from '../components/layout/CommandPalette';
import { NotificationPanel } from '../components/notifications/NotificationPanel';
import { useUIStore } from '../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardLayout() {
  const { sidebarCollapsed } = useUIStore();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-18' : 'ml-64'}`}>
        <Navbar />
        <main className="flex-1 overflow-auto px-6 py-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <CommandPalette />
      <NotificationPanel />
    </div>
  );
}