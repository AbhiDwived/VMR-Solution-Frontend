'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerification?: boolean;
  allowedRoles?: ('user' | 'admin')[];
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
  const { isAuthenticated, isVerified, hasRole, user, loading } = useAuth();

  useEffect(() => {
    console.log('🛡️ AuthGuard check:', {
      loading,
      requireAuth,
      requireVerification,
      allowedRoles,
      user: user ? { id: user.id, role: user.role, isVerified: user.isVerified } : null
    });

    if (loading) {
      console.log('🛡️ AuthGuard: Still loading, waiting...');
      return;
    }

    // Check if authentication is required
    if (requireAuth && !isAuthenticated()) {
      console.log('🛡️ AuthGuard: Not authenticated, redirecting to', redirectTo);
      router.push(redirectTo);
      return;
    }

    // Check if verification is required
    if (requireVerification && !isVerified()) {
      console.log('🛡️ AuthGuard: Not verified, redirecting to verify-otp');
      router.push(`/auth/verify-otp?contact=${encodeURIComponent(user?.email || '')}`);
      return;
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0) {
      const hasValidRole = allowedRoles.some(role => hasRole(role));
      console.log('🛡️ AuthGuard: Role check result:', hasValidRole);
      if (!hasValidRole) {
        console.log('🛡️ AuthGuard: Invalid role, redirecting to /unauthorized');
        router.push('/unauthorized');
        return;
      }
    }

    console.log('🛡️ AuthGuard: All checks passed, rendering children');
  }, [isAuthenticated, isVerified, hasRole, user, loading, requireAuth, requireVerification, allowedRoles, router, redirectTo]);

  // Show loading state while checking auth
  if (loading) {
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



