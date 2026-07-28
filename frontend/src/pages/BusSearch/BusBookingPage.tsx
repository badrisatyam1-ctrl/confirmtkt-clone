import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeatLayoutSelector from './SeatLayoutSelector';
import BoardingPointSelector from './BoardingPointSelector';

// Mock data for the trip and seat layout
const MOCK_TRIP_DETAIL = {
  id: 'trip-1',
  operator: 'RedBus Express',
  busType: 'Volvo Multi-Axle I-Shift B11R Sleeper (2+1)',
  departureTime: '18:00',
  arrivalTime: '08:00 (+1)',
  duration: '14h',
  origin: 'Delhi',
  destination: 'Manali',
  rating: '4.5',
  amenities: ['WIFI', 'WATER BOTTLE', 'BLANKET', 'CHARGING POINT', 'TRACK MY BUS'],
  baseFare: 1250,
};

const MOCK_LAYOUT = {
  lowerDeck: {
    rows: 6,
    columns: 3,
    seats: [
      { id: 's1', seatNumber: 'L1', row: 1, column: 1, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's2', seatNumber: 'L2', row: 1, column: 2, seatClass: 'SEATER', price: 850, isAvailable: false, deck: 'LOWER' },
      { id: 's3', seatNumber: 'L3', row: 1, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's4', seatNumber: 'L4', row: 2, column: 1, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's5', seatNumber: 'L5', row: 2, column: 2, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's6', seatNumber: 'L6', row: 2, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's7', seatNumber: 'L7', row: 3, column: 1, seatClass: 'SEATER', price: 850, isAvailable: false, deck: 'LOWER' },
      { id: 's8', seatNumber: 'L8', row: 3, column: 2, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's9', seatNumber: 'L9', row: 3, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's10', seatNumber: 'L10', row: 4, column: 1, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's11', seatNumber: 'L11', row: 4, column: 2, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's12', seatNumber: 'L12', row: 4, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's13', seatNumber: 'L13', row: 5, column: 1, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's14', seatNumber: 'L14', row: 5, column: 2, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's15', seatNumber: 'L15', row: 5, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's16', seatNumber: 'L16', row: 6, column: 1, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's17', seatNumber: 'L17', row: 6, column: 2, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
      { id: 's18', seatNumber: 'L18', row: 6, column: 3, seatClass: 'SEATER', price: 850, isAvailable: true, deck: 'LOWER' },
    ]
  },
  upperDeck: {
    rows: 6,
    columns: 3,
    seats: [
      { id: 'u1', seatNumber: 'U1', row: 1, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u2', seatNumber: 'U2', row: 1, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u3', seatNumber: 'U3', row: 2, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: false, deck: 'UPPER' },
      { id: 'u4', seatNumber: 'U4', row: 2, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u5', seatNumber: 'U5', row: 3, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u6', seatNumber: 'U6', row: 3, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: false, deck: 'UPPER' },
      { id: 'u7', seatNumber: 'U7', row: 4, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u8', seatNumber: 'U8', row: 4, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u9', seatNumber: 'U9', row: 5, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u10', seatNumber: 'U10', row: 5, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u11', seatNumber: 'U11', row: 6, column: 1, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u12', seatNumber: 'U12', row: 6, column: 2, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
      { id: 'u13', seatNumber: 'U13', row: 6, column: 3, seatClass: 'SLEEPER', price: 1150, isAvailable: true, deck: 'UPPER' },
    ]
  }
};



export default function BusBookingPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlOrigin = searchParams.get('origin');
  const urlDestination = searchParams.get('destination');

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [boardingId, setBoardingId] = useState('');
  const [droppingId, setDroppingId] = useState('');
  const [step, setStep] = useState<'seats' | 'points' | 'review'>('seats');

  // Use URL params for origin/destination, fallback to mock only if missing
  const trip = {
    ...MOCK_TRIP_DETAIL,
    origin: urlOrigin || MOCK_TRIP_DETAIL.origin,
    destination: urlDestination || MOCK_TRIP_DETAIL.destination,
  };

  const dynamicBoardingPoints = [
    { id: 'bp1', name: 'Main Bus Terminal', city: trip.origin, time: '18:00' },
    { id: 'bp2', name: 'City Center', city: trip.origin, time: '18:20' },
    { id: 'bp3', name: 'Highway Toll', city: trip.origin, time: '19:00' },
  ];

  const dynamicDroppingPoints = [
    { id: 'dp1', name: 'Highway Toll', city: trip.destination, time: '06:30' },
    { id: 'dp2', name: 'Private Bus Stand', city: trip.destination, time: '08:00' },
    { id: 'dp3', name: 'Main Bus Terminal', city: trip.destination, time: '08:15' },
  ];

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : prev.length < 6 ? [...prev, seatId] : prev
    );
  };

  const handlePointsSelect = (boarding: string, dropping: string) => {
    setBoardingId(boarding);
    setDroppingId(dropping);
  };

  const allSeats: any[] = [
    ...(MOCK_LAYOUT.lowerDeck?.seats || []),
    ...(MOCK_LAYOUT.upperDeck?.seats || []),
    ...((MOCK_LAYOUT as any).seats || [])
  ];
  const selectedSeatDetails = allSeats.filter((s: any) => selectedSeats.includes(s.id));
  const totalFare = selectedSeatDetails.reduce((sum: number, s: any) => sum + s.price, 0);

  const canProceedToPoints = selectedSeats.length > 0;
  const canProceedToReview = boardingId && droppingId;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Trip Summary Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{trip.operator}</h2>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded flex items-center gap-1 text-xs font-bold">
                  <Star size={12} fill="currentColor" /> {trip.rating}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{trip.busType}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="font-semibold">{trip.origin}</span>
                  <span className="text-slate-400">{trip.departureTime}</span>
                </div>
                <span className="text-slate-400">→</span>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin size={16} className="text-green-500" />
                  <span className="font-semibold">{trip.destination}</span>
                  <span className="text-slate-400">{trip.arrivalTime}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock size={14} />
                  <span>{trip.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-start">
              {trip.amenities.map(a => (
                <span key={a} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">{a}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step Indicators */}
        <div className="flex items-center gap-4 mb-8">
          {['Select Seats', 'Boarding & Dropping', 'Review'].map((label, idx) => {
            const stepMap = ['seats', 'points', 'review'] as const;
            const isActive = step === stepMap[idx];
            const isCompleted = stepMap.indexOf(step) > idx;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>{label}</span>
                {idx < 2 && <div className="w-8 h-px bg-slate-300 dark:bg-slate-700"></div>}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {step === 'seats' && (
              <div className="lg:col-span-2">
                <SeatLayoutSelector 
                  layout={MOCK_LAYOUT as any} 
                  selectedSeats={selectedSeats} 
                  onSeatSelect={handleSeatSelect} 
                />
              </div>
            )}
            {step === 'points' && (
              <BoardingPointSelector 
                boardingPoints={dynamicBoardingPoints}
                droppingPoints={dynamicDroppingPoints}
                onPointsSelect={handlePointsSelect}
              />
            )}
            {step === 'review' && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Review Your Selection</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <p className="text-slate-500 mb-1">Seats Selected</p>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">
                      {selectedSeatDetails.map(s => s.seatNumber).join(', ')}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <p className="text-slate-500 mb-1">Passengers</p>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">{selectedSeats.length}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <p className="text-slate-500 mb-1">Boarding</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {dynamicBoardingPoints.find((p: any) => p.id === boardingId)?.name}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <p className="text-slate-500 mb-1">Dropping</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {dynamicDroppingPoints.find((p: any) => p.id === droppingId)?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fare Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Fare Summary</h3>

              {selectedSeats.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">Select seats to see fare breakdown</p>
              ) : (
                <div className="space-y-3 text-sm mb-6">
                  {selectedSeatDetails.map((s: any) => (
                    <div key={s.id} className="flex justify-between items-center text-sm font-medium border border-slate-100 dark:border-slate-800 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <span>Seat {s.seatNumber} ({s.seatClass})</span>
                      <span>₹{s.price}</span>
                    </div>
                  ))}
                  <hr className="border-slate-100 dark:border-slate-800" />
                  <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{totalFare}</span>
                  </div>
                </div>
              )}

              {step === 'seats' && (
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl"
                  disabled={!canProceedToPoints}
                  onClick={() => setStep('points')}
                >
                  Continue <ArrowRight size={18} className="ml-2" />
                </Button>
              )}
              {step === 'points' && (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => setStep('seats')}>Back to Seats</Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl"
                    disabled={!canProceedToReview}
                    onClick={() => setStep('review')}
                  >
                    Continue <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              )}
              {step === 'review' && (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => setStep('points')}>Back</Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl"
                    onClick={() => navigate('/bus/booking/' + tripId)}
                  >
                    Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
