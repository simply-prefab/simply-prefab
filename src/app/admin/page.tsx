'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import AdminDashboard from '@/pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🔒 AUTHENTICATION CHECK
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ User is logged in
        console.log('✅ Admin authenticated:', user.email);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // ❌ User is NOT logged in - redirect to login
        console.log('❌ No authentication - redirecting to login');
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: '#FB921D' }} />
          <p style={{ color: '#666', fontSize: '14px' }}>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // Only show dashboard if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <AdminDashboard />;
}
