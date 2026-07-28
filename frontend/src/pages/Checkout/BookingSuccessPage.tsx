import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function BookingSuccessPage() {
  const location = useLocation();
  const { bookingRef, amount } = location.state || { bookingRef: 'BKG-DEFAULT', amount: 0 };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 text-center"
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Your payment of ₹{amount} was successful. We've sent the ticket details to your email and SMS.</p>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mb-8 border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Booking Reference</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">{bookingRef}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2 h-12 px-6 rounded-xl">
            <Download size={18} />
            Download PDF
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 h-12 px-6 rounded-xl">
            <FileText size={18} />
            View E-Ticket
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
