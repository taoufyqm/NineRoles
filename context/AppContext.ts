import { createContext } from 'react';
import { Role, Session, User, Project, TaskStatus, RoleID } from '../types';

interface IAppContext {
  user: User | null;
  session: Session | null;
  projects: Project[];
  currentRole: Role;
  activeProjectId: string | null;
  setActiveProjectId: (projectId: string) => void;
  selectRole: (role: Role) => void;
  updateTaskStatus: (projectId: string, taskId: string, status: TaskStatus) => void;
  addProject: (title: string) => void;
  // Fix: The timeSpent state should allow for partial records of RoleID, as not all roles will have tracked time for a project.
  timeSpent: Record<string, Partial<Record<RoleID, number>>>;
  // Fix: Add missing properties for HealthAwareDialog.
  isHealthMode: boolean;
  setIsHealthMode: (isHealthMode: boolean) => void;
  healthRating: number;
  setHealthRating: (rating: number) => void;
}

export const AppContext = createContext<IAppContext | null>(null);