import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Calendar, Users, MapPin, ArrowRightLeft, Briefcase, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_FLIGHTS = [
  {
    id: 'trip-f101',
    airline: 'IndiGo',
    flightNumber: '6E-201',
    aircraft: 'Airbus A320',
    departureTime: '10:15',
    arrivalTime: '12:30',
    duration: '2h 15m',
    origin: 'DEL',
    destination: 'BOM',
    stops: 'Non-stop',
    baseFare: 4850,
    baggage: '15 kg Cabin',
    meals: 'Paid'
  },
  {
    id: 'trip-f102',
    airline: 'Vistara',
    flightNumber: 'UK-993',
    aircraft: 'Boeing 737',
    departureTime: '14:00',
    arrivalTime: '16:05',
    duration: '2h 05m',
    origin: 'DEL',
    destination: 'BOM',
    stops: 'Non-stop',
    baseFare: 6200,
    baggage: '15 kg Cabin',
    meals: 'Free'
  }
];

export default function FlightSearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [tripType, setTripType] = useState<'ONE_WAY' | 'ROUND_TRIP'>('ONE_WAY');
  
  // State for search form
  const [origin, setOrigin] = useState(searchParams.get('origin') || 'New Delhi (DEL)');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'Mumbai (BOM)');
  const [departDate, setDepartDate] = useState(searchParams.get('date') || '2026-07-26');
  const [returnDate, setReturnDate] = useState('2026-07-28');
  const [passengers, setPassengers] = useState('1 Adult, Economy');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      
      {/* Search Header */}
      <div className="bg-slate-900 text-white pb-16 pt-8 shadow-md">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={tripType === 'ONE_WAY'} onChange={() => setTripType('ONE_WAY')} className="accent-blue-500 w-4 h-4" />
              <span>One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={tripType === 'ROUND_TRIP'} onChange={() => setTripType('ROUND_TRIP')} className="accent-blue-500 w-4 h-4" />
              <span>Round Trip</span>
            </label>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-xl">
            
            <div className="flex-1 flex gap-2 relative">
              <div className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-bold block mb-1">FROM</span>
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-transparent text-slate-900 dark:text-white font-bold outline-none" />
              </div>
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-blue-600 shadow-sm z-10 hover:bg-slate-100">
                <ArrowRightLeft size={14} />
              </button>
              <div className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 pl-6">
                <span className="text-xs text-slate-500 font-bold block mb-1">TO</span>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-transparent text-slate-900 dark:text-white font-bold outline-none" />
              </div>
            </div>

            <div className="flex-1 flex gap-2">
              <div className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-bold block mb-1">DEPART</span>
                <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} className="w-full bg-transparent text-slate-900 dark:text-white font-bold outline-none" />
              </div>
              
              {tripType === 'ROUND_TRIP' && (
                <div className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 font-bold block mb-1">RETURN</span>
                  <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full bg-transparent text-slate-900 dark:text-white font-bold outline-none" />
                </div>
              )}

              <div className="flex-1 border rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 font-bold block mb-1">PASSENGERS & CLASS</span>
                <input type="text" value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full bg-transparent text-slate-900 dark:text-white font-bold outline-none" />
              </div>
            </div>

            <Button className="h-auto px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="container mx-auto px-4 max-w-6xl mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">Stops</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-slate-600 dark:text-slate-400">Non-Stop</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-slate-600 dark:text-slate-400">1 Stop</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">Airlines</h4>
              <div className="space-y-2">
                {['IndiGo', 'Vistara', 'Air India', 'SpiceJet'].map(airline => (
                  <label key={airline} className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                    <span className="text-slate-600 dark:text-slate-400">{airline}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flight List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Flights from {origin.split(' ')[0]} to {destination.split(' ')[0]}</h2>
            <span className="text-slate-500 text-sm">Showing {MOCK_FLIGHTS.length} results</span>
          </div>

          {MOCK_FLIGHTS.map(flight => (
            <motion.div 
              key={flight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* Airline Info */}
                <div className="w-full md:w-1/4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-blue-600">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{flight.airline}</h3>
                    <p className="text-xs text-slate-500 font-mono">{flight.flightNumber}</p>
                  </div>
                </div>

                {/* Timing & Route */}
                <div className="w-full md:w-2/4 flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{flight.departureTime}</p>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{flight.origin}</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center px-4">
                    <span className="text-xs text-slate-500 font-medium mb-1">{flight.duration}</span>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-px bg-slate-300 dark:bg-slate-700 absolute"></div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-white dark:bg-slate-900 px-2 relative z-10">{flight.stops}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{flight.arrivalTime}</p>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{flight.destination}</p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="w-full md:w-1/4 flex flex-col md:items-end justify-center gap-2 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{flight.baseFare.toLocaleString()}</p>
                  <Button 
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    onClick={() => navigate(`/flight/checkout/${flight.id}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1">
                  <Briefcase size={14} className="text-slate-400" /> {flight.baggage}
                </div>
                <div className="flex items-center gap-1">
                  <Info size={14} className="text-slate-400" /> {flight.meals} Meals
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  Partially Refundable
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
