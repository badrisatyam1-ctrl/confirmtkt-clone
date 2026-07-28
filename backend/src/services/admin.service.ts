import { prisma } from '../utils/prisma.util';

export const adminService = {
  getDashboardMetrics: async () => {
    try {
      const totalUsers = await prisma.user.count();
      const totalBookings = await prisma.booking.count();
      
      const revenueData = await prisma.booking.aggregate({
        _sum: {
          finalAmount: true
        },
        where: {
          status: 'CONFIRMED'
        }
      });
      
      const totalRevenue = revenueData._sum?.finalAmount || 0;

      // Fetch recent transactions
      const recentTransactions = await prisma.booking.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          bookingRef: true,
          finalAmount: true,
          status: true,
          createdAt: true,
          trip: {
            select: {
              vehicle: {
                select: { type: true }
              }
            }
          },
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });

      return {
        kpis: {
          totalUsers,
          totalBookings,
          totalRevenue,
          activeOperators: 24 // Mocked for now until operator table is fully fleshed
        },
        chartData: {
          bookingsByMode: [] as any[] // Will be populated once trip-based grouping is set up
        },
        recentTransactions: recentTransactions.map((tx: any) => ({
          id: tx.bookingRef || tx.id,
          user: `${tx.user.firstName} ${tx.user.lastName}`,
          mode: tx.trip?.vehicle?.type || 'UNKNOWN',
          amount: tx.finalAmount,
          status: tx.status,
          date: tx.createdAt
        }))
      };
    } catch (error) {
      console.error('Error fetching admin metrics:', error);
      throw new Error('Failed to fetch admin metrics');
    }
  },

  getAllUsers: async () => {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roles: {
          select: {
            role: {
              select: { name: true }
            }
          }
        },
        createdAt: true
      }
    });
  }
};
