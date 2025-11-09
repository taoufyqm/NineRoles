import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

const ThinkerView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId, addProject } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [ideaBrief, setIdeaBrief] = useState({
        goal: '',
        audience: '',
        keyMessage: ''
    });
    const [newProjectTitle, setNewProjectTitle] = useState('');

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
        if (currentTask && projects) {
            const currentProject = projects.find(p => p.id === currentTask.projectId);
            if (currentProject) {
                setIdeaBrief({
                    goal: `Goal for: ${currentProject.title}`,
                    audience: 'Target audience for this video',
                    keyMessage: `Key message for: ${currentTask.title}`
                });
            }
        } else {
             setIdeaBrief({ goal: '', audience: '', keyMessage: '' });
        }
    }, [currentTask, projects]);

    const handleCreateProject = () => {
        if (newProjectTitle.trim()) {
            addProject(newProjectTitle.trim());
            setNewProjectTitle('');
        }
    };

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';
    const buttonBg = 'bg-yellow-600 hover:bg-yellow-700';

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Thinker's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                {currentTask ? (
                    <>
                        <p className="text-lg text-gray-400 mb-4">
                            Task: <span className="font-semibold text-yellow-400">{currentTask.title}</span>
                             <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="goal" className={`block text-sm font-medium mb-2 ${labelColor}`}>Goal of the Content</label>
                                <textarea id="goal" rows={2} value={ideaBrief.goal} onChange={e => setIdeaBrief({...ideaBrief, goal: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-yellow-500`}></textarea>
                            </div>
                            <div>
                                <label htmlFor="audience" className={`block text-sm font-medium mb-2 ${labelColor}`}>Target Audience</label>
                                <input id="audience" type="text" value={ideaBrief.audience} onChange={e => setIdeaBrief({...ideaBrief, audience: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-yellow-500`} />
                            </div>
                            <div>
                                <label htmlFor="keyMessage" className={`block text-sm font-medium mb-2 ${labelColor}`}>Key Message</label>
                                <textarea id="keyMessage" rows={2} value={ideaBrief.keyMessage} onChange={e => setIdeaBrief({...ideaBrief, keyMessage: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-yellow-500`}></textarea>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to define its strategy.</p>
                    </div>
                )}
            </div>

            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h3 className="text-xl font-semibold mb-4">Create a New Video Project</h3>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={newProjectTitle} 
                        onChange={e => setNewProjectTitle(e.target.value)} 
                        placeholder="Enter new video title..."
                        className={`flex-grow p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-yellow-500`} 
                    />
                    <button onClick={handleCreateProject} disabled={!newProjectTitle.trim()} className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors ${buttonBg} disabled:bg-gray-500 disabled:cursor-not-allowed`}>
                        Create Project
                    </button>
                </div>
            </div>

            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default ThinkerView;