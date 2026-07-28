import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Train, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TrainCheckoutPage() {
  const { tripId } = useParams();
  const [searchParams] = useSearchParams();
  const seatClass = searchParams.get('class') || '3A';
  const navigate = useNavigate();
  
  const [passengers, setPassengers] = useState([{ id: 1, firstName: '', lastName: '', age: '', gender: 'MALE', berthPref: 'NO_PREF' }]);
  const [isLoading, setIsLoading] = useState(false);

  const baseFare = 2150; // Mock fare
  const totalAmount = baseFare * passengers.length;

  const addPassenger = () => {
    if (passengers.length >= 6) return alert("Maximum 6 passengers allowed per PNR");
    setPassengers([...passengers, { id: Date.now(), firstName: '', lastName: '', age: '', gender: 'MALE', berthPref: 'NO_PREF' }]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length === 1) return;
    setPassengers(passengers.filter(p => p.id !== id));
  };

  const handleProceed = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/payment', { state: { amount: totalAmount, module: 'TRAIN' } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8 flex items-start gap-4">
          <Info className="text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-100">Auto-Upgradation</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">By proceeding, you agree to the auto-upgradation scheme. Coach and berth numbers will be allotted upon chart preparation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Passenger Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Passenger Details</h2>
                <span className="text-sm text-slate-500">{passengers.length}/6 Passengers</span>
              </div>
              
              {passengers.map((p, index) => (
                <div key={p.id} className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm text-slate-500">Passenger {index + 1}</h3>
                    {index > 0 && (
                      <button onClick={() => removePassenger(p.id)} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Full Name</Label>
                      <Input placeholder="As per Govt ID" />
                    </div>
                    <div className="space-y-2">
                      <Label>Age</Label>
                      <Input type="number" placeholder="Years" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-slate-950 dark:border-slate-800">
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Berth Preference</Label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-slate-950 dark:border-slate-800">
                        <option value="NO_PREF">No Preference</option>
                        <option value="LOWER">Lower Berth</option>
                        <option value="MIDDLE">Middle Berth</option>
                        <option value="UPPER">Upper Berth</option>
                        <option value="SIDE_LOWER">Side Lower</option>
                        <option value="SIDE_UPPER">Side Upper</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4" onClick={addPassenger}>
                + Add Passenger
              </Button>
            </div>
          </div>

          {/* Fare Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Fare Summary</h2>
              
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Train size={18} className="text-slate-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Rajdhani Express (12951)</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Class: <strong className="text-slate-900 dark:text-white">{seatClass}</strong></span>
                  <span>Quota: <strong className="text-slate-900 dark:text-white">GN</strong></span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex justify-between">
                  <span>Ticket Fare ({passengers.length} x ₹{baseFare})</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹30</span>
                </div>
                <hr className="border-slate-100 dark:border-slate-800" />
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white">
                  <span>Total Amount</span>
                  <span>₹{totalAmount + 30}</span>
                </div>
              </div>

              <Button 
                onClick={handleProceed}
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
