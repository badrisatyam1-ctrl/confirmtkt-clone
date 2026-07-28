import { Router } from 'express';
import { searchFlights, getFlightAncillaries, getSeatLayout } from '../../controllers/flight.controller';

const router = Router();

// Public Routes
router.get('/search', searchFlights);
router.get('/trip/:tripId/ancillaries', getFlightAncillaries);
router.get('/trip/:tripId/layout', getSeatLayout);

export default router;
