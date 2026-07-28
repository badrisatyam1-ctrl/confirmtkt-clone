import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusFront, Train, Plane, MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CITIES, TRAIN_CITIES, AIRPORT_CITIES } from '@/constants/cities';

export default function SearchWidget() {
  const [activeTab, setActiveTab] = useState<'bus' | 'train' | 'flight'>('bus');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const navigate = useNavigate();

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCities = activeTab === 'train' ? TRAIN_CITIES 
                      : activeTab === 'flight' ? AIRPORT_CITIES 
                      : CITIES;

  const filteredOrigins = currentCities.filter(c => c.toLowerCase().includes(origin.toLowerCase()));
  const filteredDests = currentCities.filter(c => c.toLowerCase().includes(destination.toLowerCase()));

  const tabs = [
    { id: 'bus', label: 'Bus', icon: BusFront },
    { id: 'train', label: 'Train', icon: Train },
    { id: 'flight', label: 'Flight', icon: Plane },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-20 max-w-5xl mx-auto -mt-32 px-4"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-all ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                } ${index === 0 ? 'rounded-tl-2xl' : ''} ${index === tabs.length - 1 ? 'rounded-tr-2xl' : ''}`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{tab.label} Tickets</span>
              </button>
            );
          })}
        </div>

        {/* Form Area */}
        <div className="p-6 md:p-8 rounded-b-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            <div ref={originRef} className="space-y-2 md:col-span-1 border border-slate-200 dark:border-slate-700 rounded-xl p-3 relative hover:border-blue-500 transition-colors">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">From</label>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Origin City" 
                  value={origin}
                  onChange={(e) => { setOrigin(e.target.value); setShowOriginDropdown(true); }}
                  onFocus={() => setShowOriginDropdown(true)}
                  className="w-full bg-transparent border-none outline-none font-semibold text-slate-900 dark:text-white placeholder:font-normal" 
                />
              </div>
              
              {/* Autocomplete Dropdown */}
              {showOriginDropdown && origin && filteredOrigins.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  {filteredOrigins.map((city) => (
                    <button
                      key={city}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200 font-medium transition-colors"
                      onClick={() => {
                        setOrigin(city);
                        setShowOriginDropdown(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div ref={destRef} className="space-y-2 md:col-span-1 border border-slate-200 dark:border-slate-700 rounded-xl p-3 relative hover:border-blue-500 transition-colors">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">To</label>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Destination City" 
                  value={destination}
                  onChange={(e) => { setDestination(e.target.value); setShowDestDropdown(true); }}
                  onFocus={() => setShowDestDropdown(true)}
                  className="w-full bg-transparent border-none outline-none font-semibold text-slate-900 dark:text-white placeholder:font-normal" 
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showDestDropdown && destination && filteredDests.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  {filteredDests.map((city) => (
                    <button
                      key={city}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200 font-medium transition-colors"
                      onClick={() => {
                        setDestination(city);
                        setShowDestDropdown(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-1 border border-slate-200 dark:border-slate-700 rounded-xl p-3 relative hover:border-blue-500 transition-colors">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</label>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-slate-400" />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border-none outline-none font-semibold text-slate-900 dark:text-white" 
                />
              </div>
            </div>

            <Button 
              onClick={() => {
                const searchParams = new URLSearchParams();
                if (origin) searchParams.append('origin', origin);
                if (destination) searchParams.append('destination', destination);
                if (date) searchParams.append('date', date);
                
                const qs = searchParams.toString() ? `?${searchParams.toString()}` : '';
                
                if (activeTab === 'bus') navigate(`/bus/search${qs}`);
                if (activeTab === 'train') navigate(`/train/search${qs}`);
                if (activeTab === 'flight') navigate(`/flight/search${qs}`);
              }}
              disabled={!origin.trim() || !destination.trim()}
              className="h-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed disabled:shadow-none text-white rounded-xl shadow-lg shadow-blue-600/30 transition-transform active:scale-95 text-lg font-bold"
            >
              <Search className="mr-2" size={20} />
              Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
