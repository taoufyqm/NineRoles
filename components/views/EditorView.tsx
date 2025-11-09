import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

interface EditingTask {
    id: string;
    label: string;
    completed: boolean;
}

const initialTasks: EditingTask[] = [
    { id: 'import', label: 'Import and organize footage', completed: false },
    { id: 'rough_cut', label: 'Create the rough cut', completed: false },
    { id: 'sound_design', label: 'Sound design and music', completed: false },
    { id: 'color_grade', label: 'Color correction and grading', completed: false },
    { id: 'graphics', label: 'Add graphics and B-Roll', completed: false },
    { id: 'review', label: 'Final review and adjustments', completed: false },
    { id: 'export', label: 'Export the final video', completed: false },
];

const EditorView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState(initialTasks);

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
        // Reset checklist when task changes
        setTasks(initialTasks.map(t => ({ ...t, completed: false })));
    }, [currentTask]);
    
    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Editor's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />

                {currentTask ? (
                    <>
                        <p className="mb-4 text-lg text-gray-400">
                            Task: <span className="font-semibold text-purple-400">{currentTask.title}</span>
                             <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <h3 className="text-xl font-semibold mb-3">Editing Checklist</h3>
                        <div className="space-y-2">
                            {tasks.map(task => (
                                <div key={task.id} onClick={() => toggleTask(task.id)} className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors hover:bg-gray-700">
                                    <input type="checkbox" checked={task.completed} readOnly className="h-5 w-5 rounded accent-purple-500" />
                                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.label}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to view the editing checklist.</p>
                    </div>
                )}
            </div>

            {currentTask && (
                <div className={`p-6 rounded-lg border ${cardBg}`}>
                    <h3 className="text-xl font-semibold mb-3">Project Files & Notes</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Project Folder</label>
                            <input type="text" readOnly value={`/Projects/${currentTask.title.replace(/\s/g, '_')}/`} className="w-full p-2 rounded-md bg-gray-500/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Notes for the Editor</label>
                            <textarea 
                                rows={4}
                                defaultValue="Focus on a fast-paced edit with energetic music. Add captions for key points."
                                className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-sky-500`}
                            />
                        </div>
                    </div>
                </div>
            )}
            
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default EditorView;