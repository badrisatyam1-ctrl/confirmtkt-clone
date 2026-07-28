import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image based on mode (simulated with standard hero image) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-50 dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-100 border border-blue-400/30 text-sm font-medium backdrop-blur-md">
            India's #1 Travel Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Journey Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Boundaries
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-medium">
            Book buses, trains, and flights in seconds. Experience seamless travel with exclusive deals and 24/7 support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
