import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

interface ProjectProgressBarProps {
  projectId: string | null;
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({ projectId }) => {
  const { projects } = useAppContext();

  if (!projectId) {
    return null; // Don't render if no project is selected
  }

  const project = projects.find(p => p.id === projectId);
  if (!project) {
    return null;
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-400">Project Progress</span>
        <span className="text-sm font-medium text-gray-400">{completedTasks} / {totalTasks} Tasks</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
