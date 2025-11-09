
import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface RegistrationScreenProps {
  onRegister: (name: string, email: string) => void;
  onNavigateToLogin: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegister, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
    }
    setError('');
    onRegister(name, email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LogoIcon className="w-16 h-16 text-sky-400" />
          </div>
          <h1 className="text-3xl font-bold">Create a New Account</h1>
          <p className="mt-2 text-gray-400">Join The Eighth Roles and start your creative journey.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              id="email-register"
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
            <label htmlFor="password-register"  className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password-register"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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
          <div>
            <label htmlFor="confirm-password"  className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button type="button" onClick={onNavigateToLogin} className="font-medium text-sky-400 hover:underline focus:outline-none">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;