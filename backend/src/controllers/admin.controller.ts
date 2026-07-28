import { Request, Response } from 'express';
import { adminService } from '../services/admin.service';

export const adminController = {
  getDashboardMetrics: async (req: Request, res: Response) => {
    try {
      const data = await adminService.getDashboardMetrics();
      res.json({ success: true, data });
    } catch (error) {
      console.error('Error in getDashboardMetrics:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch dashboard metrics' });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await adminService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  }
};
