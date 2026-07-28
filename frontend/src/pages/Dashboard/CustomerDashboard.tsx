import { useState } from 'react';
import { Calendar, MapPin, XCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialMockBookings = [
  {
    id: 'BKG-AB12',
    origin: 'Delhi',
    destination: 'Manali',
    date: '2026-07-26T18:00:00Z',
    operator: 'RedBus Express',
    status: 'CONFIRMED',
    amount: 1250,
    seats: ['L12']
  },
  {
    id: 'BKG-XY98',
    origin: 'Mumbai',
    destination: 'Goa',
    date: '2026-06-15T20:30:00Z',
    operator: 'VRL Travels',
    status: 'COMPLETED',
    amount: 2100,
    seats: ['U3', 'U4']
  }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'CANCELLED'>('UPCOMING');
  const [bookings, setBookings] = useState(initialMockBookings);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'UPCOMING') return b.status === 'CONFIRMED';
    if (activeTab === 'COMPLETED') return b.status === 'COMPLETED';
    return b.status === 'CANCELLED';
  });

  const handleDownloadTicket = (bookingId: string) => {
    // In a real app, this would fetch a PDF from the backend
    // For now, we simulate an E-Ticket by triggering the browser print dialog
    window.print();
  };

  const handleCancelTrip = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this trip? This action cannot be undone.')) {
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
      ));
      // Switch to cancelled tab to show the user it moved
      setActiveTab('CANCELLED');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Trips</h1>
          <p className="text-slate-500">Manage your upcoming journeys and view past travels.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
        {['UPCOMING', 'COMPLETED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 font-semibold text-sm transition-colors relative ${
              activeTab === tab 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No {activeTab.toLowerCase()} bookings found.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold text-slate-700 dark:text-slate-300">
                    {booking.id}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {booking.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {booking.origin} → {booking.destination}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{booking.operator}</p>
                
                <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    Seats: {booking.seats.join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                <div className="text-right mb-4">
                  <p className="text-sm text-slate-500">Total Fare</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{booking.amount}</p>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleDownloadTicket(booking.id)}
                  >
                    <Download size={16} /> E-Ticket
                  </Button>
                  {booking.status === 'CONFIRMED' && (
                    <Button 
                      variant="destructive" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleCancelTrip(booking.id)}
                    >
                      <XCircle size={16} /> Cancel Trip
                    </Button>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
