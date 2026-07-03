import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Chat } from '../pages/Chat';
import { Incidents } from '../pages/Incidents';
import { ThreatIntel } from '../pages/ThreatIntel';
import { Timeline } from '../pages/Timeline';
import { Reports } from '../pages/Reports';
import { Analytics } from '../pages/Analytics';
import { Agents } from '../pages/Agents';
import { Audit } from '../pages/Audit';
import { Settings } from '../pages/Settings';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'chat', element: <Chat /> },
          { path: 'incidents', element: <Incidents /> },
          { path: 'threat-intel', element: <ThreatIntel /> },
          { path: 'timeline', element: <Timeline /> },
          { path: 'reports', element: <Reports /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'agents', element: <Agents /> },
          { path: 'audit', element: <Audit /> },
          { path: 'settings', element: <Settings /> },
          { path: 'profile', element: <Profile /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
