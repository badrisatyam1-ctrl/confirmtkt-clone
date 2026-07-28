import { Router } from 'express';
import { searchTrains, getAvailability, getSchedule } from '../../controllers/train.controller';

const router = Router();

// Public Routes
router.get('/search', searchTrains);
router.get('/trip/:tripId/availability', getAvailability);
router.get('/trip/:tripId/schedule', getSchedule);

export default router;
