import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface SessionSetupProps {
  onSessionStart: (energy: number, duration: number) => void;
}

const SessionSetup: React.FC<SessionSetupProps> = ({ onSessionStart }) => {
  const [energy, setEnergy] = useState(75);
  const [duration, setDuration] = useState(45);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSessionStart(energy, duration);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LogoIcon className="w-16 h-16 text-sky-400" />
          </div>
          <h1 className="text-3xl font-bold">Ready for Your Next Session</h1>
          <p className="mt-2 text-gray-400">Set your energy and time to begin your creative work.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-4">Energy Level: <span className="font-bold text-sky-400">{energy}%</span></label>
              <input type="range" min="0" max="100" step="5" value={energy} onChange={(e) => setEnergy(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-4">Session Duration</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[15, 25, 45, 90].map(d => (
                  <button type="button" key={d} onClick={() => setDuration(d)} className={`px-4 py-3 rounded-lg font-bold transition-colors ${duration === d ? 'bg-sky-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{d} min</button>
                ))}
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full px-4 py-4 font-bold text-lg text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors">
            Start Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionSetup;