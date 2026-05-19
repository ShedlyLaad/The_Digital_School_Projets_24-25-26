import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { SurveyPage } from './pages/SurveyPage';
import { ResponsePage } from './pages/ResponsePage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { QuestionsPage } from './pages/admin/QuestionsPage';
import { ResponsesPage } from './pages/admin/ResponsesPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ROUTES } from './lib/constants';
import './App.css';
import { AboutUsPage } from './pages/AboutUsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.SURVEY} element={<SurveyPage />} />
          <Route path={ROUTES.RESPONSES} element={<ResponsePage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
          {/* Ajoute la route Projects si tu as un composant ProjectsPage */}
          {/* <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} /> */}
        </Route>

        {/* Route de connexion admin */}
        <Route path={ROUTES.ADMIN_LOGIN} element={<LoginPage />} />

        {/* Routes admin protégées */}
        <Route 
          path={ROUTES.ADMIN} 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="responses" element={<ResponsesPage />} />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
