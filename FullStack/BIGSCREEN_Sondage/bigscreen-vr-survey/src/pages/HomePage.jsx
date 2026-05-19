import '../App.css';
import HeroSection from './_components/HeroSection';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants';
import { NavBar } from './_components/Navbar';
import { Home, User } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", url: ROUTES.HOME, icon: Home },
    { name: "About Us", url: ROUTES.ABOUT_US, icon: User },
    { name: "Commencer le sondage", url: ROUTES.SURVEY, icon: null },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Navbar en haut */}
      <NavBar
        items={navItems}
        className="top-0 left-1/2 -translate-x-1/2 z-50 pt-6"
      />

      <HeroSection
        title1="Bigscreen VR Survey"
        title2="Digital Vision"
        badge="Founded in 2014, we are a global team of developers passionate about virtual reality."
      />

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        {/* <Link
          to={ROUTES.ADMIN_LOGIN}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Accès administrateur
        </Link> */}
      </div>
    </div>
  );
}

