import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const routes = [
  { id: 1, origin: 'Mumbai', dest: 'Goa', price: '₹799', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, origin: 'Delhi', dest: 'Manali', price: '₹1200', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
  { id: 3, origin: 'Bangalore', dest: 'Hyderabad', price: '₹850', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80' },
  { id: 4, origin: 'Pune', dest: 'Mumbai', price: '₹350', img: 'https://images.unsplash.com/photo-1570168007204-c1f38750058b?auto=format&fit=crop&w=600&q=80' },
  { id: 5, origin: 'Chennai', dest: 'Coimbatore', price: '₹600', img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80' },
  { id: 6, origin: 'Kolkata', dest: 'Siliguri', price: '₹950', img: 'https://images.unsplash.com/photo-1544085701-4e0f9f87e1e0?auto=format&fit=crop&w=600&q=80' },
];

export default function PopularRoutes() {
  const navigate = useNavigate();

  const handleRouteClick = (origin: string, dest: string) => {
    const qs = new URLSearchParams({ origin, destination: dest });
    navigate(`/bus/search?${qs.toString()}`);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Trending Routes</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Explore India's most popular travel destinations. Click any route to instantly search for buses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, idx) => (
            <motion.button
              key={route.id}
              onClick={() => handleRouteClick(route.origin, route.dest)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blue-500/20 transition-all text-left w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <img
                src={route.img}
                alt={`${route.origin} to ${route.dest}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544085701-4e0f9f87e1e0?auto=format&fit=crop&w=600&q=80`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity" />

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <ArrowRight size={16} className="text-white" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{route.origin} → {route.dest}</h3>
                    <p className="text-slate-300 text-sm">Starting from</p>
                  </div>
                  <div className="bg-blue-600 group-hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-600/30">
                    {route.price}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
