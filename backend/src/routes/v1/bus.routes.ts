import { Router } from 'express';
import { searchBuses, getSeatLayout } from '../../controllers/bus.controller';

const router = Router();

// Public Routes
router.get('/search', searchBuses);
router.get('/trip/:tripId/layout', getSeatLayout);

export default router;
