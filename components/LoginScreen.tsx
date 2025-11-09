
import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here.
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LogoIcon className="w-16 h-16 text-sky-400" />
          </div>
          <h1 className="text-3xl font-bold">The Nine Roles</h1>
          <p className="mt-2 text-gray-400">Welcome back, log in to get started.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email or Username</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="password"  className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 px-4 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-sky-400 hover:underline">Forgot password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button type="button" onClick={onNavigateToRegister} className="font-medium text-sky-400 hover:underline focus:outline-none">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;