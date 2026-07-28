import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I cancel my ticket?',
    answer: 'You can cancel your ticket by navigating to the "My Bookings" section in your dashboard. Select the booking you wish to cancel and click on the "Cancel Ticket" button. Refund amounts depend on the cancellation policy of the specific operator.'
  },
  {
    question: 'What happens if my bus/train is delayed?',
    answer: 'In case of delays, we send real-time SMS and email notifications to keep you updated. If a trip is cancelled by the operator, a full refund is automatically initiated to your original payment method.'
  },
  {
    question: 'Can I change my travel date?',
    answer: 'Yes, date changes are permitted up to 24 hours before departure for select operators. Modification fees may apply depending on the fare difference and operator policy.'
  },
  {
    question: 'How do I use my Wallet balance?',
    answer: 'During the checkout process on the payment page, you will see an option to apply your Wallet balance. You can use it to partially or fully pay for your booking.'
  },
  {
    question: 'Are there any hidden booking fees?',
    answer: 'No! TravelBooking believes in complete transparency. The price you see during the final review step includes all taxes and fees.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything you need to know about booking with us.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white dark:bg-slate-900 border transition-colors duration-300 rounded-2xl overflow-hidden ${isOpen ? 'border-blue-500 dark:border-blue-500 shadow-md' : 'border-slate-200 dark:border-slate-800'}`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} 
                    size={20} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
