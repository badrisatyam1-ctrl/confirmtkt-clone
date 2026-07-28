import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireRoles } from '../middlewares/role.middleware';

const router = Router();

// Secure all admin routes to SUPER_ADMIN only
router.use(requireAuth);
router.use(requireRoles(['SUPER_ADMIN']));

router.get('/dashboard/metrics', adminController.getDashboardMetrics);
router.get('/users', adminController.getAllUsers);

export default router;
