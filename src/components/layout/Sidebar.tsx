// FILE: src/components/layout/Sidebar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, AlertTriangle, Shield,
  Clock, FileText, BarChart3, Bot, ClipboardList,
  ChevronLeft, ChevronRight, Search, Settings, User, LogOut,
  Bell, Sparkles
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';
import { SIDEBAR_ITEMS } from '../../utils/constants';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, MessageSquare, AlertTriangle, Shield,
  Clock, FileText, BarChart3, Bot, ClipboardList,
  Settings, User, LogOut, Bell, Search, Sparkles
};

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border/80 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center border-b border-border/80 px-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
                <div className="text-sm font-semibold tracking-[0.2em] text-slate-200">SENTINEL</div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Ops Platform</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button onClick={toggleSidebar} className="ml-auto rounded-xl p-1.5 text-slate-400 transition-all hover:bg-card hover:text-foreground">
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {!sidebarCollapsed && (
        <div className="px-3 py-3">
          <div className="rounded-2xl border border-border/70 bg-card/70 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Workspace</div>
            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="h-2 w-2 rounded-full bg-success" /> Production SOC
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'border-primary/25 bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                  : 'border-transparent text-slate-400 hover:border-border/70 hover:bg-card/70 hover:text-foreground',
                sidebarCollapsed && 'justify-center px-2'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border/80 p-3">
        <NavLink to="/settings" className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-card/70 hover:text-foreground', sidebarCollapsed && 'justify-center px-2')}>
          <Settings className="h-4 w-4" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>

        <button onClick={logout} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-danger/10 hover:text-danger', sidebarCollapsed && 'justify-center px-2')}>
          <LogOut className="h-4 w-4" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}