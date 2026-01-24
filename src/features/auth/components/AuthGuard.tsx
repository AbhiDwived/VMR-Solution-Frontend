'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerification?: boolean;
  allowedRoles?: ('retail' | 'bulk')[];
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requireAuth = true,
  requireVerification = false,
  allowedRoles,
  redirectTo = '/auth/login'
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isVerified, hasRole, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Check if authentication is required
    if (requireAuth && !isAuthenticated()) {
      router.push(redirectTo);
      return;
    }

    // Check if verification is required
    if (requireVerification && !isVerified()) {
      router.push(`/auth/verify-otp?contact=${encodeURIComponent(user?.email || user?.mobile || '')}`);
      return;
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0) {
      const hasValidRole = allowedRoles.some(role => hasRole(role));
      if (!hasValidRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isVerified, hasRole, user, isLoading, requireAuth, requireVerification, allowedRoles, router, redirectTo]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-linen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-green mx-auto"></div>
          <p className="mt-4 text-mocha-grey">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if auth checks fail
  if (requireAuth && !isAuthenticated()) return null;
  if (requireVerification && !isVerified()) return null;
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) return null;

  return <>{children}</>;
}
