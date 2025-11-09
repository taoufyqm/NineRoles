import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

const DirectorView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [plan, setPlan] = useState({
        visualTone: '',
        shotPlan: '',
        equipment: ''
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
                setPlan({
                    visualTone: 'Fast-paced, modern, with clear infographics.',
                    shotPlan: `- A-Roll: Plan for "${currentTask.title}"\n- B-Roll: Supporting visuals for "${currentProject.title}"`,
                    equipment: '- Main Camera: Sony FX3\n- Audio: Shure SM7B\n- Lighting: Aputure 120D'
                });
            }
        } else {
            setPlan({ visualTone: '', shotPlan: '', equipment: '' });
        }
    }, [currentTask, projects]);
    
    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Director's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                {currentTask ? (
                    <>
                        <p className="text-lg text-gray-400 mb-4">
                            Task: <span className="font-semibold text-orange-400">{currentTask.title}</span>
                             <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="visualTone" className={`block text-sm font-medium mb-2 ${labelColor}`}>Visual Tone & Pacing</label>
                                <textarea id="visualTone" rows={2} value={plan.visualTone} onChange={e => setPlan({...plan, visualTone: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-orange-500`}></textarea>
                            </div>
                            <div>
                                <label htmlFor="shotPlan" className={`block text-sm font-medium mb-2 ${labelColor}`}>Shot Plan</label>
                                <textarea id="shotPlan" rows={4} value={plan.shotPlan} onChange={e => setPlan({...plan, shotPlan: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-orange-500`}></textarea>
                            </div>
                            <div>
                                <label htmlFor="equipment" className={`block text-sm font-medium mb-2 ${labelColor}`}>Suggested Equipment</label>
                                <textarea id="equipment" rows={3} value={plan.equipment} onChange={e => setPlan({...plan, equipment: e.target.value})} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-orange-500`}></textarea>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to create a production plan.</p>
                    </div>
                )}
            </div>
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default DirectorView;