'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LogOut, Home, Shield } from 'lucide-react';
import { auth } from '@/config/firebase.config';
import { signOut } from 'firebase/auth';

export default function AdminNavigation() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
// test
  return (
    <nav 
      className="border-b-4 shadow-md"
      style={{ 
        background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
        borderColor: '#C55A00'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
