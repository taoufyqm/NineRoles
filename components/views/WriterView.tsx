import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Script, Task } from '../../types';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import ProjectSelector from '../ProjectSelector';

const WriterView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [script, setScript] = useState<Partial<Script>>({
        title: '',
        outline: '',
        fullScript: '',
        notes: '',
        keywords: []
    });

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
                setScript({
                    id: currentTask.id,
                    videoId: currentProject.id,
                    title: currentTask.title,
                    outline: '1. Hook\n2. Main points\n3. Call to action',
                    fullScript: `[Start writing the script for: ${currentTask.title}]`,
                    notes: 'Focus on a reassuring and practical tone.',
                    keywords: ['keyword1', 'keyword2']
                });
            }
        } else {
            setScript({ title: '', outline: '', fullScript: '', notes: '', keywords: [] });
        }
    }, [currentTask, projects]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Writer's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                {currentTask ? (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={`block text-sm font-medium mb-2 ${labelColor}`}>
                                Working On (Script)
                                <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">
                                    Est. {currentTask.estimatedDuration} min
                                </span>
                            </label>
                            <input id="title" type="text" value={script.title} onChange={e => setScript({...script, title: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`} />
                        </div>
                        <div>
                            <label htmlFor="outline" className={`block text-sm font-medium mb-2 ${labelColor}`}>Outline</label>
                            <textarea id="outline" rows={4} value={script.outline} onChange={e => setScript({...script, outline: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}></textarea>
                        </div>
                        <div>
                            <label htmlFor="fullScript" className={`block text-sm font-medium mb-2 ${labelColor}`}>Full Script</label>
                            <textarea id="fullScript" rows={10} value={script.fullScript} onChange={e => setScript({...script, fullScript: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}></textarea>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project from the dropdown to start writing.</p>
                    </div>
                )}
            </div>
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default WriterView;