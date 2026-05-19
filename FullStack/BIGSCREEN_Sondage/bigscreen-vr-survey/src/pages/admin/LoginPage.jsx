// File: src/pages/admin/LoginPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../lib/constants';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import bigscreenLogo from '../../assets/bigscreenadmin.png';
import '../../App.css';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    document.title = "BIGS-ADMIN";
    if (isAuthenticated) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-purple-700/50 to-black" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-purple-400/20 blur-[80px]" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-purple-400/20 blur-[60px]" />
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />

      {/* Formulaire agrandi */}
      <div className="w-full max-w-xl relative z-10 mt-0" style={{ perspective: 1500 }}>
        <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-12 border border-white/[0.05] shadow-2xl overflow-hidden">
          {/* Logo dans le formulaire, très grand, sans marge */}
          <div className="flex justify-center items-center mb-2">
            <img
              src={bigscreenLogo}
              alt="Bigscreen Admin Logo"
              className="w-60 h-60 object-contain"
              style={{ margin: 0, padding: 0 }}
            />
          </div>
          {/* Subtle card inner patterns */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
              backgroundSize: '30px 30px'
            }}
          />
          {/* Header sans logo */}
          <div className="text-center space-y-1 mb-8">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mt-2">
              Admin Login
            </h1>
            <p className="text-white/60 text-base">
              Connectez-vous pour accéder à l'administration
            </p>
          </div>
          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {/* Email input */}
              <div className={`relative ${focusedInput === "username" ? 'z-10' : ''}`}>
                <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                  focusedInput === "username" ? 'text-white' : 'text-white/40'
                }`} />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput("username")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="E-Mail"
                  className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-white/10"
                  required
                />
                {/* Input highlight effect */}
                {focusedInput === "username" && (
                  <div className="absolute inset-0 bg-white/5 -z-10" />
                )}
              </div>
              {/* Password input */}
              <div className={`relative ${focusedInput === "password" ? 'z-10' : ''}`}>
                <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${
                  focusedInput === "password" ? 'text-white' : 'text-white/40'
                }`} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Mot de passe"
                  className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-white/10"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                  )}
                </div>
                {focusedInput === "password" && (
                  <div className="absolute inset-0 bg-white/5 -z-10" />
                )}
              </div>
            </div>
            {/* Error message */}
            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}
            {/* Login button */}
            <button
              type="submit"
              className="w-full relative group/button mt-5 bg-white text-black font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <span className="flex items-center justify-center gap-1 text-sm font-medium">
                  Se connecter
                  <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                </span>
              )}
            </button>
          </form>
          {/* Retour à l'accueil */}
          <div className="text-center mt-4">
            {/* <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
