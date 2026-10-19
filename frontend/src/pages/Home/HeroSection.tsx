import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchWidget from './SearchWidget';
import { 
  Zap, ShieldCheck, MapPin, Sparkles, 
  ArrowRight, Award, CheckCircle, RefreshCw 
} from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  const trustHighlights = [
    {
      icon: Zap,
      title: 'Smart Seat Predictor',
      description: 'AI algorithm predicts waitlist confirmation with 98% accuracy before you pay.'
    },
    {
      icon: RefreshCw,
      title: 'Instant 100% Refund',
      description: 'Zero cancellation penalty — get immediate full refund directly to your UPI/Bank.'
    },
    {
      icon: MapPin,
      title: 'Live GPS Tracking',
      description: 'Check exact train delays, current station, and platform numbers offline.'
    },
    {
      icon: Award,
      title: 'Alternate Route Finder',
      description: 'Get confirmed seats on full trains with intelligent connecting station suggestions.'
    }
  ];

  return (
    <section className="relative pt-10 pb-16 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Subtle modern background blur circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-2 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Sparkles size={14} className="text-emerald-600" />
            Next-Gen Multi-Modal Travel Platform
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Fast & Smart <span className="text-emerald-600 dark:text-emerald-400">Train & Bus</span> Booking
          </h1>
          <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Book IRCTC trains, buses, and flights with instant seat confirmation, live tracking, and zero cancellation charges.
          </p>
        </motion.div>

        {/* Clean Segmented Search Widget */}
        <SearchWidget />

        {/* Verified Network Partner Badge */}
        <div className="mt-8 flex items-center justify-center gap-2.5 py-1.5 px-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Official Verified Rail & Bus Ticketing Network • 256-Bit SSL Encrypted</span>
        </div>

        {/* Value Proposition Cards (Replaced Brand Ambassadors with Clean High-Tech Value Props) */}
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {trustHighlights.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Original Promotional Travel Offer Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-5xl mt-10 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 md:p-8 text-white relative flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900/40"
        >
          <div className="text-left space-y-2 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              <Sparkles size={13} /> Exclusive Traveler Discount
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
              Get Up to <span className="text-emerald-400">₹300 OFF</span> on Your First Booking
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-medium">
              Use promo code <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white font-bold">SWIFTNEW</span> at checkout. Valid on all buses and trains.
            </p>
          </div>

          <div className="z-10 flex-shrink-0">
            <button
              onClick={() => navigate('/train/search?origin=NDLS&destination=MMCT')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm md:text-base px-8 py-3.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Claim Offer & Book <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
