import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock publishable key for UI demonstration
const stripePromise = loadStripe('pk_test_mock_stripe_key_12345');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    // In a real flow, we would confirm the payment intent here using the client secret from the backend.
    // stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) }})
    
    // Simulating successful payment delay
    setTimeout(() => {
      setProcessing(false);
      navigate('/booking-success', { state: { bookingRef: 'BKG-XYZ987', amount: 2950 } });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#334155',
                '::placeholder': {
                  color: '#94a3b8',
                },
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-lg rounded-xl flex items-center justify-center gap-2"
      >
        {processing ? 'Processing...' : 'Pay ₹2950'}
        {!processing && <Lock size={16} />}
      </Button>
    </form>
  );
};

export default function PaymentComponent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Secure Payment</h2>
          <p className="text-slate-500 text-sm mt-1">Powered by Stripe</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
