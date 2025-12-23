'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2, Lock, Mail } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful');
      router.push('/admin');
    } catch (err: any) {
      console.error('❌ Login error:', err);
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/user-not-found') {
        setError('No admin account found with this email');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later');
      } else {
        setError('Login failed. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 100%)'
      }}
    >
      <Card 
        className="w-full max-w-md shadow-2xl"
        style={{ border: '2px solid #FB921D' }}
      >
        <CardHeader className="text-center pb-8" style={{ backgroundColor: '#FFF5E6' }}>
          <div className="flex justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
                boxShadow: '0 10px 30px rgba(251, 146, 29, 0.3)'
              }}
            >
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>
            Admin Login
          </CardTitle>
          <CardDescription style={{ color: '#666' }}>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div 
                className="p-4 rounded-lg border flex items-start gap-3"
                style={{ 
                  backgroundColor: 'rgba(255, 84, 89, 0.1)',
                  borderColor: '#FF5459'
                }}
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FF5459' }} />
                <p className="text-sm font-medium" style={{ color: '#8B0000' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>
                Email Address
              </Label>
              <div className="relative">
                <Mail 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                  style={{ color: '#FB921D' }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@simplyprefab.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-11 h-12 border-2"
                  style={{
                    backgroundColor: '#FFF5E6',
                    borderColor: '#FFD0A0',
                    color: '#1a1a1a'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#FB921D';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#FFF5E6';
                    e.target.style.borderColor = '#FFD0A0';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>
                Password
              </Label>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                  style={{ color: '#FB921D' }}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-11 h-12 border-2"
                  style={{
                    backgroundColor: '#FFF5E6',
                    borderColor: '#FFD0A0',
                    color: '#1a1a1a'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#FB921D';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#FFF5E6';
                    e.target.style.borderColor = '#FFD0A0';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold transition-all duration-200"
              style={{
                background: isLoading 
                  ? '#E0E0E0' 
                  : 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
                color: isLoading ? '#999' : 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(251, 146, 29, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: '#FFD0A0' }}>
            <p className="text-sm" style={{ color: '#666' }}>
              Protected admin area • SimplePrefab
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
