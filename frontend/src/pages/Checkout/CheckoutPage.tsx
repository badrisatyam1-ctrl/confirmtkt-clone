import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mocked state from prior steps (search -> seat selection)
  const bookingState = {
    tripId: 'trip-1',
    seats: [
      { id: 's1', number: 'L12', fare: 1250 },
      { id: 's2', number: 'L13', fare: 1250 }
    ],
    boarding: 'Kashmere Gate, Delhi (18:00)',
    dropping: 'Private Bus Stand, Manali (08:00)',
  };

  const baseTotal = bookingState.seats.reduce((sum, seat) => sum + seat.fare, 0);
  const taxes = baseTotal * 0.18;
  const finalTotal = baseTotal + taxes - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRSTBUS') {
      setDiscount(500);
    } else {
      alert('Invalid Coupon');
      setDiscount(0);
    }
  };

  const handleProceedToPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Navigate to simulated payment screen
      navigate('/payment');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Passenger Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Passengers */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Who is traveling?</h2>
              
              {bookingState.seats.map((seat, index) => (
                <div key={seat.id} className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:mb-0 last:pb-0">
                  <h3 className="font-semibold text-sm text-slate-500 mb-4">Passenger {index + 1} (Seat {seat.number})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Age</Label>
                      <Input type="number" placeholder="25" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:focus:ring-slate-300">
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h2>
              <p className="text-sm text-slate-500 mb-4">Your ticket will be sent to these details.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input type="tel" placeholder="+91 9876543210" />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Fare Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Fare Summary</h2>
              
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Base Fare ({bookingState.seats.length} Seats)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{baseTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{taxes.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                
                <hr className="border-slate-100 dark:border-slate-800" />
                
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 mb-8 relative">
                <Input 
                  placeholder="Enter Coupon Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pr-20 uppercase font-mono"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Apply
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                <ShieldCheck size={16} className="text-green-500 flex-shrink-0" />
                <span>Safe and secure payments. 100% money-back guarantee for operator cancellations.</span>
              </div>

              <Button 
                onClick={handleProceedToPayment}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2"
              >
                {isLoading ? 'Processing...' : 'Proceed to Pay'} <ArrowRight size={20} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
