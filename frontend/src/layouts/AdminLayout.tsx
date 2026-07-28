import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  RefreshCcw, 
  Bus, 
  Plane, 
  Train, 
  Users, 
  ShieldCheck, 
  Ticket, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  FileText,
  BarChart3,
  Car,
  Megaphone
} from 'lucide-react';

const MENU_ITEMS = [
  {
    title: 'Analytics',
    items: [
      { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
      { name: 'Revenue', icon: Wallet, path: '/admin/revenue' },
      { name: 'Refunds', icon: RefreshCcw, path: '/admin/refunds' }
    ]
  },
  {
    title: 'Fleet & Operators',
    items: [
      { name: 'Buses', icon: Bus, path: '/admin/buses' },
      { name: 'Flights', icon: Plane, path: '/admin/flights' },
      { name: 'Trains', icon: Train, path: '/admin/trains' },
      { name: 'Drivers', icon: Car, path: '/admin/drivers' },
      { name: 'Operators KYC', icon: ShieldCheck, path: '/admin/operators' }
    ]
  },
  {
    title: 'CRM & Operations',
    items: [
      { name: 'Users', icon: Users, path: '/admin/users' },
      { name: 'Coupons & Offers', icon: Ticket, path: '/admin/coupons' },
      { name: 'Notifications', icon: Megaphone, path: '/admin/notifications' },
      { name: 'Support Tickets', icon: MessageSquare, path: '/admin/support' }
    ]
  },
  {
    title: 'Content & Reports',
    items: [
      { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
      { name: 'CMS', icon: FileText, path: '/admin/cms' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' }
    ]
  }
];

export default function AdminLayout() {
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">TB</div>
            TravelAdmin
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
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-600/10 text-blue-500' 
                          : 'hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} className={isActive ? 'text-blue-500' : 'text-slate-500'} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800 hover:text-white w-full text-left text-slate-400">
            <Settings size={18} />
            <span className="font-medium text-sm">Settings</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-500 w-full text-left text-slate-400 mt-1">
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

            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 w-96">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search bookings, users, PNR..." 
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
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                SA
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-slate-900 dark:text-white leading-none">Super Admin</p>
                <p className="text-slate-500 text-xs">admin@travel.com</p>
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
