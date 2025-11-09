

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

type Platform = 'twitter' | 'facebook' | 'instagram';

const SocialView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [activeTab, setActiveTab] = useState<Platform>('twitter');
    const [posts, setPosts] = useState({
        twitter: '',
        facebook: '',
        instagram: ''
    });

    useEffect(() => {
        if (activeProjectId && projects) {
            const project = projects.find(p => p.id === activeProjectId);
            const task = project?.tasks.find(t => t.roleId === currentRole.id);
            setCurrentTask(task || null);

            if (project) {
                setPosts({
                    twitter: `🚀 New video is out: "${project.title}"! Check it out. #NewVideo #${project.title.split(' ').join('')}`,
                    facebook: `Our latest video, "${project.title}," is now live! 🎥 We dive deep into... Watch it now! Link in comments.`,
                    instagram: `🔥 New video alert! Are you ready to learn more about "${project.title}"? Our new video has all the details. Link in bio! #Video #${project.title.split(' ').join('')}`
                });
            }
        } else {
            setCurrentTask(null);
            setPosts({ twitter: '', facebook: '', instagram: '' });
        }
    }, [activeProjectId, projects, currentRole]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';
    const tabBase = 'text-gray-400 hover:bg-gray-700';
    const tabActive = 'bg-gray-700 text-teal-300 border-teal-400';

    const handlePostChange = (platform: Platform, value: string) => {
        setPosts(prev => ({...prev, [platform]: value}));
    }

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Social Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                {currentTask ? (
                    <>
                        <p className="text-lg text-gray-400 mb-4">
                            Task: <span className="font-semibold text-teal-400">{currentTask.title}</span>
                            <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                                Est. {currentTask.estimatedDuration} min
                            </span>
                        </p>
                        <div className="mb-4 border-b border-gray-700">
                            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                                <button onClick={() => setActiveTab('twitter')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'twitter' ? tabActive : tabBase}`}>Twitter (X)</button>
                                <button onClick={() => setActiveTab('facebook')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'facebook' ? tabActive : tabBase}`}>Facebook</button>
                                <button onClick={() => setActiveTab('instagram')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'instagram' ? tabActive : tabBase}`}>Instagram</button>
                            </nav>
                        </div>
                        <div>
                            <label htmlFor="postContent" className={`block text-sm font-medium mb-2 ${labelColor}`}>Post content for {activeTab}</label>
                            <textarea 
                                id="postContent" 
                                rows={8}
                                value={posts[activeTab]}
                                onChange={e => handlePostChange(activeTab, e.target.value)}
                                className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-teal-500`}
                            />
                        </div>
                    </>
                ) : (
                     <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to manage social posts.</p>
                    </div>
                )}
            </div>

            {currentTask && (
                <div className={`p-6 rounded-lg border ${cardBg}`}>
                    <h3 className="text-xl font-semibold mb-3">Community Engagement Notes</h3>
                    <textarea 
                        rows={4}
                        placeholder="Reply to key comments, note frequently asked questions..."
                        className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-teal-500`}
                    />
                </div>
            )}
            
            <SmartTaskSuggestor currentTask={currentTask} />
        </div>
    );
};

export default SocialView;