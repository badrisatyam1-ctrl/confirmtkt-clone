import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Check if the user has any of the allowed roles
    if (!hasRole(allowedRoles)) {
      // User is authenticated but doesn't have required role.
      // Redirect them to their appropriate dashboard or home
      if (hasRole(['SUPER_ADMIN'])) return <Navigate to="/admin" replace />;
      if (hasRole(['OPERATOR'])) return <Navigate to="/operator" replace />;
      if (hasRole(['DRIVER'])) return <Navigate to="/driver" replace />;
      return <Navigate to="/" replace />; // Default customer redirect
    }
  }

  // Authorized
  return <Outlet />;
}
