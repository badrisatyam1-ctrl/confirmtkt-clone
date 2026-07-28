import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Check, Bus, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data since API is disconnected for UI building
const MOCK_TRIPS = [
  {
    id: 'trip-1',
    operator: 'Zingbus',
    busType: 'Volvo A/C Semi Sleeper (2+2)',
    departureTime: '2026-07-26T05:30:00.000Z',
    arrivalTime: '2026-07-26T14:30:00.000Z',
    duration: 540,
    baseFare: 899,
    availableSeats: 15,
    rating: '4.6',
    totalReviews: 240,
    amenities: ['WIFI', 'WATER_BOTTLE', 'CHARGING_POINT', 'BLANKET']
  },
  {
    id: 'trip-2',
    operator: 'IntrCity SmartBus',
    busType: 'Bharat Benz A/C Sleeper (2+1)',
    departureTime: '2026-07-26T21:00:00.000Z',
    arrivalTime: '2026-07-27T08:00:00.000Z',
    duration: 660,
    baseFare: 1450,
    availableSeats: 4,
    rating: '4.8',
    totalReviews: 890,
    amenities: ['WIFI', 'WATER_BOTTLE', 'BLANKET', 'CHARGING_POINT', 'TRACK MY BUS', 'TOILET']
  },
  {
    id: 'trip-3',
    operator: 'VRL Travels',
    busType: 'Scania AC Multi Axle Sleeper (2+1)',
    departureTime: '2026-07-26T22:30:00.000Z',
    arrivalTime: '2026-07-27T09:30:00.000Z',
    duration: 660,
    baseFare: 1650,
    availableSeats: 8,
    rating: '4.4',
    totalReviews: 450,
    amenities: ['WIFI', 'WATER_BOTTLE', 'CHARGING_POINT', 'TRACK MY BUS']
  },
  {
    id: 'trip-4',
    operator: 'SRS Travels',
    busType: 'Non-AC Seater (2+2)',
    departureTime: '2026-07-26T14:00:00.000Z',
    arrivalTime: '2026-07-26T23:00:00.000Z',
    duration: 540,
    baseFare: 450,
    availableSeats: 25,
    rating: '3.8',
    totalReviews: 120,
    amenities: []
  },
  {
    id: 'trip-5',
    operator: 'Orange Tours',
    busType: 'Volvo A/C Sleeper (2+1)',
    departureTime: '2026-07-26T19:30:00.000Z',
    arrivalTime: '2026-07-27T06:30:00.000Z',
    duration: 660,
    baseFare: 1800,
    availableSeats: 2,
    rating: '4.9',
    totalReviews: 1250,
    amenities: ['WIFI', 'WATER_BOTTLE', 'BLANKET', 'CHARGING_POINT', 'TRACK MY BUS']
  },
  {
    id: 'trip-6',
    operator: 'NueGo',
    busType: 'Electric A/C Seater (2+2)',
    departureTime: '2026-07-26T08:00:00.000Z',
    arrivalTime: '2026-07-26T13:30:00.000Z',
    duration: 330,
    baseFare: 750,
    availableSeats: 30,
    rating: '4.5',
    totalReviews: 320,
    amenities: ['WIFI', 'CHARGING_POINT', 'WATER_BOTTLE']
  },
  {
    id: 'trip-7',
    operator: 'RSRTC (State Transport)',
    busType: 'Non-AC Sleeper (2+1)',
    departureTime: '2026-07-26T23:15:00.000Z',
    arrivalTime: '2026-07-27T10:15:00.000Z',
    duration: 660,
    baseFare: 650,
    availableSeats: 12,
    rating: '3.5',
    totalReviews: 80,
    amenities: []
  },
  {
    id: 'trip-8',
    operator: 'Kallada Travels',
    busType: 'A/C Sleeper (2+1)',
    departureTime: '2026-07-26T17:45:00.000Z',
    arrivalTime: '2026-07-27T04:30:00.000Z',
    duration: 645,
    baseFare: 1350,
    availableSeats: 9,
    rating: '4.1',
    totalReviews: 210,
    amenities: ['BLANKET', 'WATER_BOTTLE', 'CHARGING_POINT']
  }
];

