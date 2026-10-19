import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Train, Bus, Plane, Calendar, ArrowLeftRight, Search, 
  MapPin, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CITIES, TRAIN_CITIES, AIRPORT_CITIES } from '@/constants/cities';

export default function SearchWidget() {
  const [activeTab, setActiveTab] = useState<'train' | 'bus' | 'flight'>('train');
  const [origin, setOrigin] = useState('NDLS - New Delhi');
  const [destination, setDestination] = useState('MMCT - Mumbai Central');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(true);

  const navigate = useNavigate();
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

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

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleDateQuickSelect = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    setDate(target.toISOString().split('T')[0]);
  };

  const formattedDisplayDate = () => {
    if (!date) return 'Select Date';
    const d = new Date(date + 'T00:00:00');
    return d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (origin) searchParams.append('origin', origin.split(' - ')[0] || origin);
    if (destination) searchParams.append('destination', destination.split(' - ')[0] || destination);
    if (date) searchParams.append('date', date);
    
    const qs = searchParams.toString() ? `?${searchParams.toString()}` : '';
    if (activeTab === 'train') navigate(`/train/search${qs}`);
    else if (activeTab === 'bus') navigate(`/bus/search${qs}`);
    else if (activeTab === 'flight') navigate(`/flight/search${qs}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 z-20">
      
      {/* Search Mode Tabs */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {[
          { id: 'train', label: 'Trains', icon: Train },
          { id: 'bus', label: 'Buses', icon: Bus },
          { id: 'flight', label: 'Flights', icon: Plane },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'train') {
                  setOrigin('NDLS - New Delhi');
                  setDestination('MMCT - Mumbai Central');
                } else if (tab.id === 'bus') {
                  setOrigin('Delhi');
                  setDestination('Manali');
                } else {
                  setOrigin('Delhi (DEL)');
                  setDestination('Mumbai (BOM)');
                }
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Confirmtkt Search Bar Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 md:p-3">
        <div className="flex flex-col lg:flex-row items-stretch gap-1">
          
          {/* Segment 1: FROM */}
          <div 
            ref={originRef} 
            className="flex-1 relative flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer group"
            onClick={() => setShowOriginDropdown(true)}
          >
            <div className="mr-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg group-hover:scale-105 transition-transform">
              {activeTab === 'train' ? <Train size={22} /> : activeTab === 'bus' ? <Bus size={22} /> : <Plane size={22} />}
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">From</span>
              <input
                type="text"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  setShowOriginDropdown(true);
                }}
                onFocus={() => setShowOriginDropdown(true)}
                placeholder="Enter Origin"
                className="w-full bg-transparent border-0 p-0 text-sm md:text-base font-bold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 truncate"
              />
            </div>

            {/* Origin Dropdown */}
            {showOriginDropdown && filteredOrigins.length > 0 && (
              <div className="absolute top-full left-0 w-80 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {filteredOrigins.slice(0, 15).map((city) => (
                  <button
                    key={city}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-50 dark:border-slate-700/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrigin(city);
                      setShowOriginDropdown(false);
                    }}
                  >
                    <MapPin size={14} className="text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center -my-2 lg:my-0 lg:-mx-2 z-10">
            <button
              onClick={handleSwap}
              type="button"
              className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:rotate-180 hover:border-emerald-500 transition-all duration-300 active:scale-90"
              title="Swap stations"
            >
              <ArrowLeftRight size={15} />
            </button>
          </div>

          {/* Segment 2: TO */}
          <div 
            ref={destRef} 
            className="flex-1 relative flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer group"
            onClick={() => setShowDestDropdown(true)}
          >
            <div className="mr-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg group-hover:scale-105 transition-transform">
              {activeTab === 'train' ? <Train size={22} /> : activeTab === 'bus' ? <Bus size={22} /> : <Plane size={22} />}
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">To</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                placeholder="Enter Destination"
                className="w-full bg-transparent border-0 p-0 text-sm md:text-base font-bold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 truncate"
              />
            </div>

            {/* Destination Dropdown */}
            {showDestDropdown && filteredDests.length > 0 && (
              <div className="absolute top-full left-0 w-80 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {filteredDests.slice(0, 15).map((city) => (
                  <button
                    key={city}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-50 dark:border-slate-700/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDestination(city);
                      setShowDestDropdown(false);
                    }}
                  >
                    <MapPin size={14} className="text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Segment 3: DEPARTURE DATE */}
          <div className="flex-1 flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors relative group">
            <div className="mr-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg group-hover:scale-105 transition-transform">
              <Calendar size={22} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Departure Date</span>
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                  {formattedDisplayDate()}
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                />
              </div>
            </div>
            {/* Quick date picks */}
            <div className="hidden sm:flex items-center gap-1 ml-2 z-20">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDateQuickSelect(0); }}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-700 font-semibold"
              >
                Today
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDateQuickSelect(1); }}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-700 font-semibold"
              >
                Tomorrow
              </button>
            </div>
          </div>

          {/* Segment 4: SEARCH BUTTON */}
          <div className="p-1 flex items-center">
            <Button
              onClick={handleSearch}
              className="w-full lg:w-auto h-full min-h-[52px] px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
            >
              SEARCH
            </Button>
          </div>

        </div>
      </div>

      {/* Free Cancellation and Quick Options Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400 gap-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={freeCancellation}
            onChange={() => setFreeCancellation(!freeCancellation)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <CheckCircle2 size={13} className="text-emerald-600" /> Free Cancellation with Instant Full Refund
          </span>
        </label>
        <div className="flex items-center gap-4">
          <span className="hover:text-emerald-600 cursor-pointer font-medium" onClick={() => navigate('/train/search?origin=NDLS&destination=BSB')}>
            Delhi → Varanasi
          </span>
          <span className="hover:text-emerald-600 cursor-pointer font-medium" onClick={() => navigate('/train/search?origin=MMCT&destination=ADI')}>
            Mumbai → Ahmedabad
          </span>
          <span className="hover:text-emerald-600 cursor-pointer font-medium" onClick={() => navigate('/train/search?origin=SBC&destination=MAS')}>
            Bengaluru → Chennai
          </span>
        </div>
      </div>

    </div>
  );
}
