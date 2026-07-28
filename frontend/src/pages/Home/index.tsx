import HeroSection from './HeroSection';
import SearchWidget from './SearchWidget';
import OffersCarousel from './OffersCarousel';
import PopularRoutes from './PopularRoutes';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import FaqSection from './FaqSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <SearchWidget />
      <OffersCarousel />
      <PopularRoutes />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
    </div>
  );
}
