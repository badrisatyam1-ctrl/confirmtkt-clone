import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Map, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Map size={24} strokeWidth={2.5} />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
            TravelBooking
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Bus Tickets', 'Train Tickets', 'Flight Tickets', 'Offers'].map((item) => (
            <Link 
              key={item} 
              to="#" 
              className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90 hover:text-white'}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300' : 'hover:bg-white/20 text-white'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant={isScrolled ? 'outline' : 'secondary'} className={`rounded-full ${!isScrolled && 'bg-white/20 text-white hover:bg-white/30 border-0'}`}>
                  <User className="mr-2" size={16} />
                  {user?.firstName || 'Dashboard'}
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => logout()} className={`rounded-full px-3 ${!isScrolled && 'text-white hover:bg-white/20 hover:text-white'}`}>
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className={`font-semibold ${!isScrolled && 'text-white hover:bg-white/20 hover:text-white'}`}>
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-full px-6">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
