"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const signInResult = await signIn('credentials', { redirect: false, email: formData.email, password: formData.password });
      setIsLoading(false);

      if (signInResult && (signInResult as any).error) {
        // if sign-in failed, send user to login page with message
        router.push('/login?registered=1');
        return;
      }

      // On success, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-indigo-600 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">ServeLink</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Join the <br />
            <span className="text-indigo-200">Church Community.</span>
          </h1>
          <p className="text-lg text-indigo-100 mb-8 opacity-90">
            Create your account to start managing volunteers and scheduling services. 
            Experience the ease of organized ministry.
          </p>
          <div className="p-6 bg-indigo-500/30 rounded-2xl backdrop-blur-sm border border-indigo-400/30">
            <p className="text-sm font-medium italic">
              "The most intuitive tool we've used for our church administration. 
              It's a game-changer for our volunteer coordination."
            </p>
            <p className="text-xs mt-3 opacity-70">— Sarah Jenkins, Admin Coordinator</p>
          </div>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-700 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Right Side: Register Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Join ServeLink and start organizing your congregation today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-800 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" aria-hidden="true" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" aria-hidden="true" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="name@church.org"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" aria-hidden="true" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                    type="password" 
                    id="password" 
                    required 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirmPassword">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                    type="password" 
                    id="confirmPassword" 
                    required 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <>Create Account <ArrowRight className="w-5 h-5" aria-hidden="true" /></>}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
