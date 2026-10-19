import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  Sun, Moon, User, LogOut, ChevronDown, 
  Plane, Bus, Train, Ticket, Compass, HelpCircle,
  Clock, ShieldCheck, Zap
} from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'TRAINS', path: '/train/search', icon: Train },
    { label: 'BUSES', path: '/bus/search', icon: Bus },
    { label: 'FLIGHTS', path: '/flight/search', icon: Plane },
    { label: 'PNR STATUS', path: '/pnr-status', icon: Ticket },
    { label: 'MY TRIPS', path: '/dashboard', icon: Compass },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        
        {/* Unique Original Brand: RailSwift */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Rail<span className="text-emerald-600 dark:text-emerald-400">Swift</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
              Smart Travel Booking
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.label} 
                to={item.path} 
                className={`text-xs font-bold tracking-wider transition-colors py-1 ${
                  isActive 
                    ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* MORE Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMoreDropdown(prev => !prev)}
              className="flex items-center gap-1 text-xs font-bold tracking-wider text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1"
            >
              MORE <ChevronDown size={14} className={`transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showMoreDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <Link
                  to="/train/search"
                  onClick={() => setShowMoreDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Clock size={16} className="text-emerald-600" />
                  Live Running Status
                </Link>
                <Link
                  to="/pnr-status"
                  onClick={() => setShowMoreDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Waitlist Predictor
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                <a
                  href="#support"
                  onClick={() => setShowMoreDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <HelpCircle size={16} className="text-emerald-600" />
                  24x7 Customer Support
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="rounded-full border-slate-200 dark:border-slate-700">
                  <User className="mr-1.5" size={15} />
                  {user?.firstName || 'My Account'}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()} className="rounded-full px-2.5 text-slate-500">
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-slate-700 dark:text-slate-200">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-5 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
