import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plane, Users, Utensils, Briefcase, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FlightSeatSelector from './FlightSeatSelector';

export default function FlightCheckoutPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Passengers, 2: Addons & Seats

  const [passengers, setPassengers] = useState([{ id: 1, firstName: '', lastName: '', gender: 'MALE', passport: '' }]);
  const [selectedMeals, setSelectedMeals] = useState<Record<number, string>>({});
  const [selectedBaggage, setSelectedBaggage] = useState<Record<number, string>>({});
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseFare = 4850;
  const convenienceFee = 350;
  
  // Calculate Addons
  const mealCost = Object.values(selectedMeals).length * 350;
  const baggageCost = Object.values(selectedBaggage).length * 1500;
  // Simplified seat pricing logic based on seat ids
  const seatCost = selectedSeats.reduce((acc, seat) => {
    if (seat.startsWith('1') || seat.startsWith('2') || seat.startsWith('3')) return acc + 500;
    if (seat.startsWith('10') || seat.startsWith('11')) return acc + 800;
    return acc + 150;
  }, 0);

  const totalAmount = (baseFare * passengers.length) + mealCost + baggageCost + seatCost + convenienceFee;

  const addPassenger = () => setPassengers([...passengers, { id: Date.now(), firstName: '', lastName: '', gender: 'MALE', passport: '' }]);
  const removePassenger = (id: number) => setPassengers(passengers.filter(p => p.id !== id));

  const handleProceedToPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/payment', { state: { amount: totalAmount, module: 'FLIGHT' } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Flight Summary Header */}
          <div className="bg-blue-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 font-bold mb-1">
                <Plane size={20} className="rotate-45" /> New Delhi (DEL) → Mumbai (BOM)
              </div>
              <p className="text-blue-100 text-sm">Sun, 26 Jul 2026 | 10:15 - 12:30 | 6E-201</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Partially Refundable</span>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Users size={20} /> Passenger Details
              </h2>
              
              {passengers.map((p, index) => (
                <div key={p.id} className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Adult {index + 1}</h3>
                    {index > 0 && <button onClick={() => removePassenger(p.id)} className="text-red-500 text-xs font-bold">Remove</button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="As per passport/ID" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="As per passport/ID" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-slate-950 dark:border-slate-800">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Passport/ID (Optional for Domestic)</Label>
                      <Input placeholder="Document Number" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 border-dashed" onClick={addPassenger}>+ Add Adult</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              {/* Addons Section */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <Briefcase size={20} /> Baggage & Meals
                </h2>
                
                {passengers.map((p, idx) => (
                  <div key={idx} className="mb-4 p-4 border border-slate-100 dark:border-slate-800 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Passenger {idx + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2 text-slate-500 mb-2"><Utensils size={14}/> Add Meal (+₹350)</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm"
                          onChange={(e) => setSelectedMeals({ ...selectedMeals, [idx]: e.target.value })}
                        >
                          <option value="">No Meal</option>
                          <option value="veg">Veg Sandwich + Juice</option>
                          <option value="nonveg">Chicken Wrap + Coffee</option>
                        </select>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 text-slate-500 mb-2"><Briefcase size={14}/> Extra Baggage (+₹1500)</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm"
                          onChange={(e) => setSelectedBaggage({ ...selectedBaggage, [idx]: e.target.value })}
                        >
                          <option value="">Standard (15kg Check-in)</option>
                          <option value="plus5">Extra 5 KG</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seat Map */}
              <FlightSeatSelector 
                passengers={passengers.length} 
                onSeatsSelected={(seats) => setSelectedSeats(seats)} 
              />
            </div>
          )}

        </div>

        {/* Right Sidebar: Fare Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Fare Summary</h2>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex justify-between">
                <span>Base Fare ({passengers.length} Adult)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{baseFare * passengers.length}</span>
              </div>
              {mealCost > 0 && (
                <div className="flex justify-between text-blue-600">
                  <span>Meals Added</span>
                  <span className="font-semibold">₹{mealCost}</span>
                </div>
              )}
              {baggageCost > 0 && (
                <div className="flex justify-between text-blue-600">
                  <span>Extra Baggage</span>
                  <span className="font-semibold">₹{baggageCost}</span>
                </div>
              )}
              {seatCost > 0 && (
                <div className="flex justify-between text-blue-600">
                  <span>Seat Selection</span>
                  <span className="font-semibold">₹{seatCost}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & Convenience Fee</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{convenienceFee}</span>
              </div>
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {step === 1 ? (
              <Button 
                onClick={() => setStep(2)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg rounded-xl"
              >
                Continue to Seats & Addons
              </Button>
            ) : (
              <Button 
                onClick={handleProceedToPayment}
                disabled={isLoading || selectedSeats.length < passengers.length}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2"
              >
                {isLoading ? 'Processing...' : 'Proceed to Pay'} <ArrowRight size={20} />
              </Button>
            )}
            
            {step === 2 && selectedSeats.length < passengers.length && (
              <p className="text-red-500 text-xs text-center mt-2">Please select {passengers.length} seats to proceed.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
