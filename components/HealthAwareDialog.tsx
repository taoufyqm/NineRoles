
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';

interface HealthAwareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HealthAwareDialog: React.FC<HealthAwareDialogProps> = ({ isOpen, onClose }) => {
  const { setIsHealthMode, setHealthRating, healthRating } = useAppContext();
  const [localRating, setLocalRating] = useState(healthRating);

  const handleConfirm = () => {
    setIsHealthMode(true);
    setHealthRating(localRating);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-rose-600">Activate Health Mode</h2>
        <p className="text-center text-gray-600">We're sorry to hear you're not feeling well. We'll adjust the workload for you.</p>
        
        <div className="space-y-4">
          <label htmlFor="health-rating" className="block text-lg font-medium text-center">
            How are you feeling today from 0 to 100? <span className="font-bold text-rose-500">{localRating}%</span>
          </label>
          <input
            id="health-rating"
            type="range"
            min="0"
            max="100"
            step="5"
            value={localRating}
            onChange={(e) => setLocalRating(parseInt(e.target.value))}
            className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={handleConfirm} className="flex-1 px-6 py-3 font-bold text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors">
            Confirm and Activate
          </button>
          <button onClick={onClose} className="flex-1 px-6 py-3 font-bold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthAwareDialog;