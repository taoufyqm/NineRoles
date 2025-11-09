
import React from 'react';
import { Role } from './types';
import { WriterIcon, ShooterIcon, EditorIcon, PublisherIcon, ObserverIcon, ResearcherIcon, ThinkerIcon, DirectorIcon, DesignerIcon } from './components/icons';

export const ROLES: Role[] = [
  { id: 'Thinker', name: 'The Thinker', icon: ThinkerIcon, color: 'text-yellow-400', description: 'Generating ideas, setting the general direction, and analyzing key messages.' },
  { id: 'Researcher', name: 'The Researcher', icon: ResearcherIcon, color: 'text-blue-400', description: 'Gathering accurate and reliable information to support the idea.' },
  { id: 'Writer', name: 'The Writer', icon: WriterIcon, color: 'text-sky-400', description: 'Transforming the idea into a production-ready script.' },
  { id: 'Director', name: 'The Director', icon: DirectorIcon, color: 'text-orange-400', description: 'Translating the script into a clear shooting and production plan.' },
  { id: 'Shooter', name: 'The Filmmaker', icon: ShooterIcon, color: 'text-red-400', description: 'Capturing visual and audio material according to the plan.' },
  { id: 'Editor', name: 'The Editor', icon: EditorIcon, color: 'text-purple-400', description: 'Transforming raw materials into an integrated and engaging work.' },
  { id: 'Designer', name: 'The Designer', icon: DesignerIcon, color: 'text-pink-400', description: 'Creating visual assets like thumbnails and graphics.' },
  { id: 'Publisher', name: 'The Publisher', icon: PublisherIcon, color: 'text-green-400', description: 'Preparing content for publication across different platforms.' },
  { id: 'Observer', name: 'The Observer', icon: ObserverIcon, color: 'text-amber-400', description: 'Evaluating overall performance and identifying opportunities for improvement.' },
];