import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to restrict access to specific roles.
 * Must be used after requireAuth middleware.
 * 
 * @param allowedRoles Array of role names (e.g., ['SUPER_ADMIN', 'OPERATOR'])
 */
export const requireRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found in request',
      });
    }

    // Check if the user has at least one of the allowed roles
    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient privileges',
      });
    }

    next();
  };
};
