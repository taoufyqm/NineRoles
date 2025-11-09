import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import SmartTaskSuggestor from '../SmartTaskSuggestor';
import { Task } from '../../types';
import ProjectSelector from '../ProjectSelector';

interface PublishDetails {
    title: string;
    description: string;
    tags: string;
    visibility: 'private' | 'unlisted' | 'public';
    scheduledAt: string;
}

type SocialPlatform = 'x' | 'facebook' | 'instagram' | 'tiktok' | 'youtubeShorts';

const PublisherView: React.FC = () => {
    const { projects, currentRole, activeProjectId, setActiveProjectId } = useAppContext();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [details, setDetails] = useState<PublishDetails>({
        title: '',
        description: '',
        tags: '',
        visibility: 'public',
        scheduledAt: ''
    });
    const [activeSocialTab, setActiveSocialTab] = useState<SocialPlatform>('x');
    const [socialPosts, setSocialPosts] = useState({
        x: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        youtubeShorts: '',
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
                setDetails({
                    title: currentProject.title,
                    description: `Check out our new video: ${currentProject.title}!\n\n#NewVideo #ContentCreator`,
                    tags: 'video, content, youtube',
                    visibility: 'public',
                    scheduledAt: ''
                });
                 setSocialPosts({
                    x: `🚀 New video is out: "${currentProject.title}"! Check it out. #NewVideo #${currentProject.title.split(' ').join('')}`,
                    facebook: `Our latest video, "${currentProject.title}," is now live! 🎥 We dive deep into... Watch it now! Link in comments.`,
                    instagram: `🔥 New video alert! Are you ready to learn more about "${currentProject.title}"? Our new video has all the details. Link in bio! #Video #${currentProject.title.split(' ').join('')}`,
                    tiktok: `New video on "${currentProject.title}" is LIVE! You don't want to miss this. Link in bio! #fyp #${currentProject.title.split(' ').join('')}`,
                    youtubeShorts: `Ever wondered about "${currentProject.title}"? Our new full video is out! #shorts #youtubeshorts`
                });
            }
        } else {
             setDetails({ title: '', description: '', tags: '', visibility: 'public', scheduledAt: '' });
             setSocialPosts({ x: '', facebook: '', instagram: '', tiktok: '', youtubeShorts: '' });
        }
    }, [currentTask, projects]);

    const cardBg = 'bg-gray-800 border-gray-700';
    const inputBg = 'bg-gray-700';
    const labelColor = 'text-gray-300';
    const buttonBg = 'bg-green-600 hover:bg-green-700';
    const tabBase = 'text-gray-400 hover:bg-gray-700';
    const tabActive = 'bg-gray-700 text-green-300 border-green-400';


    const handleInputChange = (field: keyof PublishDetails, value: string) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialPostChange = (platform: SocialPlatform, value: string) => {
        setSocialPosts(prev => ({...prev, [platform]: value}));
    };

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
                <h2 className="text-2xl font-bold mb-4">Publisher's Dashboard</h2>
                <ProjectSelector selectedProjectId={activeProjectId} onProjectChange={setActiveProjectId} />
                
                {currentTask ? (
                <>
                    <p className="text-lg text-gray-400 mb-4">
                        Task: <span className="font-semibold text-green-400">{currentTask.title}</span>
                         <span className="ml-3 text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
                            Est. {currentTask.estimatedDuration} min
                        </span>
                    </p>
                    {/* Video Details Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-gray-500/50">Video Details</h3>
                        <div>
                            <label htmlFor="vidTitle" className={`block text-sm font-medium mb-2 ${labelColor}`}>Video Title</label>
                            <input id="vidTitle" type="text" value={details.title} onChange={e => handleInputChange('title', e.target.value)} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`} />
                        </div>
                        <div>
                            <label htmlFor="vidDesc" className={`block text-sm font-medium mb-2 ${labelColor}`}>Description</label>
                            <textarea id="vidDesc" rows={5} value={details.description} onChange={e => handleInputChange('description', e.target.value)} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`}></textarea>
                        </div>
                        <div>
                            <label htmlFor="vidTags" className={`block text-sm font-medium mb-2 ${labelColor}`}>Tags</label>
                            <input id="vidTags" type="text" value={details.tags} onChange={e => handleInputChange('tags', e.target.value)} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`} />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${labelColor}`}>Thumbnail</label>
                            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md border-gray-600">
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">Drag and drop image here, or</p>
                                    <label htmlFor="thumbnail-upload" className="relative cursor-pointer mt-2 px-3 py-1.5 text-sm font-semibold rounded-md bg-gray-700 text-gray-200">
                                        <span>Choose a file</span>
                                        <input id="thumbnail-upload" name="thumbnail-upload" type="file" className="sr-only" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                            <label htmlFor="vidVisibility" className={`block text-sm font-medium mb-2 ${labelColor}`}>Visibility</label>
                                <select id="vidVisibility" value={details.visibility} onChange={e => handleInputChange('visibility', e.target.value as 'public' | 'private' | 'unlisted')} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`}>
                                <option value="public">Public</option>
                                <option value="unlisted">Unlisted</option>
                                <option value="private">Private</option>
                                </select>
                            </div>
                            <div>
                            <label htmlFor="vidSchedule" className={`block text-sm font-medium mb-2 ${labelColor}`}>Schedule (Optional)</label>
                            <input id="vidSchedule" type="datetime-local" value={details.scheduledAt} onChange={e => handleInputChange('scheduledAt', e.target.value)} className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`} />
                            </div>
                        </div>
                    </div>

                    {/* Social Media Promotion Section */}
                    <div className="mt-8 pt-6 border-t border-gray-500/50">
                        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-gray-500/50">Social Media Promotion</h3>
                        <div className="mb-4 border-b border-gray-700">
                            <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                                <button onClick={() => setActiveSocialTab('x')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeSocialTab === 'x' ? tabActive : tabBase}`}>X (Twitter)</button>
                                <button onClick={() => setActiveSocialTab('facebook')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeSocialTab === 'facebook' ? tabActive : tabBase}`}>Facebook</button>
                                <button onClick={() => setActiveSocialTab('instagram')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeSocialTab === 'instagram' ? tabActive : tabBase}`}>Instagram</button>
                                <button onClick={() => setActiveSocialTab('tiktok')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeSocialTab === 'tiktok' ? tabActive : tabBase}`}>TikTok</button>
                                <button onClick={() => setActiveSocialTab('youtubeShorts')} className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeSocialTab === 'youtubeShorts' ? tabActive : tabBase}`}>YouTube Shorts</button>
                            </nav>
                        </div>
                        <div>
                            <label htmlFor="socialPostContent" className={`block text-sm font-medium mb-2 ${labelColor}`}>Post content for {activeSocialTab}</label>
                            <textarea 
                                id="socialPostContent" 
                                rows={6}
                                value={socialPosts[activeSocialTab]}
                                onChange={e => handleSocialPostChange(activeSocialTab, e.target.value)}
                                className={`w-full p-3 rounded-md border-0 ${inputBg} focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-500/50">
                        <button className={`w-full px-4 py-3 font-bold text-lg text-white rounded-lg transition-colors ${buttonBg}`}>
                            Publish Video Now
                        </button>
                    </div>
                </>
                ) : (
                     <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
                        <p className="text-gray-400">Please select a project to manage its publication.</p>
                    </div>
                )}
            </div>
            <SmartTaskSuggestor currentTask={currentTask}/>
        </div>
    );
};

export default PublisherView;