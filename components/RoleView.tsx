


import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

import WriterView from './views/WriterView';
import ResearcherView from './views/ResearcherView';
import ShooterView from './views/ShooterView';
import EditorView from './views/EditorView';
import PublisherView from './views/PublisherView';
import ThinkerView from './views/ThinkerView';
import DirectorView from './views/DirectorView';
import DesignerView from './views/DesignerView';

const RoleView: React.FC = () => {
    const { currentRole } = useAppContext();

    const renderRoleView = () => {
        switch (currentRole.id) {
            case 'Thinker':
                return <ThinkerView />;
            case 'Researcher':
                return <ResearcherView />;
            case 'Writer':
                return <WriterView />;
            case 'Director':
                return <DirectorView />;
            case 'Shooter':
                return <ShooterView />;
            case 'Editor':
                return <EditorView />;
            case 'Designer':
                return <DesignerView />;
            case 'Publisher':
                return <PublisherView />;
            default:
                return (
                    <div className="p-10 rounded-lg border bg-gray-800 border-gray-700 text-center">
                        <h2 className="text-3xl font-bold mb-2">Workspace for {currentRole.name}</h2>
                        <p className="text-gray-400">The workspace for this role is under development.</p>
                    </div>
                );
        }
    };

    return <>{renderRoleView()}</>;
};

export default RoleView;