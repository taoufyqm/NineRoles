// Fix: Import React to provide types for React.FC and React.SVGProps.
import React from 'react';

export type RoleID = 'Thinker' | 'Researcher' | 'Writer' | 'Director' | 'Shooter' | 'Editor' | 'Publisher' | 'Observer' | 'Designer';

export interface Role {
  id: RoleID;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: RoleID[];
}

export interface Session {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
}

export interface Script {
  id: string;
  videoId: string;
  title: string;
  outline: string;
  fullScript: string;
  notes: string;
  keywords: string[];
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  roleId: RoleID;
  projectId: string;
  status: TaskStatus;
  estimatedDuration: number; // in minutes
}

export interface Project {
    id: string;
    title: string;
    tasks: Task[];
}