import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = sessionStorage.getItem('admin_auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return <>{children}</>;
};
