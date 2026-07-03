// FILE: src/hooks/useCommandPalette.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const commands = [
    { id: 'home', title: 'Go to Dashboard', description: 'View your operations overview', shortcut: 'Ctrl+H', action: () => navigate('/') },
    { id: 'chat', title: 'Open AI Chat', description: 'Ask the assistant questions', shortcut: 'Ctrl+C', action: () => navigate('/chat') },
    { id: 'incidents', title: 'Go to Incidents', description: 'Review incident details', shortcut: 'Ctrl+I', action: () => navigate('/incidents') },
    { id: 'reports', title: 'Go to Reports', description: 'Generate or export reports', shortcut: 'Ctrl+R', action: () => navigate('/reports') },
    { id: 'analytics', title: 'Go to Analytics', description: 'View security KPIs and trends', shortcut: 'Ctrl+A', action: () => navigate('/analytics') },
    { id: 'settings', title: 'Open Settings', description: 'Manage workspace preferences', shortcut: 'Ctrl+S', action: () => navigate('/settings') },
    { id: 'profile', title: 'Open Profile', description: 'Update your user profile', shortcut: 'Ctrl+P', action: () => navigate('/profile') },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { open, setOpen, commands };
}