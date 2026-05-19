import { Monitor } from 'lucide-react';
import BigscreenLogo from '../../assets/bigscreen.svg';

const Header = ({ title = "Bigscreen Survey", subtitle }) => {
  return (
    <header className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground py-8 px-4" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(8px)' }}>
      {/* Animated bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${24 + Math.random() * 32}px`,
              height: `${24 + Math.random() * 32}px`,
              opacity: 0.3 + Math.random() * 0.4,
              background: 'rgba(255,255,255,0.3)',
              position: 'absolute',
              bottom: '-60px',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center mb-4">
          {/* SVG logo as title with animation */}
          <img
            src={BigscreenLogo}
            alt="Bigscreen Logo"
            className="h-16 w-auto mb-2 animate-fade-in-up"
            style={{ display: 'block' }}
          />
        </div>
        {subtitle && (
          <p className="text-center text-lg opacity-90">{subtitle}</p>
        )}
      </div>
      {/* Animation styles */}
      <style>
        {`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
          }
          @keyframes bubble-up {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.7;
            }
            80% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-350px) scale(1.2);
              opacity: 0;
            }
          }
          .bubble {
            animation: bubble-up linear infinite;
            will-change: transform, opacity;
          }
        `}
      </style>
    </header>
  );
};

export default Header;

