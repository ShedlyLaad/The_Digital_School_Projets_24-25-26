// File: src/pages/admin/AdminLayout.tsx

import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../lib/constants';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import bigscreenLogo from '../../assets/bigscreenadmin.png';
import '../../App.css';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: ROUTES.ADMIN_DASHBOARD
    },
    {
      icon: FileText,
      label: 'Questionnaire',
      path: ROUTES.ADMIN_QUESTIONS
    },
    {
      icon: MessageSquare,
      label: 'Réponses',
      path: ROUTES.ADMIN_RESPONSES
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 admin-sidebar relative">
        <div className="p-6">
          <div className="flex flex-col items-center justify-center mb-8">
         <img 
  src={bigscreenLogo} 
  alt="Bigscreen Admin Logo" 
  className="w-45 h-45 object-contain m-0 p-0"
/>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-red-500/80 hover:text-white font-semibold w-full mt-2"
              title="Déconnexion"
              aria-label="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
