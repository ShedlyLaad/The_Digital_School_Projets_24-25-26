import { Outlet } from 'react-router-dom';
import '../../App.css';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

