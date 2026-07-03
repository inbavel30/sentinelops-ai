// FILE: src/components/layout/Navbar.tsx
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Bell, Command, Moon, Sun, User, Settings,
  LogOut, ChevronDown, Sparkles
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useCommandPalette } from '../../hooks/useCommandPalette';

export function Navbar() {
  const { theme, setTheme, setNotificationPanelOpen } = useUIStore();
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { setOpen: setCommandOpen } = useCommandPalette();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.length ? parts.map((part) => part.replace(/-/g, ' ')) : ['overview'];
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/80 bg-slate-950/70 px-6 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-4">
        <div className="hidden flex-col md:flex">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Operations</span>
          <span className="text-sm text-slate-300">{breadcrumbs[breadcrumbs.length - 1]}</span>
        </div>
        <button onClick={() => setCommandOpen(true)} className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2 text-left text-sm text-slate-400 transition-all hover:border-primary/30 hover:text-foreground">
          <Search className="h-4 w-4" />
          <span className="flex-1">Search alerts, incidents, agents...</span>
          <span className="flex items-center gap-1 rounded-md border border-border/70 px-2 py-1 text-[11px] text-slate-500">
            <Command className="h-3 w-3" />K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/incidents')} className="hidden items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/15 sm:flex">
          <Sparkles className="h-4 w-4" />
          New incident
        </button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-xl p-2 text-slate-400 transition-all hover:bg-card hover:text-foreground">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button onClick={() => setNotificationPanelOpen(true)} className="relative rounded-xl p-2 text-slate-400 transition-all hover:bg-card hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-medium text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-xl p-1.5 transition-all hover:bg-card">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="hidden text-sm text-foreground md:block">{user?.name || 'User'}</span>
            <ChevronDown className="hidden h-4 w-4 text-slate-500 md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-border/80 bg-slate-950/95 p-2 shadow-2xl">
              <div className="border-b border-border/80 px-3 py-2">
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>
              <button onClick={() => { navigate('/profile'); setProfileOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition-all hover:bg-card hover:text-foreground">
                <User className="h-4 w-4" /> Profile
              </button>
              <button onClick={() => { navigate('/settings'); setProfileOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition-all hover:bg-card hover:text-foreground">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <div className="mt-2 border-t border-border/80 pt-2">
                <button onClick={() => useAuthStore.getState().logout()} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-danger transition-all hover:bg-danger/10">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}