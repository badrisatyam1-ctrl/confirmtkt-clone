import { Router } from 'express';
import { checkPnrStatus } from '../../controllers/pnr.controller';

const router = Router();

// Public Route for PNR tracking
router.get('/status/:pnr', checkPnrStatus);
router.get('/:pnr', checkPnrStatus);

export default router;
