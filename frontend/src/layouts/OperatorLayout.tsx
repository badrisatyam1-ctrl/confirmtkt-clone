import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Bus, 
  MapPin, 
  CalendarDays, 
  Users,
  Car,
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Armchair,
  FileText
} from 'lucide-react';

const MENU_ITEMS = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', icon: LayoutDashboard, path: '/operator' },
      { name: 'Bookings', icon: Users, path: '/operator/bookings' },
      { name: 'Revenue', icon: Wallet, path: '/operator/revenue' }
    ]
  },
  {
    title: 'Fleet & Routes',
    items: [
      { name: 'Buses', icon: Bus, path: '/operator/buses' },
      { name: 'Routes', icon: MapPin, path: '/operator/routes' },
      { name: 'Trips', icon: CalendarDays, path: '/operator/trips' }
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Drivers', icon: Car, path: '/operator/drivers' },
      { name: 'Seat Management', icon: Armchair, path: '/operator/seats' }
    ]
  },
  {
    title: 'More',
    items: [
      { name: 'Notifications', icon: Bell, path: '/operator/notifications' },
      { name: 'Reports', icon: FileText, path: '/operator/reports' }
    ]
  }
];

export default function OperatorLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block flex flex-col`}>
        <div className="h-16 flex items-center px-6 bg-slate-950/50 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">OP</div>
            Operator Hub
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {MENU_ITEMS.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map(item => {
                  const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/operator');
                  
                  // Special check for overview
                  const isOverviewActive = item.path === '/operator' && location.pathname === '/operator';

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        (item.path === '/operator' ? isOverviewActive : isActive)
                          ? 'bg-amber-600/10 text-amber-500' 
                          : 'hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} className={(item.path === '/operator' ? isOverviewActive : isActive) ? 'text-amber-500' : 'text-slate-500'} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-500 w-full text-left text-slate-400">
            <LogOut size={18} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <Menu size={20} />
            </button>

            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-500 w-96">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search bookings, buses, routes..." 
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center font-bold text-sm">
                ST
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-slate-900 dark:text-white leading-none">SRS Travels</p>
                <p className="text-slate-500 text-xs">Operator</p>
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
