'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#071B2F] text-white flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white text-[#071B2F] rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#037EF3] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#071B2F]">AIESEC Bhopal Admin</h1>
          <p className="text-xs text-[#5B6573]">
            Content Management System for Incoming Global Volunteer Projects
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#071B2F] block">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@aiesec.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#071B2F] focus:outline-none focus:ring-2 focus:ring-[#037EF3]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#071B2F] block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#071B2F] focus:outline-none focus:ring-2 focus:ring-[#037EF3]"
              />
            </div>
          </div>

          <Button variant="primary" size="md" isLoading={isLoading} className="w-full" type="submit">
            <span>Sign In to Dashboard</span>
          </Button>
        </form>

        <div className="pt-4 border-t border-[#E5E7EB] text-center text-[11px] text-[#5B6573]">
          Secured with NextAuth.js & Role-Based Access Control.
        </div>
      </div>
    </div>
  );
}