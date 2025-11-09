import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

interface Shot {
    id: number;
    description: string;
    completed: boolean;
}

const ShooterView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [shots, setShots] = useState<Shot[]>([]);
    const [newShot, setNewShot] = useState('');
    const [cameraSettings, setCameraSettings] = useState('- Camera: Sony A7III\n- Lens: 24-70mm f/2.8\n- Lighting: Key light, Fill light\n- Audio: Rode NTG');

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
                setShots([
                    { id: 1, description: `Wide shot for intro (${currentProject.title})`, completed: false },
                    { id: 2, description: `Close-up shots for key points`, completed: false },
                    { id: 3, description: `B-roll related to "${currentTask.title}"`, completed: false },
                ]);
            }
        } else {
            setShots([]);
        }
    }, [currentTask, projects]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const buttonBg = 'bg-sky-600 hover:bg-sky-700';

    const handleAddShot = () => {
        if (newShot.trim() !== '') {
            setShots([...shots, { id: Date.now(), description: newShot, completed: false }]);
            setNewShot('');
        }
    };

    const toggleShot = (id: number) => {
        setShots(shots.map(shot => shot.id === id ? { ...shot, completed: !shot.completed } : shot));
    };

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Filmmaker's Dashboard</h2>
                 <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                {currentTask ? (
                    <>
                        <p className="mb-4 text-lg text-gray-400">
                            Task: <span className="font-semibold text-red-400">{currentTask.title}</span>
                            <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <h3 className="text-xl font-semibold mb-3">Shot List</h3>
                        <div className="space-y-2 mb-4">
                            {shots.map(shot => (
                                <div key={shot.id} onClick={() => toggleShot(shot.id)} className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors hover:bg-gray-700">
                                    <input type="checkbox" checked={shot.completed} readOnly className="h-5 w-5 rounded accent-sky-500" />
                                    <span className={shot.completed ? 'line-through text-gray-500' : ''}>{shot.description}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newShot} 
                                onChange={e => setNewShot(e.target.value)} 
                                placeholder="Add a new shot..."
                                className={`flex-grow p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}
                            />
                            <button onClick={handleAddShot} className={`px-5 py-2.5 font-semibold text-white rounded-lg transition-colors ${buttonBg}`}>Add</button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to see the shot list.</p>
                    </div>
                )}
            </div>

            <div className={`p-6 rounded-lg border ${cardBg}`}>
                 <h3 className="text-xl font-semibold mb-3">Camera & Equipment Settings</h3>
                 <textarea 
                    rows={6} 
                    value={cameraSettings} 
                    onChange={e => setCameraSettings(e.target.value)}
                    className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}
                 />
            </div>
            
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default ShooterView;