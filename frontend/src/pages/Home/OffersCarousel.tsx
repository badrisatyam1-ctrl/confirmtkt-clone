import { motion } from 'framer-motion';

const offers = [
  {
    id: 1,
    title: 'Save up to ₹500 on Bus',
    code: 'FIRSTBUS',
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: '10% Cashback on Trains',
    code: 'TRAIN10',
    gradient: 'from-orange-500 to-amber-500',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Flat ₹1000 off Flights',
    code: 'FLIGHT1K',
    gradient: 'from-emerald-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Weekend Getaway Deal',
    code: 'WEEKEND',
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80',
  }
];

export default function OffersCarousel() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Exclusive Offers</h2>
            <p className="text-slate-500 dark:text-slate-400">Grab the best deals on your next journey</p>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">View All</button>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
          {offers.map((offer, index) => (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={offer.id}
              className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center rounded-3xl overflow-hidden relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-90 z-10 mix-blend-multiply group-hover:opacity-100 transition-opacity duration-300`}></div>
              <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-20 p-6 h-48 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-2">
                    Limited Time
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight">{offer.title}</h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/40 border-dashed rounded-lg px-4 py-2">
                    <span className="font-mono font-bold text-white tracking-widest">{offer.code}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
