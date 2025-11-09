import React, { useState, useCallback, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { performResearch } from '../../services/geminiService';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { ResearcherIcon } from '../icons';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

const ResearcherView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [topic, setTopic] = useState('');
    const [results, setResults] = useState('');
    const [scratchpad, setScratchpad] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

     useEffect(() => {
        if (activeProjectId && projects) {
            const project = projects.find(p => p.id === activeProjectId);
            const task = project?.tasks.find(t => t.roleId === currentRole.id);
            setCurrentTask(task || null);
        } else {
            setCurrentTask(null);
        }
    }, [activeProjectId, projects, currentRole]);

    useEffect(() => {
        if (currentTask) {
            setTopic(currentTask.title);
        } else {
            setTopic('');
        }
    }, [currentTask]);

    const handleResearch = useCallback(async () => {
        if (!topic) return;
        setIsLoading(true);
        setError(null);
        setResults('');
        try {
            const researchData = await performResearch(topic);
            setResults(researchData);
        } catch (err) {
            setError('Sorry, an error occurred during the research. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [topic]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';
    const buttonBg = 'bg-sky-600 hover:bg-sky-700';
    const resultsBg = 'bg-gray-700/50';

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Researcher's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="topic" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                            Research Topic
                            {currentTask && (
                                <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                                    Est. {currentTask.estimatedDuration} min
                                </span>
                            )}
                        </label>
                        <div className="flex gap-2">
                            <input 
                                id="topic" 
                                type="text" 
                                value={topic} 
                                onChange={e => setTopic(e.target.value)} 
                                placeholder="Select a project to load a topic..."
                                disabled={!currentTask}
                                className={`flex-grow p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500 disabled:opacity-50`} 
                            />
                            <button onClick={handleResearch} disabled={isLoading || !topic || !currentTask} className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors flex items-center gap-2 ${buttonBg} disabled:bg-gray-500 disabled:cursor-not-allowed`}>
                                <ResearcherIcon className="w-5 h-5" />
                                {isLoading ? 'Researching...' : 'Research'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && <p className="text-center py-4">Researching and gathering information for you...</p>}
            {error && <p className="text-center py-4 text-red-500">{error}</p>}
            
            <div className="grid md:grid-cols-2 gap-6">
                {results && (
                    <div className={`p-6 rounded-lg border ${cardBg}`}>
                        <h3 className="text-xl font-bold mb-4">Research Results</h3>
                        <div className={`p-4 rounded-lg ${resultsBg} h-96 overflow-y-auto`}>
                            <p className="text-gray-200" style={{ whiteSpace: 'pre-wrap' }}>{results}</p>
                        </div>
                    </div>
                )}

                <div className={`p-6 rounded-lg border ${cardBg}`}>
                    <h3 className="text-xl font-bold mb-4">My Research Notes</h3>
                    <textarea 
                        rows={14}
                        value={scratchpad}
                        onChange={(e) => setScratchpad(e.target.value)}
                        placeholder="Jot down your ideas, questions, and key findings here..."
                        className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}
                    />
                </div>
            </div>


            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default ResearcherView;