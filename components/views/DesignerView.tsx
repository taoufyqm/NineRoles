



import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { DesignerIcon, PhotoIcon } from '../icons';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';


const DesignerView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [thumbnailText, setThumbnailText] = useState('');
    const colors = ['#38bdf8', '#1f2937', '#facc15', '#ffffff'];

    useEffect(() => {
        if (activeProjectId && projects) {
            const project = projects.find(p => p.id === activeProjectId);
            const task = project?.tasks.find(t => t.roleId === currentRole.id);
            setCurrentTask(task || null);

            if (project) {
                setThumbnailText(project.title);
            }
        } else {
            setCurrentTask(null);
            setThumbnailText('');
        }
    }, [activeProjectId, projects, currentRole]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';
    const buttonBg = 'bg-pink-500 hover:bg-pink-600';

    const InspirationPlaceholder = () => (
        <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md border-gray-600 p-4">
            <div className="text-center">
                <PhotoIcon className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400 mb-2">Inspiration Image</p>
                <label htmlFor="inspiration-upload" className="relative cursor-pointer mt-2 px-3 py-1.5 text-sm font-semibold rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600">
                    <span>Upload Image</span>
                    <input id="inspiration-upload" name="inspiration-upload" type="file" className="sr-only" />
                </label>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Designer's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                {currentTask ? (
                    <>
                        <p className="text-lg text-gray-400 mb-4">
                            Task: <span className="font-semibold text-pink-400">{currentTask.title}</span>
                            <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            {/* Left Column */}
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Design Workspace</h3>
                                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center p-4 mb-4">
                                   <div className="text-center">
                                     <DesignerIcon className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                                     <p className="text-gray-400">Thumbnail Preview</p>
                                   </div>
                                </div>
                                <button className={`w-full px-4 py-3 font-bold text-white rounded-lg transition-colors ${buttonBg}`}>
                                    Upload Inspiration
                                </button>
                            </div>
                            {/* Right Column */}
                            <div className="space-y-6">
                                 <div>
                                    <label htmlFor="thumbnailText" className={`block text-sm font-medium mb-2 ${labelColor}`}>Thumbnail Text</label>
                                    <textarea id="thumbnailText" rows={2} value={thumbnailText} onChange={e => setThumbnailText(e.target.value)} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-pink-500`} />
                                </div>
                                <div>
                                    <label htmlFor="designNotes" className={`block text-sm font-medium mb-2 ${labelColor}`}>Thumbnail Idea / Concept</label>
                                    <textarea id="designNotes" rows={4} placeholder="Describe the main idea, characters, and mood for the thumbnail..." className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-pink-500`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold mb-2 ${labelColor}`}>Color Palette</h3>
                                    <div className="flex gap-2">
                                        {colors.map(color => <div key={color} style={{backgroundColor: color}} className="w-10 h-10 rounded-full border-2 border-gray-500"></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Inspiration Section */}
                        <div className="mt-8 pt-6 border-t border-gray-500/50">
                            <h3 className="text-xl font-semibold mb-4">Inspiration Images</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <InspirationPlaceholder />
                                <InspirationPlaceholder />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to start designing.</p>
                    </div>
                )}
            </div>
            
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default DesignerView;