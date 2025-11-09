
import React, { useState, useCallback } from 'react';
import { getSmartSuggestion } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import { MagicIcon, RefreshIcon } from './icons';
import { Task } from '../types';

interface SmartTaskSuggestorProps {
    currentTask: Task | null;
}

const SmartTaskSuggestor: React.FC<SmartTaskSuggestorProps> = ({ currentTask }) => {
    const { currentRole } = useAppContext();
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSuggestion = useCallback(async () => {
        if (!currentTask) return;
        setIsLoading(true);
        setError(null);
        setSuggestion('');
        try {
            const result = await getSmartSuggestion(currentRole, currentTask);
            setSuggestion(result);
        } catch (err) {
            setError("Sorry, I couldn't get a suggestion. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentRole, currentTask]);
    
    const cardBg = 'bg-gray-800 border-gray-700';
    const textColor = 'text-gray-300';
    const buttonBg = 'bg-sky-600 hover:bg-sky-700';
    const suggestionBg = 'bg-gray-700';

    if (!currentTask) {
        return (
            <div className={`p-6 rounded-lg border ${cardBg} opacity-50`}>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <MagicIcon className="w-6 h-6 text-sky-400" />
                    Smart Task Suggestion
                </h3>
                <p className="text-gray-400 text-center">Select a project to enable smart suggestions.</p>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-lg border ${cardBg}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <MagicIcon className="w-6 h-6 text-sky-400" />
                    Smart Task Suggestion
                </h3>
                <button onClick={fetchSuggestion} disabled={isLoading} className="p-2 rounded-full hover:bg-gray-500/20 transition-colors disabled:opacity-50">
                   <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            {!suggestion && !isLoading && !error && (
                 <div className="text-center py-4">
                    <p className="text-gray-400 mb-4">Stuck on "{currentTask.title}"? Get a smart suggestion for your next step.</p>
                     <button onClick={fetchSuggestion} className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors ${buttonBg}`}>
                        Suggest a Sub-Task
                    </button>
                 </div>
            )}

            {isLoading && <p className={`text-center py-4 ${textColor}`}>Thinking of the best sub-task for you...</p>}
            {error && <p className="text-center py-4 text-red-500">{error}</p>}
            
            {suggestion && (
                <div className={`p-4 rounded-lg ${suggestionBg}`}>
                    <p className={textColor} style={{ whiteSpace: 'pre-wrap' }}>{suggestion}</p>
                </div>
            )}
        </div>
    );
};

export default SmartTaskSuggestor;