export default function BusSearchPage() {
  const [trips, setTrips] = useState(MOCK_TRIPS);
  const [filters, setFilters] = useState({
    ac: false,
    sleeper: false,
    seater: false,
  });
  const [timeFilters, setTimeFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price_asc');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin') || 'Delhi';
  const destination = searchParams.get('destination') || 'Manali';
  const dateParam = searchParams.get('date');
  const dateDisplay = dateParam ? new Date(dateParam).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '26 Jul, 2026';
  
  const handleBook = (tripId: string) => {
    const qs = new URLSearchParams();
    if (origin) qs.set('origin', origin);
    if (destination) qs.set('destination', destination);
    if (dateParam) qs.set('date', dateParam);
    navigate(`/bus/select/${tripId}?${qs.toString()}`);
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTimeFilter = (time: string) => {
    setTimeFilters(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  // Format date nicely
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const displayedTrips = trips.filter(trip => {
    const typeLower = trip.busType.toLowerCase();
    const isAc = typeLower.includes('a/c') || typeLower.includes('ac');
    const isSleeper = typeLower.includes('sleeper');
    const isSeater = typeLower.includes('seater');

    let typePass = true;
    if (filters.ac || filters.sleeper || filters.seater) {
       // If any filter is checked, it must meet ALL checked conditions (AND logic)
       if (filters.ac && !isAc) typePass = false;
       if (filters.sleeper && !isSleeper) typePass = false;
       if (filters.seater && !isSeater) typePass = false;
    }

    let timePass = true;
    if (timeFilters.length > 0) {
      const hour = new Date(trip.departureTime).getUTCHours();
      timePass = timeFilters.some(time => {
        if (time === 'before_6' && hour < 6) return true;
        if (time === '6_12' && hour >= 6 && hour < 12) return true;
        if (time === '12_18' && hour >= 12 && hour < 18) return true;
        if (time === 'after_18' && hour >= 18) return true;
        return false;
      });
    }

    return typePass && timePass;
  });

  const sortedTrips = [...displayedTrips].sort((a, b) => {
    if (sortBy === 'price_asc') return a.baseFare - b.baseFare;
    if (sortBy === 'price_desc') return b.baseFare - a.baseFare;
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Search Header Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">{origin} <span className="text-slate-400 mx-2">→</span> {destination}</h1>
            <span className="text-slate-500 dark:text-slate-400">|</span>
            <p className="text-slate-600 dark:text-slate-300 font-medium">{dateDisplay}</p>
          </div>
          <Button variant="outline">Modify Search</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-slate-500" />
                <h3 className="font-bold text-slate-800 dark:text-white">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bus Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.ac} onChange={() => toggleFilter('ac')} className="rounded border-slate-300" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">AC</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.sleeper} onChange={() => toggleFilter('sleeper')} className="rounded border-slate-300" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Sleeper</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.seater} onChange={() => toggleFilter('seater')} className="rounded border-slate-300" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Seater</span>
                    </label>
                  </div>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Departure Time</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => toggleTimeFilter('before_6')}
                      className={`py-2 px-3 border rounded-lg text-xs font-medium transition-colors ${timeFilters.includes('before_6') ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      Before 6 AM
                    </button>
                    <button 
                      onClick={() => toggleTimeFilter('6_12')}
                      className={`py-2 px-3 border rounded-lg text-xs font-medium transition-colors ${timeFilters.includes('6_12') ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      6 AM - 12 PM
                    </button>
                    <button 
                      onClick={() => toggleTimeFilter('12_18')}
                      className={`py-2 px-3 border rounded-lg text-xs font-medium transition-colors ${timeFilters.includes('12_18') ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      12 PM - 6 PM
                    </button>
                    <button 
                      onClick={() => toggleTimeFilter('after_18')}
                      className={`py-2 px-3 border rounded-lg text-xs font-medium transition-colors ${timeFilters.includes('after_18') ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      After 6 PM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate-600 dark:text-slate-400 font-medium">{displayedTrips.length} Buses found</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 text-sm outline-none cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="duration">Duration: Shortest</option>
                  <option value="rating">Rating: Highest</option>
                </select>
              </div>
            </div>

            {sortedTrips.map((trip) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{trip.operator}</h3>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded flex items-center gap-1 text-xs font-bold">
                        ★ {trip.rating}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{trip.busType}</p>
                    
                      <div>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">{formatTime(trip.departureTime)}</p>
                        <p className="text-xs text-slate-500">{origin}</p>
                      </div>
                      
                      <div className="flex flex-col items-center px-4">
                        <p className="text-xs text-slate-400 mb-1">{Math.floor(trip.duration / 60)}h {trip.duration % 60}m</p>
                        <div className="w-16 h-px bg-slate-300 dark:bg-slate-700 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400">→</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">{formatTime(trip.arrivalTime)}</p>
                        <p className="text-xs text-slate-500 text-right">{destination}</p>
                      </div>
                  </div>

                  {/* Right: Price & Action */}
                  <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[150px]">
                    <div className="text-right mb-4 md:mb-0">
                      <p className="text-xs text-slate-500 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{trip.baseFare}</p>
                    </div>
                    
                    <div className="w-full">
                      <p className="text-xs text-center text-orange-600 dark:text-orange-400 font-medium mb-2">{trip.availableSeats} seats left</p>
                      <Button 
                        onClick={() => handleBook(trip.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      >
                        Select Seats
                      </Button>
                    </div>
                  </div>

                </div>
                
                {/* Amenities */}
                {trip.amenities.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 text-xs text-slate-500">
                    {trip.amenities.map(amenity => (
                      <span key={amenity} className="flex items-center gap-1">
                        <Check size={14} className="text-green-500" /> {amenity.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
