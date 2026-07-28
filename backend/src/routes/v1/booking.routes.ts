import { Router } from 'express';
import { 
  initiateBooking, 
  applyCoupon, 
  createPaymentIntent, 
  confirmBooking, 
  cancelBooking, 
  getMyBookings 
} from '../../controllers/booking.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

// Protected Routes
router.use(requireAuth);
router.post('/initiate', initiateBooking);
router.post('/apply-coupon', applyCoupon);
router.post('/payment-intent', createPaymentIntent);
router.post('/confirm', confirmBooking);
router.post('/cancel', cancelBooking);
router.get('/my-bookings', getMyBookings);

export default router;
