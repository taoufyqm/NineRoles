



import React, { useState, useCallback, useMemo, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import MainLayout from './components/MainLayout';
import { AppContext } from './context/AppContext';
import { Role, Session, User, Project, Task, TaskStatus, RoleID } from './types';
import { ROLES } from './constants';

const initialProjects: Project[] = [
  {
    id: 'proj1',
    title: 'Video about AI Productivity',
    tasks: [
      { id: 'p1t0', projectId: 'proj1', roleId: 'Thinker', title: 'Create an idea brief for the video (goal and audience)', status: 'completed', estimatedDuration: 60 },
      { id: 'p1t1', projectId: 'proj1', roleId: 'Researcher', title: 'Research the 5 latest AI productivity tools', status: 'completed', estimatedDuration: 120 },
      { id: 'p1t2', projectId: 'proj1', roleId: 'Writer', title: 'Write a script for the "AI Productivity" video', status: 'pending', estimatedDuration: 180 },
      { id: 'p1t3', projectId: 'proj1', roleId: 'Director', title: 'Develop a visual shooting plan for the script', status: 'pending', estimatedDuration: 90 },
      { id: 'p1t4', projectId: 'proj1', roleId: 'Shooter', title: 'Shoot the main and B-roll footage for the video', status: 'pending', estimatedDuration: 240 },
      { id: 'p1t5', projectId: 'proj1', roleId: 'Editor', title: 'Create the first draft of the video', status: 'pending', estimatedDuration: 300 },
      { id: 'p1t_designer', projectId: 'proj1', roleId: 'Designer', title: 'Design a compelling thumbnail for the AI video', status: 'pending', estimatedDuration: 75 },
      { id: 'p1t6', projectId: 'proj1', roleId: 'Publisher', title: 'Write titles, descriptions, and prepare the video for upload', status: 'pending', estimatedDuration: 60 },
      { id: 'p1t7', projectId: 'proj1', roleId: 'Observer', title: 'Analyze video performance after one week', status: 'pending', estimatedDuration: 45 },
    ]
  },
  {
    id: 'proj2',
    title: 'Travel Guide: New York in 3 Days',
    tasks: [
      { id: 'p2t0', projectId: 'proj2', roleId: 'Thinker', title: 'Define target audience (budget travelers) and key message', status: 'completed', estimatedDuration: 45 },
      { id: 'p2t1', projectId: 'proj2', roleId: 'Researcher', title: 'Find 5 budget-friendly activities in NYC', status: 'pending', estimatedDuration: 120 },
      { id: 'p2t2', projectId: 'proj2', roleId: 'Writer', title: 'Write script for Day 1: Manhattan Highlights', status: 'pending', estimatedDuration: 150 },
      { id: 'p2t3', projectId: 'proj2', roleId: 'Director', title: 'Plan iconic shots for Times Square and Central Park', status: 'pending', estimatedDuration: 90 },
      { id: 'p2t4', projectId: 'proj2', roleId: 'Shooter', title: 'Shoot footage in Times Square (Day & Night)', status: 'pending', estimatedDuration: 180 },
      { id: 'p2t5', projectId: 'proj2', roleId: 'Editor', title: 'Edit the Day 1 sequence', status: 'pending', estimatedDuration: 240 },
      { id: 'p2t_designer', projectId: 'proj2', roleId: 'Designer', title: 'Create a thumbnail with NYC landmarks', status: 'pending', estimatedDuration: 75 },
      { id: 'p2t6', projectId: 'proj2', roleId: 'Publisher', title: 'Prepare title: "NYC on a Budget: 3-Day Itinerary"', status: 'pending', estimatedDuration: 60 },
    ]
  }
];


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentRole, setCurrentRole] = useState<Role>(ROLES[0]);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  // Fix: The timeSpent state should allow for partial records of RoleID, as not all roles will have tracked time for a project.
  const [timeSpent, setTimeSpent] = useState<Record<string, Partial<Record<RoleID, number>>>>({});
  const [roleStartTime, setRoleStartTime] = useState<number>(0);
  // Fix: Add state for health mode to fix errors in HealthAwareDialog.
  const [isHealthMode, setIsHealthMode] = useState(false);
  const [healthRating, setHealthRating] = useState(100);

  useEffect(() => {
      if(user && !roleStartTime) {
          setRoleStartTime(Date.now());
      }
  }, [user, roleStartTime]);

  const startSession = (loggedInUser: User) => {
    setUser(loggedInUser);
    setSession({
      id: `sid_${Date.now()}`,
      userId: loggedInUser.id,
      startTime: new Date(),
    });
  };

  const handleLogin = useCallback(() => {
    // Fix: Cast roles array to RoleID[] to match User type.
    const loggedInUser = { id: '1', name: 'Content Creator', email: 'creator@example.com', roles: ['Writer', 'Shooter', 'Editor', 'Publisher', 'Observer', 'Designer'] as RoleID[] };
    startSession(loggedInUser);
  }, []);
  
  const handleRegister = useCallback((name: string, email: string) => {
    // Fix: Cast roles array to RoleID[] to match User type.
    const newUser = { id: `user_${Date.now()}`, name, email, roles: ['Writer', 'Shooter', 'Editor', 'Publisher', 'Observer', 'Designer'] as RoleID[] };
    startSession(newUser);
  }, []);
  
  const updateTaskStatus = useCallback((projectId: string, taskId: string, status: TaskStatus) => {
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id !== projectId) return p;
        const updatedTasks = p.tasks.map(task =>
          task.id === taskId ? { ...task, status } : task
        );
        return { ...p, tasks: updatedTasks };
      })
    );
  }, []);

  const selectRole = useCallback((newRole: Role) => {
    if (currentRole.id === newRole.id) return;

    if (activeProjectId) {
        const timeElapsed = Date.now() - roleStartTime;
        setTimeSpent(prev => {
            const projectTimes = prev[activeProjectId] || {};
            const newTime = (projectTimes[currentRole.id] || 0) + timeElapsed;
            const updatedProjectTimes = { ...projectTimes, [currentRole.id]: newTime };
            return { ...prev, [activeProjectId]: updatedProjectTimes };
        });
    }
    setRoleStartTime(Date.now());
    setCurrentRole(newRole);
  }, [currentRole, roleStartTime, activeProjectId]);
  
  const addProject = useCallback((title: string) => {
    const newProjectId = `proj_${Date.now()}`;
    const taskTemplates: Omit<Task, 'id' | 'projectId' | 'title'>[] = [
      { roleId: 'Thinker', status: 'pending', estimatedDuration: 60 },
      { roleId: 'Researcher', status: 'pending', estimatedDuration: 120 },
      { roleId: 'Writer', status: 'pending', estimatedDuration: 180 },
      { roleId: 'Director', status: 'pending', estimatedDuration: 90 },
      { roleId: 'Shooter', status: 'pending', estimatedDuration: 240 },
      { roleId: 'Editor', status: 'pending', estimatedDuration: 300 },
      { roleId: 'Designer', status: 'pending', estimatedDuration: 75 },
      { roleId: 'Publisher', status: 'pending', estimatedDuration: 60 },
      { roleId: 'Observer', status: 'pending', estimatedDuration: 45 },
    ];
    
    const newTasks: Task[] = taskTemplates.map((template, index) => ({
      ...template,
      id: `${newProjectId}t${index}`,
      projectId: newProjectId,
      title: `${template.roleId} task for "${title}"`,
    }));

    const newProject: Project = {
      id: newProjectId,
      title,
      tasks: newTasks,
    };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProjectId);
  }, []);

  const toggleAuthView = useCallback(() => {
    setView(prev => prev === 'login' ? 'register' : 'login');
  }, []);

  const appContextValue = useMemo(() => ({
    user,
    session,
    projects,
    currentRole,
    activeProjectId,
    setActiveProjectId,
    selectRole,
    updateTaskStatus,
    addProject,
    timeSpent,
    // Fix: Add health mode state and setters to context value.
    isHealthMode,
    setIsHealthMode,
    healthRating,
    setHealthRating,
  }), [user, session, projects, currentRole, activeProjectId, selectRole, updateTaskStatus, addProject, timeSpent, isHealthMode, healthRating]);

  const renderContent = () => {
    if (!user) {
        if (view === 'login') {
            return <LoginScreen onLogin={handleLogin} onNavigateToRegister={toggleAuthView} />;
        }
        return <RegistrationScreen onRegister={handleRegister} onNavigateToLogin={toggleAuthView} />;
    }
    return <MainLayout />;
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="min-h-screen w-full transition-colors duration-500 bg-gray-900">
        {renderContent()}
      </div>
    </AppContext.Provider>
  );
};

export default App;