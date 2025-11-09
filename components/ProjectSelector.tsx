import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import ProjectProgressBar from './ProjectProgressBar';

interface ProjectSelectorProps {
  selectedProjectId: string | null;
  onProjectChange: (projectId: string) => void;
  className?: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ selectedProjectId, onProjectChange, className }) => {
  const { projects } = useAppContext();

  const selectBg = 'bg-gray-700';
  const focusRing = 'focus:ring-sky-500';

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor="project-selector" className="block text-sm font-medium mb-2 text-gray-300">
        Select a Project to Work On
      </label>
      <select
        id="project-selector"
        value={selectedProjectId || ''}
        onChange={(e) => onProjectChange(e.target.value)}
        className={`w-full p-3 rounded-md border-0 ${selectBg} focus:ring-2 ${focusRing}`}
      >
        <option value="" disabled>-- Choose a project --</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
      <ProjectProgressBar projectId={selectedProjectId} />
    </div>
  );
};

export default ProjectSelector;