import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bell, CheckCheck } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { useUIStore } from '../../store/uiStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function NotificationPanel() {
  const { notifications, unreadCount, markAllAsRead, setNotifications } = useNotificationStore();
  const { notificationPanelOpen, setNotificationPanelOpen } = useUIStore();

  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications([]);
    }
  }, [notifications.length, setNotifications]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNotificationPanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setNotificationPanelOpen]);

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm" onClick={() => setNotificationPanelOpen(false)} />
          <motion.aside initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 24, opacity: 0 }} transition={{ duration: 0.2 }} className="fixed right-4 top-20 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border/80 bg-slate-950/95 shadow-[0_24px_80px_rgba(2,6,23,0.55)]">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-foreground">Notifications</div>
                <div className="text-xs text-slate-500">{unreadCount} unread</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => markAllAsRead()}>
                  <CheckCheck className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setNotificationPanelOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="max-h-[calc(100vh-13rem)] space-y-3 overflow-y-auto p-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Card key={notification.id} className="border-border/70 bg-card/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-foreground">{notification.title}</div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{notification.message}</p>
                      </div>
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                  </Card>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 bg-slate-900/50 px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
